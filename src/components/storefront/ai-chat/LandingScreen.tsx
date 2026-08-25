"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import type {
  ChangeEvent,
  Dispatch,
  KeyboardEvent as ReactKeyboardEvent,
  MutableRefObject,
  ReactNode,
  SetStateAction,
} from "react";

import ChatComposer from "./ChatComposer";
import type { ChatMessage } from "./AIChat";
import { Search } from "lucide-react";

/* ===============================================================
   TYPES
=============================================================== */

type ChatScreenProps = {
  messages?: ChatMessage[];
  isLoading?: boolean;
  onSendMessage?: (
    message: string,
    files?: File[],
  ) => void | Promise<void>;

  onRegenerateMessage?: (
    message: ChatMessage,
    index: number,
  ) => void | Promise<void>;

  onStartChat?: () => void;
};

type FeedbackState =
  | "like"
  | "dislike"
  | null;

/* ===============================================================
   CONSTANTS
=============================================================== */

const AUTO_SCROLL_THRESHOLD = 120;

/* ===============================================================
   MAIN CHAT SCREEN
=============================================================== */

export default function ChatScreen({
  messages = [],
  isLoading = false,
  onSendMessage = async () => { },
  onRegenerateMessage,
}: ChatScreenProps) {
  const scrollRef =
    useRef<HTMLDivElement>(null);

  const composerRef =
    useRef<HTMLDivElement>(null);

  const searchInputRef =
    useRef<HTMLInputElement>(null);

  const previousMessageCountRef =
    useRef(messages.length);

  const shouldFollowBottomRef =
    useRef(true);

  const messageRefs =
    useRef<Record<string, HTMLDivElement | null>>(
      {},
    );
  const copyTimeoutsRef =
    useRef<
      Record<
        string,
        number
      >
    >({});

  const [composerHeight, setComposerHeight] =
    useState(132);

  const [feedback, setFeedback] =
    useState<
      Record<string, FeedbackState>
    >({});

  const [menuMessageId, setMenuMessageId] =
    useState<string | null>(null);

  const [copiedMessageId, setCopiedMessageId] =
    useState<string | null>(null);

  const [showScrollButton, setShowScrollButton] =
    useState(false);

  const [searchOpen, setSearchOpen] =
    useState(false);

  const [searchQuery, setSearchQuery] =
    useState("");

  const [activeSearchIndex, setActiveSearchIndex] =
    useState(0);

  /* =============================================================
     SEARCH RESULTS
  ============================================================= */

  const searchResults = useMemo(() => {
    const query =
      searchQuery.trim().toLowerCase();

    if (!query) {
      return [];
    }

    return messages.filter((message) =>
      message.content
        .toLowerCase()
        .includes(query),
    );
  }, [messages, searchQuery]);

  /* =============================================================
     COMPOSER HEIGHT
  ============================================================= */

  useEffect(() => {
    const element = composerRef.current;

    if (!element) {
      return;
    }

    const updateHeight = () => {
      const height = Math.ceil(
        element.getBoundingClientRect().height,
      );

      if (height > 0) {
        setComposerHeight(height);
      }
    };

    updateHeight();

    const resizeObserver =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(updateHeight)
        : null;

    resizeObserver?.observe(element);

    window.addEventListener(
      "resize",
      updateHeight,
    );

    return () => {
      resizeObserver?.disconnect();

      window.removeEventListener(
        "resize",
        updateHeight,
      );
    };
  }, []);

  /* =============================================================
     SCROLL POSITION
  ============================================================= */

  const checkScrollPosition =
    useCallback(() => {
      const element = scrollRef.current;

      if (!element) {
        return true;
      }

      const distanceFromBottom =
        element.scrollHeight -
        element.scrollTop -
        element.clientHeight;

      const isNearBottom =
        distanceFromBottom <=
        AUTO_SCROLL_THRESHOLD;

      shouldFollowBottomRef.current =
        isNearBottom;

      setShowScrollButton(!isNearBottom);

      return isNearBottom;
    }, []);

  /* =============================================================
     SCROLL TO BOTTOM
  ============================================================= */

  const scrollToBottom =
    useCallback(
      (
        behavior: ScrollBehavior = "smooth",
      ) => {
        const element =
          scrollRef.current;

        if (!element) {
          return;
        }

        element.scrollTo({
          top: element.scrollHeight,
          behavior,
        });

        shouldFollowBottomRef.current =
          true;

        setShowScrollButton(false);
      },
      [],
    );

  /* =============================================================
     TRACK SCROLL
  ============================================================= */

  useEffect(() => {
    const element = scrollRef.current;

    if (!element) {
      return;
    }

    const handleScroll = () => {
      checkScrollPosition();
    };

    element.addEventListener(
      "scroll",
      handleScroll,
      {
        passive: true,
      },
    );

    checkScrollPosition();

    return () => {
      element.removeEventListener(
        "scroll",
        handleScroll,
      );
    };
  }, [checkScrollPosition]);

  /* =============================================================
     AUTO SCROLL NEW MESSAGES
  ============================================================= */

  useEffect(() => {
    const previousCount =
      previousMessageCountRef.current;

    const currentCount =
      messages.length;

    if (currentCount > previousCount) {
      const latestMessage =
        messages[currentCount - 1];

      const userSentMessage =
        latestMessage?.role === "user";

      const shouldScroll =
        userSentMessage ||
        shouldFollowBottomRef.current;

      if (shouldScroll) {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            scrollToBottom("smooth");
          });
        });
      }
    }

    previousMessageCountRef.current =
      currentCount;
  }, [messages, scrollToBottom]);

  /* =============================================================
     FOLLOW RESPONSE
  ============================================================= */

  useEffect(() => {
    if (!isLoading) {
      return;
    }

    if (!shouldFollowBottomRef.current) {
      return;
    }

    const frame =
      requestAnimationFrame(() => {
        const element =
          scrollRef.current;

        if (!element) {
          return;
        }

        element.scrollTo({
          top: element.scrollHeight,
          behavior: "auto",
        });
      });

    return () => {
      cancelAnimationFrame(frame);
    };
  }, [messages, isLoading]);

  /* =============================================================
     SEARCH
  ============================================================= */

  const openSearch =
    useCallback(() => {
      setSearchOpen(true);

      requestAnimationFrame(() => {
        searchInputRef.current?.focus();
      });
    }, []);

  const closeSearch =
    useCallback(() => {
      setSearchOpen(false);
      setSearchQuery("");
      setActiveSearchIndex(0);
    }, []);

  const scrollToSearchResult =
    useCallback(
      (index: number) => {
        if (searchResults.length === 0) {
          return;
        }

        const safeIndex =
          ((index % searchResults.length) +
            searchResults.length) %
          searchResults.length;

        const message =
          searchResults[safeIndex];

        if (!message) {
          return;
        }

        setActiveSearchIndex(
          safeIndex,
        );

        const target =
          messageRefs.current[
          message.id
          ];

        if (!target) {
          return;
        }

        target.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      },
      [searchResults],
    );

  const goToNextSearchResult =
    useCallback(() => {
      if (searchResults.length === 0) {
        return;
      }

      scrollToSearchResult(
        activeSearchIndex + 1,
      );
    }, [
      activeSearchIndex,
      searchResults.length,
      scrollToSearchResult,
    ]);

  const goToPreviousSearchResult =
    useCallback(() => {
      if (searchResults.length === 0) {
        return;
      }

      scrollToSearchResult(
        activeSearchIndex - 1,
      );
    }, [
      activeSearchIndex,
      searchResults.length,
      scrollToSearchResult,
    ]);

  useEffect(() => {
    setActiveSearchIndex(0);
  }, [searchQuery]);

  /* =============================================================
     KEYBOARD SHORTCUTS
  ============================================================= */

  useEffect(() => {
  const handleKeyDown = (
    event: globalThis.KeyboardEvent,
  ) => {
      const isSearchShortcut =
        (event.metaKey ||
          event.ctrlKey) &&
        event.key.toLowerCase() ===
        "k";

      if (isSearchShortcut) {
        event.preventDefault();
        openSearch();
        return;
      }

      if (event.key === "Escape") {
        if (searchOpen) {
          closeSearch();
        }

        setMenuMessageId(null);
      }
    };

    document.addEventListener(
      "keydown",
      handleKeyDown,
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown,
      );
    };
  }, [
    closeSearch,
    openSearch,
    searchOpen,
  ]);

  /* =============================================================
     CLOSE MENU ON OUTSIDE CLICK
  ============================================================= */

  useEffect(() => {
    const handlePointerDown = (
      event: PointerEvent,
    ) => {
      const target = event.target;

      if (!(target instanceof Element)) {
        return;
      }

      if (
        !target.closest(
          "[data-message-actions]",
        )
      ) {
        setMenuMessageId(null);
      }
    };

    document.addEventListener(
      "pointerdown",
      handlePointerDown,
    );

    return () => {
      document.removeEventListener(
        "pointerdown",
        handlePointerDown,
      );
    };
  }, []);

  /* =============================================================
     CLEANUP COPY TIMERS
  ============================================================= */

  useEffect(() => {
    return () => {
      Object.values(
        copyTimeoutsRef.current,
      ).forEach((timeout) => {
        clearTimeout(timeout);
      });
    };
  }, []);

  const hasMessages =
    messages.length > 0;

  return (
    <section
      className="
        chat-screen
        relative
        top-0
        flex
        !h-[100dvh]
        min-h-0
        w-full
        flex-col
        overflow-hidden
        bg-transparent
        text-[var(--color-text)]
      "
      aria-label="Meal Eats AI chat"
    >
      {/* =========================================================
          ANIMATED BACKGROUND
      ========================================================= */}

      <AnimatedChatBackground />

      {/* =========================================================
          SEARCH BAR
      ========================================================= */}

      {searchOpen && (
        <div
          className="
            absolute
            left-1/2
            top-3
            z-50
            w-[calc(100%-24px)]
            max-w-[920px]
            -translate-x-1/2
            rounded-[18px]
            border
            border-[var(--color-border)]
            bg-white/95
            px-2
            py-2
            shadow-[0_10px_35px_rgba(0,0,0,0.10)]
            backdrop-blur-xl
            sm:top-4
            sm:w-[calc(100%-40px)]
            sm:px-3
            sm:py-2.5
            lg:top-5
          "
        >
          <div
            className="
              mx-auto
              flex
              w-full
              max-w-[920px]
              items-center
              gap-1.5
              sm:gap-2
              min-h-10
            "
          >
            <div
              className="
                flex
                min-w-0
                flex-1
                items-center
                gap-2
                rounded-[14px]
                border
                border-[var(--color-border)]
                min-h-10
                bg-[var(--color-surface-light)]
                px-3
                transition-colors
                focus-within:border-[var(--color-accent)]
                focus-within:bg-white
              "
            >
              <SearchIcon />

              <input
                ref={searchInputRef}
                value={searchQuery}
                onChange={(event) => {
                  setSearchQuery(
                    event.target.value,
                  );
                }}
                onKeyDown={(event) => {
                  if (
                    event.key ===
                    "Enter"
                  ) {
                    event.preventDefault();

                    if (
                      event.shiftKey
                    ) {
                      goToPreviousSearchResult();
                    } else {
                      goToNextSearchResult();
                    }
                  }

                  if (
                    event.key ===
                    "Escape"
                  ) {
                    closeSearch();
                  }
                }}
                placeholder="Search conversation"
                aria-label="Search conversation"
                autoComplete="off"
                className="
                  min-w-0
                  flex-1
                  bg-transparent
                  py-[10px]
                  text-[14px]
                  text-[var(--color-secondary)]
                  outline-none
                  placeholder:text-[var(--color-text-muted)]
                "
              />

              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");

                    searchInputRef.current?.focus();
                  }}
                  aria-label="Clear search"
                  className="
                    flex
                    h-7
                    w-7
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    text-[var(--color-text-muted)]
                    transition-colors
                    hover:bg-[var(--color-border-light)]
                    hover:text-[var(--color-text)]
                  "
                >
                  <CloseIcon />
                </button>
              )}
            </div>

            <span
              className="
                hidden
                shrink-0
                whitespace-nowrap
                px-1
                text-[12px]
                text-[var(--color-text-muted)]
                sm:block
              "
              aria-live="polite"
            >
              {searchQuery
                ? searchResults.length >
                  0
                  ? `${activeSearchIndex +
                  1
                  } / ${searchResults.length
                  }`
                  : "No results"
                : "Search"}
            </span>

            <button
              type="button"
              onClick={
                goToPreviousSearchResult
              }
              disabled={
                searchResults.length ===
                0
              }
              aria-label="Previous search result"
              title="Previous result"
              className="
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-full
                text-[var(--color-text)]
                transition-colors
                hover:bg-[var(--color-border-light)]
                disabled:pointer-events-none
                disabled:opacity-30
              "
            >
              <ChevronUpIcon />
            </button>

            <button
              type="button"
              onClick={
                goToNextSearchResult
              }
              disabled={
                searchResults.length ===
                0
              }
              aria-label="Next search result"
              title="Next result"
              className="
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-full
                text-[var(--color-text)]
                transition-colors
                hover:bg-[var(--color-border-light)]
                disabled:pointer-events-none
                disabled:opacity-30
              "
            >
              <ChevronDownIcon />
            </button>

            <button
              type="button"
              onClick={closeSearch}
              aria-label="Close search"
              className="
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-full
                text-[var(--color-text-muted)]
                transition-colors
                hover:bg-[var(--color-border-light)]
                hover:text-[var(--color-text)]
              "
            >
              <CloseIcon />
            </button>
          </div>
        </div>
      )}

      {/* =========================================================
          DEFAULT SEARCH BUTTON
      ========================================================= */}



      {/* =========================================================
          CHAT SCROLL AREA
      ========================================================= */}

      <div
        ref={scrollRef}
        className={`
          relative
          z-10
          min-h-0
          min-w-0
          flex-1
          overflow-x-hidden
          ${hasMessages ? "overflow-y-auto" : "overflow-hidden"}
          overscroll-y-contain
          [scrollbar-gutter:stable]
          touch-pan-y
          [scrollbar-color:#d7d7d7_transparent]
          [scrollbar-width:thin]
        `}
      >
        <div
          className={`
            mx-auto
            flex
            min-h-full
            w-full
            min-w-0
            flex-col
            ${hasMessages
              ? "max-w-[920px] px-4 pt-16 sm:px-8 sm:pt-20 lg:px-0 lg:pt-[92px]"
              : "max-w-none px-0 pt-0"
            }
          `}
          style={
            hasMessages
              ? { paddingBottom: `calc(${composerHeight}px + 32px)` }
              : undefined
          }
        >
          {!hasMessages ? (
            <EmptyChatState
              isLoading={isLoading}
              onSendMessage={onSendMessage}
            />
          ) : (
            <div
              className="
                flex
                w-full
                min-w-0
                flex-col
                gap-10
                sm:gap-12
              "
            >
              {messages.map(
                (message, index) => {
                  const normalizedQuery =
                    searchQuery
                      .trim()
                      .toLowerCase();

                  const isSearchMatch =
                    normalizedQuery.length >
                    0 &&
                    message.content
                      .toLowerCase()
                      .includes(
                        normalizedQuery,
                      );

                  const isActiveSearchMatch =
                    isSearchMatch &&
                    searchResults[
                      activeSearchIndex
                    ]?.id ===
                    message.id;

                  return (
                    <div
                      key={message.id}
                      ref={(element) => {
                        messageRefs.current[
                          message.id
                        ] = element;
                      }}
                      className={`
                        w-full
                        min-w-0
                        max-w-full
                        overflow-visible
                        scroll-mt-24
                        transition-all
                        duration-200
                        ${isActiveSearchMatch
                          ? "rounded-[18px] ring-2 ring-[var(--color-accent)]/35 ring-offset-8"
                          : ""
                        }
                      `}
                    >
                      {message.role ===
                        "user" ? (
                        <UserMessage
                          message={
                            message
                          }
                          searchQuery={
                            searchQuery
                          }
                        />
                      ) : (
                        <AssistantMessage
                          message={
                            message
                          }
                          index={index}
                          feedback={
                            feedback[
                            message.id
                            ] ?? null
                          }
                          copied={
                            copiedMessageId ===
                            message.id
                          }
                          isMenuOpen={
                            menuMessageId ===
                            message.id
                          }
                          searchQuery={
                            searchQuery
                          }
                          isLoading={
                            isLoading
                          }
                          onCopy={() =>
                            handleCopyMessage(
                              message,
                              setCopiedMessageId,
                              copyTimeoutsRef,
                            )
                          }
                          onOpenLink={() =>
                            handleOpenLinks(
                              message,
                            )
                          }
                          onFeedback={(
                            value,
                          ) =>
                            handleFeedback(
                              message.id,
                              value,
                              setFeedback,
                            )
                          }
                          onRegenerate={() =>
                            handleRegenerate(
                              message,
                              index,
                              onRegenerateMessage,
                            )
                          }
                          onToggleMenu={() =>
                            setMenuMessageId(
                              (current) =>
                                current ===
                                  message.id
                                  ? null
                                  : message.id,
                            )
                          }
                          onCloseMenu={() =>
                            setMenuMessageId(
                              null,
                            )
                          }
                        />
                      )}
                    </div>
                  );
                },
              )}

              {isLoading && (
                <TypingIndicator />
              )}
            </div>
          )}
        </div>
      </div>

      {/* =========================================================
          JUMP TO LATEST
      ========================================================= */}

      {showScrollButton && (
        <button
          type="button"
          onClick={() =>
            scrollToBottom("smooth")
          }
          aria-label="Jump to latest message"
          title="Jump to latest message"
          className="
            absolute
            right-4
            z-30
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            border
            border-[var(--color-border)]
            bg-white
            text-[var(--color-text)]
            shadow-[0_6px_20px_rgba(0,0,0,0.10)]
            transition-all
            duration-200
            hover:-translate-y-0.5
            hover:bg-[var(--color-surface-light)]
            active:scale-95
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-[var(--color-accent)]/40
            sm:right-8
          "
          style={{
            bottom: `calc(${composerHeight}px + 18px)`,
          }}
        >
          <ArrowDownIcon />
        </button>
      )}

      {/* =========================================================
          FIXED COMPOSER

          Active conversations keep the fixed composer. The empty Figma
          state renders the composer inline in the center of the page.
      ========================================================= */}

      {hasMessages && (
        <div
          className="
            pointer-events-none
            absolute
            inset-x-0
            bottom-0
            z-40
            px-3
            pb-[max(10px,env(safe-area-inset-bottom))]
            pt-12
            sm:px-5
            sm:pb-[max(14px,env(safe-area-inset-bottom))]
            sm:pt-14
            lg:px-0
          "
        >
          <div
            ref={composerRef}
            className="
              pointer-events-auto
              mx-auto
              w-full
              max-w-[920px]
              min-w-0
            "
          >
            <ChatComposer
              disabled={isLoading}
              onSendMessage={onSendMessage}
            />
          </div>
        </div>
      )}

      {/* =========================================================
          BACKGROUND ANIMATION CSS
      ========================================================= */}

      <style>{`
        .chat-screen {
          isolation: isolate;
        }

        /* Base Figma-style green/white field. The movement is intentionally
           very slow so the background feels alive without distracting from
           the chat UI. */
        .chat-background-base {
          animation: chatBackgroundWave 24s ease-in-out infinite;
          transform-origin: 50% 42%;
          will-change: transform, background-position;
        }

        .chat-background-soft {
          animation: chatBackgroundSoftWave 30s ease-in-out infinite;
          transform-origin: center center;
          will-change: transform, opacity;
        }

        /* Individual vertical Figma bars. Each bar has a slightly different
           delay, creating a soft left-to-right wave instead of moving the
           entire background as one block. */
        .chat-background-bar {
          animation: chatBarWave 18s ease-in-out infinite;
          transform-origin: 50% 50%;
          will-change: transform, opacity;
        }

        @keyframes chatBackgroundWave {
          0%, 100% {
            transform: scale(1.035) translate3d(0, 0, 0);
            background-position: 50% 50%;
          }
          25% {
            transform: scale(1.045) translate3d(-0.35%, 0.12%, 0);
            background-position: 49% 50.5%;
          }
          50% {
            transform: scale(1.055) translate3d(0.35%, -0.16%, 0);
            background-position: 51% 49.5%;
          }
          75% {
            transform: scale(1.045) translate3d(0.2%, 0.1%, 0);
            background-position: 50.5% 50%;
          }
        }

        @keyframes chatBarWave {
          0%, 100% {
            transform: translate3d(0, 0, 0) skewX(0deg) scaleX(1);
            opacity: 0.72;
          }
          25% {
            transform: translate3d(10px, -0.2%, 0) skewX(-0.45deg) scaleX(1.015);
            opacity: 0.88;
          }
          50% {
            transform: translate3d(-12px, 0.25%, 0) skewX(0.55deg) scaleX(0.985);
            opacity: 0.78;
          }
          75% {
            transform: translate3d(7px, -0.12%, 0) skewX(-0.3deg) scaleX(1.01);
            opacity: 0.86;
          }
        }

        @keyframes chatBackgroundSoftWave {
          0%, 100% {
            transform: translate3d(0, 0, 0) scale(1);
            opacity: 0.68;
          }
          50% {
            transform: translate3d(-0.5%, 0.25%, 0) scale(1.025);
            opacity: 0.88;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .chat-background-base,
          .chat-background-bar,
          .chat-background-soft {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}

/* ===============================================================
   ANIMATED BACKGROUND
=============================================================== */

function AnimatedChatBackground() {
  return (
    <div
      className="
        pointer-events-none
        absolute
        inset-0
        z-0
        overflow-hidden
        bg-[#f8fbf3]
      "
      aria-hidden="true"
    >
      <div
        className="
          chat-background-base
          absolute
          inset-[-8%]
          opacity-[0.98]
        "
        style={{
          backgroundImage: `
            radial-gradient(ellipse at 50% 34%, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.82) 24%, rgba(255,255,255,0) 56%),
            linear-gradient(90deg,
              rgba(190,222,150,0.42) 0%,
              rgba(226,242,204,0.30) 10%,
              rgba(255,255,255,0.86) 23%,
              rgba(239,247,227,0.36) 34%,
              rgba(255,255,255,0.90) 47%,
              rgba(239,247,227,0.36) 60%,
              rgba(255,255,255,0.88) 73%,
              rgba(220,239,198,0.32) 85%,
              rgba(194,226,155,0.42) 100%
            ),
            linear-gradient(180deg, #ffffff 0%, #fbfdf8 34%, #f3f9e9 68%, #dff0c5 100%)
          `,
          backgroundSize: "120% 120%, 120% 100%, 100% 100%",
        }}
      />

      {/* =============================================================
          FIGMA VERTICAL WAVE BARS
          -------------------------------------------------------------
          These are real layered elements rather than a repeating-gradient.
          That lets every vertical band move independently and slowly, which
          creates the soft wave visible in the Figma reference.
      ============================================================= */}
      <div
        className="
          absolute
          inset-[-7%]
          overflow-hidden
        "
      >
        {[
          { left: "2%", width: "8.5%", delay: "-1.0s" },
          { left: "12.5%", width: "7.5%", delay: "-3.2s" },
          { left: "22%", width: "8%", delay: "-5.4s" },
          { left: "32.5%", width: "7%", delay: "-7.6s" },
          { left: "42%", width: "8%", delay: "-9.8s" },
          { left: "52.5%", width: "7.5%", delay: "-12.0s" },
          { left: "62%", width: "8%", delay: "-14.2s" },
          { left: "72.5%", width: "7.5%", delay: "-16.4s" },
          { left: "82%", width: "8.5%", delay: "-4.1s" },
          { left: "92%", width: "7%", delay: "-8.7s" },
        ].map((bar, index) => (
          <div
            key={`chat-bg-bar-${index}`}
            className="
              chat-background-bar
              absolute
              top-0
              h-full
              rounded-[999px]
              border-l
              border-r
              border-[#a9cd7d]/[0.055]
              bg-[linear-gradient(90deg,rgba(173,210,125,0.025)_0%,rgba(151,195,94,0.085)_45%,rgba(173,210,125,0.025)_100%)]
              shadow-[inset_1px_0_0_rgba(142,181,91,0.055),inset_-1px_0_0_rgba(142,181,91,0.045)]
              blur-[0.15px]
            "
            style={{
              left: bar.left,
              width: bar.width,
              animationDelay: bar.delay,
            }}
          >
            <span
              aria-hidden="true"
              className="
                absolute
                inset-y-0
                left-1/2
                w-px
                -translate-x-1/2
                bg-gradient-to-b
                from-transparent
                via-[#9bc36c]/[0.075]
                to-transparent
              "
            />
          </div>
        ))}
      </div>

      <div
        className="
          chat-background-soft
          absolute
          inset-[-6%]
          bg-[radial-gradient(ellipse_at_50%_38%,rgba(255,255,255,0.58)_0%,rgba(255,255,255,0.18)_35%,transparent_66%)]
        "
      />

      <div
        className="
          absolute
          inset-0
          bg-gradient-to-b
          from-white/10
          via-transparent
          to-[#dff0c5]/16
        "
      />
    </div>
  );
}

/* ===============================================================
   EMPTY STATE
=============================================================== */

function EmptyChatState({
  isLoading,
  onSendMessage,
}: {
  isLoading: boolean;
  onSendMessage: (
    message: string,
    files?: File[],
  ) => void | Promise<void>;
}) {
  return (
    <div
      className="
        relative
        flex
        min-h-[100dvh]
        w-full
        flex-col
        items-center
        overflow-hidden
        px-4
        pb-8
        pt-0
        text-center
        sm:px-6
      "
    >

      {/* =========================================================
          FIGMA EMPTY STATE
      ========================================================= */}
      <div
        className="
          relative
          z-10
          flex
          min-h-[100dvh]
          w-full
          max-w-[1400px]
          flex-col
          items-center
          text-center
        "
      >
        {/* BADGE */}
        <div
          className="
            absolute
            left-1/2
            top-[168px]
            inline-flex
            h-[38px]
            -translate-x-1/2
            items-center
            justify-center
            gap-[8px]
            whitespace-nowrap
            rounded-full
            border
            border-white/80
            bg-white/55
            px-[20px]
            font-primary
            text-[13px]
            font-medium
            uppercase
            leading-none
            tracking-[-0.012em]
            text-[#007246]
            shadow-[0_6px_24px_rgba(72,115,40,0.07)]
            backdrop-blur-[5px]
            sm:top-[190px]
            sm:h-[40px]
            sm:px-[22px]
            sm:text-[12px]
            max-[768px]:!text-[10px]
            max-[768px]:!leading-[28px]
            lg:top-[202px]
          "
        >
          <span
            aria-hidden="true"
            className="text-[16px] leading-none sm:text-[17px]"
          >

          </span>
          AI POWERED FOOD DECISION PLATFORM
        </div>

        {/* HEADING */}
        <h1
          className="
            absolute
            left-1/2
            !top-[245px]
            w-[calc(100%-32px)]
            -translate-x-1/2
            font-primary
            !text-h2
            font-medium
            !leading-[71px]
            tracking-[-4%]
            text-[#141414]
            sm:top-[265px]
            sm:w-[calc(100%-80px)]
            lg:top-[330px]
            lg:w-[1200px]
            lg:max-w-[1200px]
            lg:!text-h2
            xl:!text-h2
            max-[768px]:!text-[32px]
            max-[768px]:!leading-[41px]
            max-[768px]:!top-[225px]
          "
        >
          <span className="inline mr-[6px] min-[767px]:block">
            Ask Meal Eats anything about
          </span>

          <span
            className="
              mt-[14px]
              inline
              font-accent
              text-[42px]
              font-normal
              min-[767px]:block
              italic
              leading-[0.86]
              tracking-[-0.045em]
              sm:mt-[15px]
              sm:text-[52px]
              md:text-[58px]
              lg:text-[64px]
              xl:text-[68px]
            "
          >
            your health...
          </span>
        </h1>

        {/* =======================================================
            FIGMA EMPTY COMPOSER

            Intentionally independent from ChatComposer. The normal
            ChatComposer owns its own layout rules and was causing
            the oversized white bar in the empty state.
        ======================================================= */}
        <div
          className="
            absolute
            left-1/2
            top-[455px]
            w-[calc(100%-32px)]
            max-w-[520px]
            -translate-x-1/2
            sm:top-[475px]
            sm:w-[520px]
            lg:top-[433px]
            lg:max-w-[520px]
            max-[768px]:!top-[330px]
            xl:w-[520px]
          "
        >
          <FigmaEmptyComposer
            disabled={isLoading}
            onSendMessage={onSendMessage}
          />
        </div>

        {/* PRIVACY */}
        <p
          className="
            absolute
            left-1/2
            w-[calc(100%-32px)]
            max-w-[620px]
            -translate-x-1/2
            px-2
            font-primary
            text-[11px]
            font-normal
            leading-[1.5]
            tracking-[-0.012em]
            text-[#727772]
            sm:text-[12px]
            lg:top-[625px]
            lg:text-[13px]
            max-[768px]:!top-[580px]
          "
        >
          By messaging MealEatsAI, you agree to our{" "}
          <span className="underline underline-offset-2">
            Terms
          </span>{" "}
          and{" "}
          <span className="underline underline-offset-2">
            Privacy Policy
          </span>
          .
          <br />
          Your privacy choices
        </p>
      </div>
    </div>
  );
}

/* ===============================================================
   FIGMA EMPTY COMPOSER
=============================================================== */

function FigmaEmptyComposer({
  disabled,
  onSendMessage,
}: {
  disabled: boolean;
  onSendMessage: (
    message: string,
    files?: File[],
  ) => void | Promise<void>;
}) {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [value, setValue] = useState("");
  const [selectedFile, setSelectedFile] =
    useState<File | null>(null);

  const submit = useCallback(() => {
    const message = value.trim();

    if (disabled || (!message && !selectedFile)) {
      return;
    }

    const files = selectedFile
      ? [selectedFile]
      : [];

    void onSendMessage(message, files);

    setValue("");
    setSelectedFile(null);

    requestAnimationFrame(() => {
      if (inputRef.current) {
        inputRef.current.style.height = "40px";
        inputRef.current.focus();
      }
    });
  }, [
    disabled,
    onSendMessage,
    selectedFile,
    value,
  ]);

  const handleChange = (
    event: ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const textarea = event.target;
    setValue(textarea.value);

    textarea.style.height = "0px";

    const nextHeight = Math.min(
      Math.max(textarea.scrollHeight, 40),
      120,
    );

    textarea.style.height = `${nextHeight}px`;
  };

  const handleKeyDown = (
  event: ReactKeyboardEvent<HTMLTextAreaElement>,
) => {
    if (
      event.key === "Enter" &&
      !event.shiftKey &&
      !event.nativeEvent.isComposing
    ) {
      event.preventDefault();
      submit();
    }
  };

  const handleFileChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (file) {
      setSelectedFile(file);
    }

    event.target.value = "";
  };

  const canSend =
    !disabled &&
    (value.trim().length > 0 ||
      selectedFile !== null);

  return (
    <div className="w-full">
      {selectedFile && (
        <div
          className="
            mb-2
            flex
            max-w-full
            items-center
            justify-between
            rounded-[12px]
            border
            border-[#e2e6df]
            bg-white/90
            px-3
            py-2
            text-left
            shadow-[0_4px_16px_rgba(0,0,0,0.05)]
          "
        >
          <span className="min-w-0 truncate text-[11px] text-[#626662]">
            {selectedFile.name}
          </span>

          <button
            type="button"
            onClick={() => setSelectedFile(null)}
            className="
              ml-2
              shrink-0
              text-[11px]
              text-[#777]
              underline
              underline-offset-2
            "
          >
            Remove
          </button>
        </div>
      )}



      <div
        className="
          flex
          flex-col
          min-h-[84px]
          w-full
          items-center
          gap-[12px]
          rounded-[24px]
          border
          border-[#e5e8e4]
          bg-white
          px-[18px]
          py-[14px]
          text-left
          shadow-[0_12px_32px_rgba(45,67,35,0.12)]
          transition-[border-color,box-shadow]
          duration-200
          focus-within:border-[#d4ddd0]
          focus-within:shadow-[0_14px_38px_rgba(45,67,35,0.15)]
          sm:rounded-[25px]
          sm:px-[20px]
        "
      >
        <div className="flex items-center mr-auto gap-[5.5px]">
          <div className="search-icon"><Search className="h-[16px] w-[16px] text-dark" /> </div>
          <div className="text"><p className="text-body leading-[150%] text-dark">Hey Dia...</p></div>
        </div>
        <div className="flex justify-between items-center !w-full">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={disabled}
            aria-label="Add tabs or files"
            title="Add tabs or files"
            className="
            flex
            h-[36px]
            w-[36px]
            shrink-0
            items-center
            justify-center
            rounded-full
            text-[#7c817c]
            transition-colors
            hover:bg-[#f2f4f0]
            hover:text-[#202420]
            disabled:pointer-events-none
            disabled:opacity-40
          "
          >
            <span
              aria-hidden="true"
              className="text-[28px] font-light leading-none"
            >
              +
            </span>
          </button>

          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />

          <textarea
            ref={inputRef}
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            rows={1}
            placeholder="Ask anything"
            aria-label="Ask Meal Eats anything"
            className="
            min-h-[40px]
            min-w-0
            flex-1
            resize-none
            overflow-hidden
            border-0
            bg-transparent
            px-0
            py-[9px]
            font-primary
            text-[15px]
            font-normal
            leading-[22px]
            tracking-[-0.01em]
            text-[#252725]
            outline-none
            placeholder:text-[#8b8f8a]
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
          />

          <button
            type="button"
            onClick={submit}
            disabled={!canSend}
            aria-label="Send message"
            title="Send message"
            className="
            flex
            h-[42px]
            w-[42px]
            shrink-0
            items-center
            justify-center
            rounded-full
            bg-[#050505]
            text-white
            shadow-[0_4px_12px_rgba(0,0,0,0.10)]
            transition-[transform,background-color,opacity]
            duration-200
            hover:scale-[1.03]
            hover:bg-[#111]
            active:scale-95
            disabled:cursor-default
            disabled:bg-[#bfc1bf]
          "
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-[19px] w-[19px]"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M12 19V5" />
              <path d="m6 11 6-6 6 6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

/* ===============================================================
   USER MESSAGE
=============================================================== */

function UserMessage({
  message,
  searchQuery,
}: {
  message: ChatMessage;
  searchQuery: string;
}) {
  return (
    <div className="flex w-full min-w-0 justify-end">
      <div
        className="
          min-w-0
          max-w-[88%]
          overflow-hidden
          break-words
          [overflow-wrap:anywhere]
          rounded-[22px]
          border
          border-[var(--color-border)]
          bg-[var(--color-surface-light)]
          px-4
          py-3
          text-[15px]
          leading-6
          text-[var(--color-text)]
          shadow-[0_1px_2px_rgba(0,0,0,0.02)]
          sm:max-w-[560px]
          sm:px-5
          sm:py-[14px]
          sm:text-[16px]
        "
      >
        <MessageText
          content={message.content}
          searchQuery={searchQuery}
        />
      </div>
    </div>
  );
}

/* ===============================================================
   ASSISTANT MESSAGE
=============================================================== */

type AssistantMessageProps = {
  message: ChatMessage;
  index: number;
  feedback: FeedbackState;
  copied: boolean;
  isMenuOpen: boolean;
  searchQuery: string;
  isLoading: boolean;
  onCopy: () => void;
  onOpenLink: () => void;
  onFeedback: (
    value: FeedbackState,
  ) => void;
  onRegenerate: () => void;
  onToggleMenu: () => void;
  onCloseMenu: () => void;
};

function AssistantMessage({
  message,
  index,
  feedback,
  copied,
  isMenuOpen,
  searchQuery,
  isLoading,
  onCopy,
  onOpenLink,
  onFeedback,
  onRegenerate,
  onToggleMenu,
  onCloseMenu,
}: AssistantMessageProps) {
  return (
    <div className="flex w-full min-w-0 flex-col items-start">
      <div
        className="
          min-w-0
          w-full
          max-w-[700px]
          overflow-hidden
          break-words
          [overflow-wrap:anywhere]
          text-[15px]
          leading-[25px]
          text-[var(--color-text)]
          sm:text-[17px]
          sm:leading-[27px]
        "
      >
        <MessageText
          content={message.content}
          searchQuery={searchQuery}
        />
      </div>

      <div
        data-message-actions
        className="
          relative
          mt-3
          flex
          max-w-full
          flex-wrap
          items-center
          gap-0.5
          sm:mt-4
          sm:gap-1
        "
      >
        <ActionButton
          label={
            copied
              ? "Copied"
              : "Copy response"
          }
          onClick={onCopy}
          active={copied}
        >
          <CopyIcon />
        </ActionButton>

        <ActionButton
          label="Open links"
          onClick={onOpenLink}
        >
          <LinkIcon />
        </ActionButton>

        <ActionButton
          label="Like response"
          onClick={() =>
            onFeedback(
              feedback === "like"
                ? null
                : "like",
            )
          }
          active={
            feedback === "like"
          }
        >
          <ThumbUpIcon />
        </ActionButton>

        <ActionButton
          label="Dislike response"
          onClick={() =>
            onFeedback(
              feedback === "dislike"
                ? null
                : "dislike",
            )
          }
          active={
            feedback === "dislike"
          }
        >
          <ThumbDownIcon />
        </ActionButton>

        <ActionButton
          label={
            isLoading
              ? "Generating response"
              : "Regenerate response"
          }
          onClick={onRegenerate}
          disabled={isLoading}
        >
          <RefreshIcon />
        </ActionButton>

        <div className="relative">
          <ActionButton
            label="More options"
            onClick={onToggleMenu}
            active={isMenuOpen}
          >
            <MoreIcon />
          </ActionButton>

          {isMenuOpen && (
            <MessageMenu
              onCopy={onCopy}
              onRegenerate={
                onRegenerate
              }
              onClose={onCloseMenu}
              disabled={isLoading}
            />
          )}
        </div>
      </div>
    </div>
  );
}

/* ===============================================================
   ACTION BUTTON
=============================================================== */

function ActionButton({
  children,
  label,
  onClick,
  active = false,
  disabled = false,
}: {
  children: ReactNode;
  label: string;
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      disabled={disabled}
      className={`
        flex
        h-9
        w-9
        shrink-0
        items-center
        justify-center
        rounded-full
        transition-all
        duration-150
        hover:bg-[var(--color-border-light)]
        active:scale-95
        disabled:pointer-events-none
        disabled:opacity-40
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-[var(--color-accent)]/40
        sm:h-8
        sm:w-8
        ${active
          ? "bg-[#f1f6e8] text-[#6f9f27]"
          : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
        }
      `}
    >
      {children}
    </button>
  );
}

/* ===============================================================
   MORE MENU
=============================================================== */

function MessageMenu({
  onCopy,
  onRegenerate,
  onClose,
  disabled,
}: {
  onCopy: () => void;
  onRegenerate: () => void;
  onClose: () => void;
  disabled: boolean;
}) {
  return (
    <div
      className="
        absolute
        bottom-[calc(100%+8px)]
        left-0
        z-50
        w-[190px]
        overflow-hidden
        rounded-[14px]
        border
        border-[var(--color-border)]
        bg-white
        p-1
        shadow-[0_12px_35px_rgba(0,0,0,0.12)]
      "
      role="menu"
    >
      <button
        type="button"
        role="menuitem"
        onClick={() => {
          onCopy();
          onClose();
        }}
        className="
          flex
          w-full
          items-center
          rounded-[10px]
          px-3
          py-2.5
          text-left
          text-[13px]
          text-[var(--color-text)]
          transition-colors
          hover:bg-[var(--color-surface-light)]
          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-inset
          focus-visible:ring-[var(--color-accent)]/40
        "
      >
        Copy response
      </button>

      <button
        type="button"
        role="menuitem"
        disabled={disabled}
        onClick={() => {
          onRegenerate();
          onClose();
        }}
        className="
          flex
          w-full
          items-center
          rounded-[10px]
          px-3
          py-2.5
          text-left
          text-[13px]
          text-[var(--color-text)]
          transition-colors
          hover:bg-[var(--color-surface-light)]
          disabled:pointer-events-none
          disabled:opacity-40
          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-inset
          focus-visible:ring-[var(--color-accent)]/40
        "
      >
        Regenerate response
      </button>
    </div>
  );
}

/* ===============================================================
   TYPING INDICATOR
=============================================================== */

function TypingIndicator() {
  return (
    <div
      className="
        flex
        w-full
        flex-col
        items-start
      "
      aria-label="Meal Eats AI is typing"
      role="status"
    >
      <div
        className="
          flex
          items-center
          gap-[5px]
          py-2
        "
      >
        <span
          className="
            h-[6px]
            w-[6px]
            animate-bounce
            rounded-full
            bg-[var(--color-accent)]
          "
        />

        <span
          className="
            h-[6px]
            w-[6px]
            animate-bounce
            rounded-full
            bg-[var(--color-accent)]
            [animation-delay:150ms]
          "
        />

        <span
          className="
            h-[6px]
            w-[6px]
            animate-bounce
            rounded-full
            bg-[var(--color-accent)]
            [animation-delay:300ms]
          "
        />
      </div>
    </div>
  );
}

/* ===============================================================
   MESSAGE TEXT
=============================================================== */

function MessageText({
  content,
  searchQuery,
}: {
  content: string;
  searchQuery: string;
}) {
  const blocks = useMemo(
    () => parseMessage(content),
    [content],
  );

  return (
    <div
      className="
        min-w-0
        max-w-full
        break-words
        [overflow-wrap:anywhere]
      "
    >
      {blocks.map(
        (block, index) => {
          if (
            block.type ===
            "list"
          ) {
            return (
              <ul
                key={`list-${index}`}
                className="
                  my-2
                  list-disc
                  space-y-1
                  pl-5
                "
              >
                {block.items.map(
                  (
                    item,
                    itemIndex,
                  ) => (
                    <li
                      key={`${item}-${itemIndex}`}
                      className="
                        min-w-0
                        break-words
                        [overflow-wrap:anywhere]
                      "
                    >
                      <InlineText
                        text={item}
                        searchQuery={
                          searchQuery
                        }
                      />
                    </li>
                  ),
                )}
              </ul>
            );
          }

          if (
            block.type ===
            "heading"
          ) {
            return (
              <h4
                key={`heading-${index}`}
                className="
                  mb-2
                  mt-4
                  break-words
                  text-[16px]
                  font-semibold
                  leading-6
                  text-[var(--color-secondary)]
                  first:mt-0
                "
              >
                <InlineText
                  text={
                    block.text
                  }
                  searchQuery={
                    searchQuery
                  }
                />
              </h4>
            );
          }

          if (
            block.type ===
            "divider"
          ) {
            return (
              <hr
                key={`divider-${index}`}
                className="
                  my-4
                  border-0
                  border-t
                  border-[var(--color-border)]
                "
              />
            );
          }

          return (
            <p
              key={`paragraph-${index}`}
              className={
                index > 0
                  ? "mt-2"
                  : ""
              }
            >
              <InlineText
                text={block.text}
                searchQuery={
                  searchQuery
                }
              />
            </p>
          );
        },
      )}
    </div>
  );
}

/* ===============================================================
   MESSAGE BLOCK TYPES
=============================================================== */

type MessageBlock =
  | {
    type: "paragraph";
    text: string;
  }
  | {
    type: "heading";
    text: string;
  }
  | {
    type: "list";
    items: string[];
  }
  | {
    type: "divider";
  };

/* ===============================================================
   MESSAGE PARSER
=============================================================== */

function parseMessage(
  content: string,
): MessageBlock[] {
  const lines = content
    .replace(/\r\n/g, "\n")
    .split("\n");

  const blocks: MessageBlock[] =
    [];

  let currentList: string[] =
    [];

  const flushList = () => {
    if (
      currentList.length ===
      0
    ) {
      return;
    }

    blocks.push({
      type: "list",
      items: [
        ...currentList,
      ],
    });

    currentList = [];
  };

  for (const originalLine of lines) {
    const line =
      originalLine.trim();

    if (line === "---") {
      flushList();

      blocks.push({
        type: "divider",
      });

      continue;
    }

    if (
      /^#{1,3}\s+/.test(line)
    ) {
      flushList();

      blocks.push({
        type: "heading",
        text: line.replace(
          /^#{1,3}\s+/,
          "",
        ),
      });

      continue;
    }

    if (
      /^[-*]\s+/.test(line)
    ) {
      currentList.push(
        line.replace(
          /^[-*]\s+/,
          "",
        ),
      );

      continue;
    }

    if (!line) {
      flushList();
      continue;
    }

    flushList();

    blocks.push({
      type: "paragraph",
      text: line,
    });
  }

  flushList();

  return blocks;
}

/* ===============================================================
   INLINE TEXT
=============================================================== */

function InlineText({
  text,
  searchQuery,
}: {
  text: string;
  searchQuery: string;
}) {
  const parts = text.split(
    /(\*\*[^*]+\*\*)/g,
  );

  return (
    <>
      {parts.map(
        (part, index) => {
          const isBold =
            part.startsWith(
              "**",
            ) &&
            part.endsWith(
              "**",
            ) &&
            part.length > 4;

          const value = isBold
            ? part.slice(2, -2)
            : part;

          return (
            <span
              key={`${part}-${index}`}
            >
              {isBold ? (
                <strong className="font-semibold text-[var(--color-secondary)]">
                  <HighlightedText
                    text={value}
                    searchQuery={
                      searchQuery
                    }
                  />
                </strong>
              ) : (
                <HighlightedText
                  text={value}
                  searchQuery={
                    searchQuery
                  }
                />
              )}
            </span>
          );
        },
      )}
    </>
  );
}

/* ===============================================================
   SEARCH HIGHLIGHT
=============================================================== */

function HighlightedText({
  text,
  searchQuery,
}: {
  text: string;
  searchQuery: string;
}) {
  const query =
    searchQuery.trim();

  if (!query) {
    return <>{text}</>;
  }

  const escapedQuery =
    escapeRegExp(query);

  const parts = text.split(
    new RegExp(
      `(${escapedQuery})`,
      "gi",
    ),
  );

  return (
    <>
      {parts.map(
        (part, index) => {
          const matches =
            part.toLowerCase() ===
            query.toLowerCase();

          if (!matches) {
            return (
              <span
                key={`${part}-${index}`}
              >
                {part}
              </span>
            );
          }

          return (
            <mark
              key={`${part}-${index}`}
              className="
                rounded-[3px]
                bg-[#dff0b9]
                px-0.5
                text-[var(--color-secondary)]
              "
            >
              {part}
            </mark>
          );
        },
      )}
    </>
  );
}

function escapeRegExp(
  value: string,
): string {
  return value.replace(
    /[.*+?^${}()|[\]\\]/g,
    "\\$&",
  );
}

/* ===============================================================
   COPY
=============================================================== */

async function handleCopyMessage(
  message: ChatMessage,
  setCopiedMessageId: Dispatch<
    SetStateAction<string | null>
  >,
  copyTimeoutsRef: MutableRefObject<
    Record<
      string,
      number
    >
  >,
) {
  try {
    if (
      navigator.clipboard &&
      window.isSecureContext
    ) {
      await navigator.clipboard.writeText(
        message.content,
      );
    } else {
      const textarea =
        document.createElement(
          "textarea",
        );

      textarea.value =
        message.content;

      textarea.style.position =
        "fixed";

      textarea.style.opacity =
        "0";

      document.body.appendChild(
        textarea,
      );

      textarea.select();

      document.execCommand(
        "copy",
      );

      document.body.removeChild(
        textarea,
      );
    }

    setCopiedMessageId(
      message.id,
    );

    if (
      copyTimeoutsRef.current[
      message.id
      ]
    ) {
      clearTimeout(
        copyTimeoutsRef.current[
        message.id
        ],
      );
    }

    copyTimeoutsRef.current[
      message.id
    ] = window.setTimeout(
      () => {
        setCopiedMessageId(
          (current) =>
            current ===
              message.id
              ? null
              : current,
        );

        delete copyTimeoutsRef.current[
          message.id
        ];
      },
      1800,
    );
  } catch (error) {
    console.error(
      "Unable to copy AI response:",
      error,
    );
  }
}

/* ===============================================================
   OPEN LINKS
=============================================================== */

function handleOpenLinks(
  message: ChatMessage,
) {
  const urls =
    message.content.match(
      /https?:\/\/[^\s<>"'`]+/g,
    );

  if (
    !urls ||
    urls.length === 0
  ) {
    return;
  }

  const cleanUrl =
    urls[0].replace(
      /[.,!?;:)\]}]+$/,
      "",
    );

  try {
    const url = new URL(
      cleanUrl,
    );

    if (
      url.protocol !==
      "http:" &&
      url.protocol !==
      "https:"
    ) {
      return;
    }

    window.open(
      url.toString(),
      "_blank",
      "noopener,noreferrer",
    );
  } catch {
    console.warn(
      "Invalid URL:",
      cleanUrl,
    );
  }
}

/* ===============================================================
   FEEDBACK
=============================================================== */

function handleFeedback(
  messageId: string,
  value: FeedbackState,
  setFeedback: Dispatch<
    SetStateAction<
      Record<
        string,
        FeedbackState
      >
    >
  >,
) {
  setFeedback(
    (current) => ({
      ...current,
      [messageId]:
        value,
    }),
  );
}

/* ===============================================================
   REGENERATE
=============================================================== */

async function handleRegenerate(
  message: ChatMessage,
  index: number,
  onRegenerateMessage:
    | ChatScreenProps["onRegenerateMessage"]
    | undefined,
) {
  if (!onRegenerateMessage) {
    console.warn(
      "onRegenerateMessage was not provided. Connect it in AIChat.tsx to enable regeneration.",
    );

    return;
  }

  try {
    await onRegenerateMessage(
      message,
      index,
    );
  } catch (error) {
    console.error(
      "Unable to regenerate response:",
      error,
    );
  }
}

/* ===============================================================
   SEARCH ICON
=============================================================== */

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="
        h-[17px]
        w-[17px]
        shrink-0
      "
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle
        cx="11"
        cy="11"
        r="6.5"
      />

      <path d="m16 16 4.5 4.5" />
    </svg>
  );
}

/* ===============================================================
   CLOSE ICON
=============================================================== */

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="
        h-[16px]
        w-[16px]
      "
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="m6 6 12 12" />
      <path d="m18 6-12 12" />
    </svg>
  );
}

/* ===============================================================
   CHEVRON UP
=============================================================== */

function ChevronUpIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="
        h-[17px]
        w-[17px]
      "
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m6 14 6-6 6 6" />
    </svg>
  );
}

/* ===============================================================
   CHEVRON DOWN
=============================================================== */

function ChevronDownIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="
        h-[17px]
        w-[17px]
      "
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m6 10 6 6 6-6" />
    </svg>
  );
}

/* ===============================================================
   COPY ICON
=============================================================== */

function CopyIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="
        h-[17px]
        w-[17px]
      "
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect
        x="8"
        y="8"
        width="13"
        height="13"
        rx="2"
      />

      <path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3" />
    </svg>
  );
}

/* ===============================================================
   LINK ICON
=============================================================== */

function LinkIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="
        h-[17px]
        w-[17px]
      "
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M10 13a5 5 0 0 0 7.07 0l2-2a5 5 0 0 0-7.07-7.07l-1.15 1.15" />

      <path d="M14 11a5 5 0 0 0-7.07 0l-2 2A5 5 0 0 0 7 20.07l1.15-1.15" />
    </svg>
  );
}

/* ===============================================================
   THUMBS UP
=============================================================== */

function ThumbUpIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="
        h-[17px]
        w-[17px]
      "
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M7 10v11H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3Z" />

      <path d="M7 21h9.2a2 2 0 0 0 1.96-1.61l1.35-7A2 2 0 0 0 17.55 10H14l.7-3.5A2.9 2.9 0 0 0 11.86 3L7 10v11Z" />
    </svg>
  );
}

/* ===============================================================
   THUMBS DOWN
=============================================================== */

function ThumbDownIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="
        h-[17px]
        w-[17px]
      "
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M7 14V3H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h3Z" />

      <path d="M7 3h9.2a2 2 0 0 1 1.96 1.61l1.35 7A2 2 0 0 1 17.55 14H14l.7 3.5A2.9 2.9 0 0 1 11.86 21L7 14V3Z" />
    </svg>
  );
}

/* ===============================================================
   REFRESH ICON
=============================================================== */

function RefreshIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="
        h-[17px]
        w-[17px]
      "
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 11a8.1 8.1 0 0 0-14.9-4L3 10" />

      <path d="M3 5v5h5" />

      <path d="M4 13a8.1 8.1 0 0 0 14.9 4L21 14" />

      <path d="M21 19v-5h-5" />
    </svg>
  );
}

/* ===============================================================
   MORE ICON
=============================================================== */

function MoreIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="
        h-[17px]
        w-[17px]
      "
      stroke="currentColor"
      strokeWidth="1.7"
      aria-hidden="true"
    >
      <circle
        cx="5"
        cy="12"
        r="1.3"
        fill="currentColor"
        stroke="none"
      />

      <circle
        cx="12"
        cy="12"
        r="1.3"
        fill="currentColor"
        stroke="none"
      />

      <circle
        cx="19"
        cy="12"
        r="1.3"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}

/* ===============================================================
   ARROW DOWN ICON
=============================================================== */

function ArrowDownIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="
        h-[18px]
        w-[18px]
      "
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 5v14" />

      <path d="m6 13 6 6 6-6" />
    </svg>
  );
}