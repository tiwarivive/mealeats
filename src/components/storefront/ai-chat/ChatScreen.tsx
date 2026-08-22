"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import type {
  Dispatch,
  MutableRefObject,
  ReactNode,
  SetStateAction,
} from "react";

import ChatComposer from "./ChatComposer";
import type { ChatMessage } from "./AIChat";

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

type FeedbackState = "like" | "dislike" | null;

/* ===============================================================
   CONSTANTS
=============================================================== */

const AUTO_SCROLL_THRESHOLD = 120;
const MOBILE_BREAKPOINT = 768;
const MIN_MOBILE_CHAT_HEIGHT = 320;

/* ===============================================================
   MAIN CHAT SCREEN
=============================================================== */

export default function ChatScreen({
  messages = [],
  isLoading = false,
  onSendMessage = async () => {},
  onRegenerateMessage,
}: ChatScreenProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const composerRef = useRef<HTMLDivElement>(null);
  const chatScreenRef = useRef<HTMLElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const previousMessageCountRef = useRef(messages.length);
  const shouldFollowBottomRef = useRef(true);

  const messageRefs = useRef<
    Record<string, HTMLDivElement | null>
  >({});

  const copyTimeoutsRef = useRef<
    Record<string, number>
  >({});

  const [composerHeight, setComposerHeight] = useState(132);

  const [mobileChatHeight, setMobileChatHeight] =
    useState<number | null>(null);

  const [feedback, setFeedback] = useState<
    Record<string, FeedbackState>
  >({});

  const [menuMessageId, setMenuMessageId] =
    useState<string | null>(null);

  const [copiedMessageId, setCopiedMessageId] =
    useState<string | null>(null);

  const [showScrollButton, setShowScrollButton] =
    useState(false);

  const [searchOpen, setSearchOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");

  const [activeSearchIndex, setActiveSearchIndex] =
    useState(0);

  /* =============================================================
     MOBILE VISUAL VIEWPORT
     
     Important:
     90vh does not reliably represent the visible mobile
     viewport when the browser keyboard is open.

     This calculates the actual available viewport height while
     keeping desktop behavior unchanged.
  ============================================================= */

  useEffect(() => {
    const updateMobileViewport = () => {
      if (typeof window === "undefined") {
        return;
      }

      if (window.innerWidth >= MOBILE_BREAKPOINT) {
        setMobileChatHeight(null);
        return;
      }

      const section = chatScreenRef.current;

      if (!section) {
        return;
      }

      const visualViewport = window.visualViewport;

      const viewportHeight =
        visualViewport?.height ?? window.innerHeight;

      const sectionTop = Math.max(
        0,
        section.getBoundingClientRect().top,
      );

      const availableHeight = Math.max(
        MIN_MOBILE_CHAT_HEIGHT,
        Math.round(viewportHeight - sectionTop),
      );

      setMobileChatHeight(availableHeight);
    };

    updateMobileViewport();

    const visualViewport =
      typeof window !== "undefined"
        ? window.visualViewport
        : null;

    window.addEventListener(
      "resize",
      updateMobileViewport,
      { passive: true },
    );

    window.addEventListener(
      "orientationchange",
      updateMobileViewport,
      { passive: true },
    );

    window.addEventListener(
      "scroll",
      updateMobileViewport,
      { passive: true },
    );

    visualViewport?.addEventListener(
      "resize",
      updateMobileViewport,
    );

    visualViewport?.addEventListener(
      "scroll",
      updateMobileViewport,
    );

    return () => {
      window.removeEventListener(
        "resize",
        updateMobileViewport,
      );

      window.removeEventListener(
        "orientationchange",
        updateMobileViewport,
      );

      window.removeEventListener(
        "scroll",
        updateMobileViewport,
      );

      visualViewport?.removeEventListener(
        "resize",
        updateMobileViewport,
      );

      visualViewport?.removeEventListener(
        "scroll",
        updateMobileViewport,
      );
    };
  }, []);

  /* =============================================================
     SEARCH RESULTS
  ============================================================= */

  const searchResults = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      return [];
    }

    return messages.filter((message) =>
      message.content.toLowerCase().includes(query),
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

  const checkScrollPosition = useCallback(() => {
    const element = scrollRef.current;

    if (!element) {
      return true;
    }

    const distanceFromBottom =
      element.scrollHeight -
      element.scrollTop -
      element.clientHeight;

    const isNearBottom =
      distanceFromBottom <= AUTO_SCROLL_THRESHOLD;

    shouldFollowBottomRef.current = isNearBottom;

    setShowScrollButton(!isNearBottom);

    return isNearBottom;
  }, []);

  /* =============================================================
     SCROLL TO BOTTOM
  ============================================================= */

  const scrollToBottom = useCallback(
    (
      behavior: ScrollBehavior = "smooth",
    ) => {
      const element = scrollRef.current;

      if (!element) {
        return;
      }

      element.scrollTo({
        top: element.scrollHeight,
        behavior,
      });

      shouldFollowBottomRef.current = true;
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

    const currentCount = messages.length;

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

    const frame = requestAnimationFrame(() => {
      const element = scrollRef.current;

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

  const openSearch = useCallback(() => {
    setSearchOpen(true);

    requestAnimationFrame(() => {
      searchInputRef.current?.focus();
    });
  }, []);

  const closeSearch = useCallback(() => {
    setSearchOpen(false);
    setSearchQuery("");
    setActiveSearchIndex(0);
  }, []);

  const scrollToSearchResult = useCallback(
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

      setActiveSearchIndex(safeIndex);

      const target =
        messageRefs.current[message.id];

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

  const goToNextSearchResult = useCallback(() => {
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
      event: KeyboardEvent,
    ) => {
      const isSearchShortcut =
        (event.metaKey || event.ctrlKey) &&
        event.key.toLowerCase() === "k";

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

  const hasMessages = messages.length > 0;

  return (
    <section
      ref={chatScreenRef}
      className="
        chat-screen
        relative
        top-0
        flex
        h-[100vh]
        min-h-0
        w-full
        flex-col
        overflow-hidden
        bg-[var(--color-primary)]
        text-[var(--color-text)]
        
      "
      style={{
        height:
          mobileChatHeight !== null
            ? `${mobileChatHeight}px`
            : undefined,
      }}
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
              min-h-10
              w-full
              max-w-[920px]
              items-center
              gap-1.5
              sm:gap-2
            "
          >
            <div
              className="
                flex
                min-h-10
                min-w-0
                flex-1
                items-center
                gap-2
                rounded-[14px]
                border
                border-[var(--color-border)]
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
                  if (event.key === "Enter") {
                    event.preventDefault();

                    if (event.shiftKey) {
                      goToPreviousSearchResult();
                    } else {
                      goToNextSearchResult();
                    }
                  }

                  if (event.key === "Escape") {
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
                ? searchResults.length > 0
                  ? `${activeSearchIndex + 1} / ${searchResults.length}`
                  : "No results"
                : "Search"}
            </span>

            <button
              type="button"
              onClick={
                goToPreviousSearchResult
              }
              disabled={
                searchResults.length === 0
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
                searchResults.length === 0
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
          CHAT SCROLL AREA
      ========================================================= */}

      <div
        ref={scrollRef}
        className="
          relative
          z-10
          min-h-0
          min-w-0
          flex-1
          overflow-x-hidden
          overflow-y-auto
          overscroll-y-contain
          [scrollbar-gutter:stable]
          touch-pan-y
          [scrollbar-color:#d7d7d7_transparent]
          [scrollbar-width:thin]
          !pt-[120px]
        "
      >
        <div
          className="
            mx-auto
            flex
            min-h-full
            w-full
            max-w-[920px]
            min-w-0
            flex-col
            px-4
            sm:px-8
            
            lg:px-0
            
            
          "
          style={{
            paddingBottom: `calc(${composerHeight}px + 18px)`,
          }}
        >
          {!hasMessages ? (
            <EmptyChatState />
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
                    normalizedQuery.length > 0 &&
                    message.content
                      .toLowerCase()
                      .includes(
                        normalizedQuery,
                      );

                  const isActiveSearchMatch =
                    isSearchMatch &&
                    searchResults[
                      activeSearchIndex
                    ]?.id === message.id;

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
                        
                        ${
                          isActiveSearchMatch
                            ? "rounded-[18px] ring-2 ring-[var(--color-accent)]/35 ring-offset-8"
                            : ""
                        }
                      `}
                    >
                      {message.role === "user" ? (
                        <UserMessage
                          message={message}
                          searchQuery={searchQuery}
                        />
                      ) : (
                        <AssistantMessage
                          message={message}
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
                          isLoading={isLoading}
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
            bottom: `calc(${composerHeight}px + 18px + env(safe-area-inset-bottom))`,
          }}
        >
          <ArrowDownIcon />
        </button>
      )}

      {/* =========================================================
          FIXED COMPOSER

          The composer stays inside ChatScreen so that when the
          mobile keyboard changes the visual viewport, the entire
          chat section and composer resize together.
      ========================================================= */}

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

      {/* =========================================================
          BACKGROUND ANIMATION CSS
      ========================================================= */}

      <style>{`
        .chat-screen {
          isolation: isolate;
        }

        .chat-background {
          animation:
            chatBackgroundWave
            18s
            ease-in-out
            infinite;

          transform-origin: center center;
          will-change: transform;
        }

        .chat-background-soft {
          animation:
            chatBackgroundSoftWave
            24s
            ease-in-out
            infinite;

          transform-origin: center center;
          will-change: transform;
        }

        @keyframes chatBackgroundWave {
          0% {
            transform:
              scale(1.04)
              translate3d(0%, 0%, 0)
              skewX(0deg)
              skewY(0deg);
          }

          20% {
            transform:
              scale(1.055)
              translate3d(-0.7%, 0.35%, 0)
              skewX(0.12deg)
              skewY(-0.08deg);
          }

          40% {
            transform:
              scale(1.07)
              translate3d(0.45%, -0.45%, 0)
              skewX(-0.1deg)
              skewY(0.1deg);
          }

          60% {
            transform:
              scale(1.055)
              translate3d(0.75%, 0.3%, 0)
              skewX(0.1deg)
              skewY(-0.08deg);
          }

          80% {
            transform:
              scale(1.065)
              translate3d(-0.4%, -0.25%, 0)
              skewX(-0.12deg)
              skewY(0.08deg);
          }

          100% {
            transform:
              scale(1.04)
              translate3d(0%, 0%, 0)
              skewX(0deg)
              skewY(0deg);
          }
        }

        @keyframes chatBackgroundSoftWave {
          0% {
            transform:
              translate3d(0%, 0%, 0)
              scale(1);
          }

          25% {
            transform:
              translate3d(0.8%, -0.4%, 0)
              scale(1.015);
          }

          50% {
            transform:
              translate3d(-0.6%, 0.5%, 0)
              scale(1.025);
          }

          75% {
            transform:
              translate3d(-0.8%, -0.3%, 0)
              scale(1.015);
          }

          100% {
            transform:
              translate3d(0%, 0%, 0)
              scale(1);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .chat-background,
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
        bg-white
      "
      aria-hidden="true"
    >
      {/* MAIN IMAGE */}

      <img
        src="/chat-bg.png"
        alt=""
        draggable={false}
        className="
          chat-background
          absolute
          left-1/2
          top-1/2
          h-[110%]
          w-[110%]
          max-w-none
          -translate-x-1/2
          -translate-y-1/2
          object-cover
          object-center
          opacity-[0.94]
        "
      />

      {/* SECOND SOFT LAYER */}

      <div
        className="
          chat-background-soft
          absolute
          inset-[-5%]
          bg-[radial-gradient(circle_at_50%_35%,rgba(255,255,255,0.18),transparent_55%)]
        "
      />

      {/* CONTENT READABILITY */}

      <div
        className="
          absolute
          inset-0
          bg-white/[0.10]
        "
      />

      <div
        className="
          absolute
          inset-0
          bg-gradient-to-b
          from-white/5
          via-transparent
          to-white/20
        "
      />
    </div>
  );
}

/* ===============================================================
   EMPTY STATE
=============================================================== */

function EmptyChatState() {
  return (
    <div
      className="
        flex
        min-h-full
        min-w-0
        max-w-full
        flex-1
        flex-col
        items-center
        justify-center
        px-4
        pb-8
        text-center
      "
    >
      <p
        className="
          max-w-[420px]
          text-[15px]
          leading-6
          text-[var(--color-text-muted)]
          sm:text-[16px]
        "
      >
        Ask me anything about food,
        nutrition, recipes, or healthy
        living.
      </p>
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
  const pdfUrl = extractPdfUrl(
    message.content,
  );

  return (
    <div className="flex w-full min-w-0 flex-col items-start ">
      <div
        className="
          w-full
          max-w-[700px]
          min-w-0
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

        {/* =====================================================
            PDF DOWNLOAD

            This button appears ONLY when the AI response
            actually contains a PDF URL.
        ===================================================== */}

        {pdfUrl && (
          <PdfDownloadButton
            url={pdfUrl}
          />
        )}

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
   PDF DOWNLOAD BUTTON
=============================================================== */

function PdfDownloadButton({
  url,
}: {
  url: string;
}) {
  return (
    <a
      href={url}
      download
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Download PDF"
      title="Download PDF"
      className="
        flex
        h-9
        w-9
        shrink-0
        items-center
        justify-center
        rounded-full
        text-[var(--color-text-muted)]
        transition-all
        duration-150
        hover:bg-[var(--color-border-light)]
        hover:text-[var(--color-text)]
        active:scale-95
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-[var(--color-accent)]/40
        sm:h-8
        sm:w-8
      "
    >
      <DownloadPdfIcon />
    </a>
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

        ${
          active
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
          if (block.type === "list") {
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

          if (block.type === "heading") {
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
                  text={block.text}
                  searchQuery={
                    searchQuery
                  }
                />
              </h4>
            );
          }

          if (block.type === "divider") {
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

  const blocks: MessageBlock[] = [];

  let currentList: string[] = [];

  const flushList = () => {
    if (currentList.length === 0) {
      return;
    }

    blocks.push({
      type: "list",
      items: [...currentList],
    });

    currentList = [];
  };

  for (const originalLine of lines) {
    const line = originalLine.trim();

    if (line === "---") {
      flushList();

      blocks.push({
        type: "divider",
      });

      continue;
    }

    if (/^#{1,3}\s+/.test(line)) {
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

    if (/^[-*]\s+/.test(line)) {
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
    /(\*\*[^\*]+\*\*)/g,
  );

  return (
    <>
      {parts.map(
        (part, index) => {
          const isBold =
            part.startsWith("**") &&
            part.endsWith("**") &&
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
  const query = searchQuery.trim();

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
   PDF URL DETECTION
=============================================================== */

function extractPdfUrl(
  content: string,
): string | null {
  const urls: string[] = [];

  /*
   * Normal URLs
   */
  const normalUrls =
    content.match(
      /https?:\/\/[^\s<>"'`)\]]+/gi,
    ) ?? [];

  urls.push(...normalUrls);

  /*
   * Markdown URLs:
   * [Download PDF](https://example.com/file.pdf)
   */
  const markdownRegex =
    /\[[^\]]*\]\((https?:\/\/[^)\s]+)\)/gi;

  let markdownMatch: RegExpExecArray | null;

  while (
    (markdownMatch =
      markdownRegex.exec(content)) !== null
  ) {
    if (markdownMatch[1]) {
      urls.push(markdownMatch[1]);
    }
  }

  const cleanedUrls = urls.map(
    (url) =>
      url.replace(
        /[.,!?;:)\]}]+$/,
        "",
      ),
  );

  const pdfUrl = cleanedUrls.find(
    (url) =>
      /\.pdf(?:$|[?#&])/i.test(
        url,
      ),
  );

  return pdfUrl ?? null;
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
    Record<string, number>
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

      document.execCommand("copy");

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
      /https?:\/\/[^\s<>"'`]+/gi,
    );

  if (!urls || urls.length === 0) {
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
      url.protocol !== "http:" &&
      url.protocol !== "https:"
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
      [messageId]: value,
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
   DOWNLOAD PDF ICON
=============================================================== */

function DownloadPdfIcon() {
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
      <path d="M12 3v12" />

      <path d="m7 10 5 5 5-5" />

      <path d="M5 21h14" />
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