"use client";

import { useCallback, useState } from "react";

import LandingScreen from "./LandingScreen";
import ChatScreen from "./ChatScreen";

import "./ai-chat.css";

/* =========================================================
   TYPES
========================================================= */

export type ChatPdf = {
  generated: boolean;
  url: string;
  fileName?: string;
};

export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  attachments?: File[];
  pdf?: ChatPdf;
};

/* =========================================================
   CONSTANTS
========================================================= */

/**
 * Keep the same guest-session storage key used by the
 * original working HTML implementation.
 */
const GUEST_SESSION_KEY = "mealeats_guest_session_id";

/**
 * API base URL.
 *
 * Example:
 *
 * NEXT_PUBLIC_API_BASE_URL=https://mealseats.onrender.com/api
 *
 * Final endpoint:
 *
 * https://mealseats.onrender.com/api/ai/chat
 */
const API_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://mealeats-ai.onrender.com/api";

/**
 * Backend base URL used for generated PDF files.
 *
 * Example:
 *
 * https://mealseats.onrender.com/api
 *              ↓
 * https://mealseats.onrender.com
 */
const BACKEND_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/api\/?$/, "") ||
  "https://mealeats-ai.onrender.com";

/* =========================================================
   HELPERS
========================================================= */

/**
 * Creates a unique message ID.
 */
function createId(prefix: string): string {
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    return `${prefix}-${crypto.randomUUID()}`;
  }

  return `${prefix}-${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 10)}`;
}

/* =========================================================
   GUEST SESSION
========================================================= */

function getGuestSessionId(): string {
  if (typeof window === "undefined") {
    return "";
  }

  try {
    /**
     * Reuse an existing guest session if one exists.
     */
    const existingSession = localStorage.getItem(GUEST_SESSION_KEY);

    if (existingSession) {
      return existingSession;
    }

    /**
     * Create a new guest session.
     */
    const newSessionId =
      `guest_${Math.random().toString(36).slice(2, 12)}`;

    localStorage.setItem(GUEST_SESSION_KEY, newSessionId);

    return newSessionId;
  } catch (error) {
    console.warn(
      "Unable to access localStorage. Using temporary guest session.",
      error,
    );

    return `guest_${Math.random().toString(36).slice(2, 12)}`;
  }
}

/* =========================================================
   PDF URL HELPER
========================================================= */

/**
 * Converts the backend PDF path into a usable absolute URL.
 *
 * Supported:
 *
 * https://mealseats.onrender.com/uploads/file.pdf
 *
 * /uploads/file.pdf
 *
 * /api/pdf/file.pdf
 *
 * uploads/file.pdf
 */
function getPdfUrl(pdfUrl: string): string {
  const trimmedUrl = pdfUrl.trim();

  if (!trimmedUrl) {
    return "";
  }

  /**
   * Already an absolute URL.
   */
  if (/^https?:\/\//i.test(trimmedUrl)) {
    return trimmedUrl;
  }

  /**
   * Backend returns something like:
   *
   * /uploads/pdf/meal-plan.pdf
   *
   * or:
   *
   * /api/pdf/meal-plan.pdf
   */
  if (trimmedUrl.startsWith("/")) {
    return `${BACKEND_BASE_URL}${trimmedUrl}`;
  }

  return `${BACKEND_BASE_URL}/${trimmedUrl}`;
}

/* =========================================================
   NORMALIZE PDF
========================================================= */

/**
 * Extracts generated PDF information from the API response.
 *
 * PDF information is stored separately on:
 *
 * message.pdf
 *
 * It is NOT appended to the assistant message text.
 */
function getGeneratedPdf(data: any): ChatPdf | undefined {
  if (
    data?.pdf &&
    data.pdf.generated === true &&
    typeof data.pdf.url === "string" &&
    data.pdf.url.trim()
  ) {
    const url = getPdfUrl(data.pdf.url);

    if (!url) {
      return undefined;
    }

    return {
      generated: true,
      url,
      fileName:
        typeof data.pdf.fileName === "string" &&
        data.pdf.fileName.trim()
          ? data.pdf.fileName.trim()
          : "MealEats-AI-Plan.pdf",
    };
  }

  return undefined;
}

/* =========================================================
   COMPONENT
========================================================= */

export default function AIChat() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  /**
   * Backend returns a chatId.
   *
   * We retain it even though the current backend contract
   * does not require sending it with the next request.
   */
  const [, setChatId] = useState<string | null>(null);

  /**
   * Created once for this component instance.
   *
   * The value itself survives component re-renders.
   */
  const [guestSessionId] = useState<string>(() =>
    getGuestSessionId(),
  );

  /* =======================================================
     OPEN CHAT
  ======================================================= */

  const openChat = useCallback(() => {
    setIsChatOpen(true);
  }, []);

  /* =======================================================
     SEND MESSAGE
  ======================================================= */

  const sendMessage = useCallback(
    async (message: string, files: File[] = []) => {
      const trimmedMessage = message.trim();

      /**
       * Don't send empty messages.
       *
       * Attachments-only messages are allowed.
       */
      if ((!trimmedMessage && files.length === 0) || isLoading) {
        return;
      }

      /**
       * Make sure chat is visible.
       */
      setIsChatOpen(true);

      /* ---------------------------------------------------
         USER MESSAGE
      --------------------------------------------------- */

      const userMessage: ChatMessage = {
        id: createId("user"),
        role: "user",
        content: trimmedMessage,
        attachments: files.length > 0 ? files : undefined,
      };

      setMessages((previousMessages) => [
        ...previousMessages,
        userMessage,
      ]);

      setIsLoading(true);

      try {
        /* -------------------------------------------------
           FORM DATA
        ------------------------------------------------- */

        const formData = new FormData();

        /**
         * Exact backend contract.
         */
        formData.append("guestSessionId", guestSessionId);

        if (trimmedMessage) {
          formData.append("message", trimmedMessage);
        }

        /**
         * Exact backend media field.
         *
         * Backend expects:
         *
         * media
         *
         * NOT:
         *
         * file
         * files
         * attachment
         * attachments
         *
         * Currently only the first file is sent because
         * that matches your backend contract.
         */
        if (files.length > 0 && files[0]) {
          formData.append(
            "media",
            files[0],
            files[0].name,
          );
        }

        /* -------------------------------------------------
           API REQUEST
        ------------------------------------------------- */

        const response = await fetch(`${API_URL}/ai/chat`, {
          method: "POST",

          /**
           * Do NOT manually set Content-Type when using
           * FormData.
           *
           * The browser automatically creates:
           *
           * multipart/form-data; boundary=...
           */
          headers: {
            Accept: "application/json",
          },

          body: formData,
        });

        /* -------------------------------------------------
           PARSE RESPONSE
        ------------------------------------------------- */

        let json: any = null;

        try {
          json = await response.json();
        } catch {
          json = null;
        }

        /* -------------------------------------------------
           HTTP ERROR
        ------------------------------------------------- */

        if (!response.ok) {
          let serverMessage =
            typeof json?.message === "string"
              ? json.message
              : "";

          /**
           * Friendly frontend messages for common
           * backend statuses.
           */
          if (response.status === 400) {
            serverMessage =
              serverMessage ||
              "That request couldn't be processed. Please rephrase and try again.";
          } else if (response.status === 429) {
            serverMessage =
              serverMessage ||
              "You're sending messages too quickly. Please wait a moment and try again.";
          } else if (response.status >= 500) {
            serverMessage =
              serverMessage ||
              "MealEats AI is temporarily unavailable. Please try again shortly.";
          }

          throw new Error(
            serverMessage ||
              `Request failed with status ${response.status}`,
          );
        }

        /* -------------------------------------------------
           SUCCESS RESPONSE
        ------------------------------------------------- */

        if (
          json?.success &&
          json?.data &&
          typeof json.data.response === "string"
        ) {
          /**
           * Save chatId returned by backend.
           */
          if (json.data.chatId) {
            setChatId(String(json.data.chatId));
          }

          /**
           * Extract PDF separately.
           */
          const pdf = getGeneratedPdf(json.data);

          /**
           * Keep the AI response exactly as returned
           * by the backend.
           *
           * Do NOT append PDF links to the message text.
           */
          const assistantContent =
            json.data.response.trim();

          const assistantMessage: ChatMessage = {
            id: createId("assistant"),
            role: "assistant",
            content: assistantContent,
            pdf,
          };

          setMessages((previousMessages) => [
            ...previousMessages,
            assistantMessage,
          ]);

          return;
        }

        /* -------------------------------------------------
           DIRECT RESPONSE FALLBACK
        ------------------------------------------------- */

        if (
          typeof json?.data?.response === "string"
        ) {
          /**
           * Handle APIs that don't explicitly provide
           * success:true but still provide data.response.
           */
          if (json?.data?.chatId) {
            setChatId(String(json.data.chatId));
          }

          /**
           * Extract PDF separately.
           */
          const pdf = getGeneratedPdf(json.data);

          const assistantContent =
            json.data.response.trim();

          const assistantMessage: ChatMessage = {
            id: createId("assistant"),
            role: "assistant",
            content: assistantContent,
            pdf,
          };

          setMessages((previousMessages) => [
            ...previousMessages,
            assistantMessage,
          ]);

          return;
        }

        /* -------------------------------------------------
           API FALLBACK
        ------------------------------------------------- */

        const fallbackMessage: ChatMessage = {
          id: createId("assistant"),
          role: "assistant",
          content:
            typeof json?.message === "string"
              ? json.message
              : "Sorry, I couldn't generate a response right now.",
        };

        setMessages((previousMessages) => [
          ...previousMessages,
          fallbackMessage,
        ]);
      } catch (error) {
        console.error("Meal Eats AI error:", error);

        /* -------------------------------------------------
           ERROR MESSAGE
        ------------------------------------------------- */

        const errorMessage: ChatMessage = {
          id: createId("error"),
          role: "assistant",
          content:
            error instanceof Error &&
            error.message &&
            !error.message.includes("Failed to fetch")
              ? `I couldn't complete that request. ${error.message}`
              : "I couldn't connect to Meal Eats AI right now. Please try again in a moment.",
        };

        setMessages((previousMessages) => [
          ...previousMessages,
          errorMessage,
        ]);
      } finally {
        /**
         * Always unlock the input.
         */
        setIsLoading(false);
      }
    },
    [guestSessionId, isLoading],
  );

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <main className="ai-chat-page">
      {isChatOpen ? (
        <ChatScreen
          messages={messages}
          isLoading={isLoading}
          onSendMessage={sendMessage}
        />
      ) : (
        <LandingScreen
          onStartChat={openChat}
          onSendMessage={sendMessage}
        />
      )}
    </main>
  );
}