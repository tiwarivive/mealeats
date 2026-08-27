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

const GUEST_SESSION_KEY = "mealeats_guest_session_id";

/**
 * Backend API base URL.
 *
 * Example:
 *
 * NEXT_PUBLIC_API_BASE_URL=https://mealeats-ai.onrender.com/api
 *
 * Final endpoint:
 *
 * https://mealeats-ai.onrender.com/api/ai/chat
 */
const API_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://mealeats-ai.onrender.com/api";

/**
 * Backend origin used for generated PDF files.
 *
 * Example:
 *
 * API:
 * https://mealeats-ai.onrender.com/api
 *
 * PDF:
 * https://mealeats-ai.onrender.com/uploads/file.pdf
 */
const BACKEND_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(
    /\/api\/?$/,
    "",
  ) || "https://mealeats-ai.onrender.com";

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
     * Reuse existing guest session.
     */
    const existingSession =
      localStorage.getItem(GUEST_SESSION_KEY);

    if (existingSession) {
      return existingSession;
    }

    /**
     * Create a new guest session.
     */
    const newSessionId = `guest_${Math.random()
      .toString(36)
      .slice(2, 12)}`;

    localStorage.setItem(
      GUEST_SESSION_KEY,
      newSessionId,
    );

    return newSessionId;
  } catch (error) {
    console.warn(
      "Unable to access localStorage. Using temporary guest session.",
      error,
    );

    return `guest_${Math.random()
      .toString(36)
      .slice(2, 12)}`;
  }
}

/* =========================================================
   PDF URL HELPER
========================================================= */

/**
 * Converts backend PDF path into a usable
 * absolute URL.
 *
 * Supported:
 *
 * https://example.com/uploads/file.pdf
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
   * Already absolute.
   */
  if (/^https?:\/\//i.test(trimmedUrl)) {
    return trimmedUrl;
  }

  /**
   * Backend returned an absolute path.
   *
   * Example:
   *
   * /uploads/file.pdf
   */
  if (trimmedUrl.startsWith("/")) {
    return `${BACKEND_BASE_URL}${trimmedUrl}`;
  }

  /**
   * Backend returned a relative path.
   *
   * Example:
   *
   * uploads/file.pdf
   */
  return `${BACKEND_BASE_URL}/${trimmedUrl}`;
}

/* =========================================================
   NORMALIZE PDF RESPONSE
========================================================= */

/**
 * Converts backend PDF information into
 * frontend ChatPdf structure.
 *
 * Backend:
 *
 * data: {
 *   pdf: {
 *     generated: true,
 *     fileName: "mealeats-ai-123.pdf",
 *     url: "/uploads/mealeats-ai-123.pdf"
 *   }
 * }
 */
function getGeneratedPdf(
  data: unknown,
): ChatPdf | undefined {
  if (!data || typeof data !== "object") {
    return undefined;
  }

  const responseData = data as {
    pdf?: {
      generated?: unknown;
      url?: unknown;
      fileName?: unknown;
    };
  };

  const pdf = responseData.pdf;

  /**
   * PDF must explicitly be marked generated.
   */
  if (
    !pdf ||
    pdf.generated !== true ||
    typeof pdf.url !== "string" ||
    !pdf.url.trim()
  ) {
    return undefined;
  }

  const url = getPdfUrl(pdf.url);

  if (!url) {
    return undefined;
  }

  return {
    generated: true,
    url,
    fileName:
      typeof pdf.fileName === "string" &&
      pdf.fileName.trim()
        ? pdf.fileName.trim()
        : "MealEats-AI-Plan.pdf",
  };
}

/* =========================================================
   COMPONENT
========================================================= */

export default function AIChat() {
  const [isChatOpen, setIsChatOpen] =
    useState(false);

  const [messages, setMessages] =
    useState<ChatMessage[]>([]);

  const [isLoading, setIsLoading] =
    useState(false);

  /**
   * Backend returns chatId.
   *
   * Kept available for future use.
   */
  const [, setChatId] =
    useState<string | null>(null);

  /**
   * Create the guest session only once.
   */
  const [guestSessionId] =
    useState<string>(() =>
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
    async (
      message: string,
      files: File[] = [],
    ) => {
      const trimmedMessage =
        message.trim();

      /**
       * Don't send empty messages.
       *
       * Attachments-only messages are allowed.
       */
      if (
        (!trimmedMessage &&
          files.length === 0) ||
        isLoading
      ) {
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
        attachments:
          files.length > 0
            ? files
            : undefined,
      };

      setMessages(
        (previousMessages) => [
          ...previousMessages,
          userMessage,
        ],
      );

      setIsLoading(true);

      try {
        /* -------------------------------------------------
           FORM DATA
        ------------------------------------------------- */

        const formData = new FormData();

        /**
         * Backend guest session.
         */
        formData.append(
          "guestSessionId",
          guestSessionId,
        );

        /**
         * User message.
         */
        if (trimmedMessage) {
          formData.append(
            "message",
            trimmedMessage,
          );
        }

        /**
         * Backend expects:
         *
         * media
         *
         * Currently only the first file is sent.
         */
        if (
          files.length > 0 &&
          files[0]
        ) {
          formData.append(
            "media",
            files[0],
            files[0].name,
          );
        }

        /* -------------------------------------------------
           API REQUEST
        ------------------------------------------------- */

        const response = await fetch(
          `${API_URL}/ai/chat`,
          {
            method: "POST",

            /**
             * Don't manually set Content-Type
             * for FormData.
             */
            headers: {
              Accept:
                "application/json",
            },

            body: formData,
          },
        );

        /* -------------------------------------------------
           PARSE RESPONSE
        ------------------------------------------------- */

        let json: any = null;

        try {
          json =
            await response.json();
        } catch {
          json = null;
        }

        /* -------------------------------------------------
           HTTP ERROR
        ------------------------------------------------- */

        if (!response.ok) {
          let serverMessage =
            typeof json?.message ===
            "string"
              ? json.message
              : "";

          if (
            response.status === 400
          ) {
            serverMessage =
              serverMessage ||
              "That request couldn't be processed. Please rephrase and try again.";
          } else if (
            response.status === 429
          ) {
            serverMessage =
              serverMessage ||
              "You're sending messages too quickly. Please wait a moment and try again.";
          } else if (
            response.status >= 500
          ) {
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
           RESPONSE DATA
        ------------------------------------------------- */

        const responseData =
          json?.data;

        /* -------------------------------------------------
           SUCCESS RESPONSE
        ------------------------------------------------- */

        if (
          json?.success &&
          responseData &&
          typeof responseData.response ===
            "string"
        ) {
          /**
           * Save chatId.
           */
          if (
            responseData.chatId
          ) {
            setChatId(
              String(
                responseData.chatId,
              ),
            );
          }

          /**
           * IMPORTANT:
           *
           * PDF is intentionally extracted
           * separately from response text.
           */
          const pdf =
            getGeneratedPdf(
              responseData,
            );

          /**
           * Keep backend AI response exactly
           * as returned.
           *
           * Do NOT append the PDF URL.
           */
          const assistantContent =
            responseData.response.trim();

          const assistantMessage:
            ChatMessage = {
              id: createId(
                "assistant",
              ),
              role: "assistant",
              content:
                assistantContent,
              ...(pdf
                ? { pdf }
                : {}),
            };

          setMessages(
            (previousMessages) => [
              ...previousMessages,
              assistantMessage,
            ],
          );

          return;
        }

        /* -------------------------------------------------
           DIRECT RESPONSE FALLBACK
        ------------------------------------------------- */

        if (
          typeof responseData?.response ===
          "string"
        ) {
          /**
           * Save chatId if available.
           */
          if (
            responseData.chatId
          ) {
            setChatId(
              String(
                responseData.chatId,
              ),
            );
          }

          /**
           * Extract PDF separately.
           */
          const pdf =
            getGeneratedPdf(
              responseData,
            );

          const assistantContent =
            responseData.response.trim();

          const assistantMessage:
            ChatMessage = {
              id: createId(
                "assistant",
              ),
              role: "assistant",
              content:
                assistantContent,
              ...(pdf
                ? { pdf }
                : {}),
            };

          setMessages(
            (previousMessages) => [
              ...previousMessages,
              assistantMessage,
            ],
          );

          return;
        }

        /* -------------------------------------------------
           API FALLBACK
        ------------------------------------------------- */

        const fallbackMessage:
          ChatMessage = {
            id: createId(
              "assistant",
            ),
            role: "assistant",
            content:
              typeof json?.message ===
              "string"
                ? json.message
                : "Sorry, I couldn't generate a response right now.",
          };

        setMessages(
          (previousMessages) => [
            ...previousMessages,
            fallbackMessage,
          ],
        );
      } catch (error) {
        console.error(
          "Meal Eats AI error:",
          error,
        );

        /* -------------------------------------------------
           ERROR MESSAGE
        ------------------------------------------------- */

        const errorMessage:
          ChatMessage = {
            id: createId("error"),
            role: "assistant",
            content:
              error instanceof
                Error &&
              error.message &&
              !error.message.includes(
                "Failed to fetch",
              )
                ? `I couldn't complete that request. ${error.message}`
                : "I couldn't connect to Meal Eats AI right now. Please try again in a moment.",
          };

        setMessages(
          (previousMessages) => [
            ...previousMessages,
            errorMessage,
          ],
        );
      } finally {
        /**
         * Always unlock input.
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