"use client";

import {
  ArrowUp,
  FileText,
  Plus,
  X,
} from "lucide-react";

import {
  ChangeEvent,
  KeyboardEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type ChatComposerProps = {
  disabled?: boolean;

  /**
   * Sends the user's message and attachments
   * to the parent AI chat component.
   *
   * The parent is responsible for calling the
   * backend /api/ai/chat endpoint.
   */
  onSendMessage: (
    message: string,
    files?: File[],
  ) => void | Promise<void>;

  /**
   * Called whenever the current attachment list changes.
   *
   * This is optional and does not affect the existing
   * message sending flow.
   */
  onFilesSelected?: (
    files: File[],
  ) => void;

  /**
   * Maximum number of attachments.
   *
   * Default: 5
   */
  maxFiles?: number;

  /**
   * Maximum size for each individual file.
   *
   * Default: 10 MB
   */
  maxFileSizeMB?: number;
};

type SelectedFile = {
  id: string;
  file: File;
  previewUrl?: string;
};

const DEFAULT_MAX_FILES = 5;
const DEFAULT_MAX_FILE_SIZE_MB = 10;

/* =========================================================
   SUPPORTED FILE TYPES
========================================================= */

const ACCEPTED_FILE_TYPES = new Set([
  // Images
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",

  // PDF
  "application/pdf",

  // Word
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",

  // Text
  "text/plain",
  "text/csv",

  // Excel
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
]);

const ACCEPTED_EXTENSIONS = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".gif",
  ".svg",
  ".pdf",
  ".doc",
  ".docx",
  ".txt",
  ".csv",
  ".xls",
  ".xlsx",
]);

/* =========================================================
   HELPERS
========================================================= */

function createFileId(
  file: File,
): string {
  return [
    file.name,
    file.size,
    file.lastModified,
    Math.random()
      .toString(36)
      .slice(2),
  ].join("-");
}

function formatFileSize(
  bytes: number,
): string {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  if (bytes < 1024 * 1024) {
    return `${(
      bytes / 1024
    ).toFixed(1)} KB`;
  }

  return `${(
    bytes /
    (1024 * 1024)
  ).toFixed(1)} MB`;
}

function getFileExtension(
  fileName: string,
): string {
  const lastDot =
    fileName.lastIndexOf(".");

  if (lastDot === -1) {
    return "";
  }

  return fileName
    .slice(lastDot)
    .toLowerCase();
}

function isImageFile(
  file: File,
): boolean {
  if (
    file.type.startsWith(
      "image/",
    )
  ) {
    return true;
  }

  const extension =
    getFileExtension(
      file.name,
    );

  return [
    ".jpg",
    ".jpeg",
    ".png",
    ".webp",
    ".gif",
    ".svg",
  ].includes(extension);
}

function isAcceptedFile(
  file: File,
): boolean {
  const mimeType =
    file.type.toLowerCase();

  const extension =
    getFileExtension(
      file.name,
    );

  return (
    ACCEPTED_FILE_TYPES.has(
      mimeType,
    ) ||
    ACCEPTED_EXTENSIONS.has(
      extension,
    )
  );
}

function isDuplicateFile(
  file: File,
  currentFiles: SelectedFile[],
): boolean {
  return currentFiles.some(
    (item) =>
      item.file.name ===
        file.name &&
      item.file.size ===
        file.size &&
      item.file.lastModified ===
        file.lastModified,
  );
}

function getFileTypeLabel(
  file: File,
): string {
  const extension =
    getFileExtension(
      file.name,
    );

  switch (extension) {
    case ".pdf":
      return "PDF";

    case ".doc":
    case ".docx":
      return "DOC";

    case ".xls":
    case ".xlsx":
      return "XLS";

    case ".csv":
      return "CSV";

    case ".txt":
      return "TXT";

    case ".jpg":
    case ".jpeg":
    case ".png":
    case ".webp":
    case ".gif":
    case ".svg":
      return "IMG";

    default:
      return "FILE";
  }
}

/* =========================================================
   COMPONENT
========================================================= */

export default function ChatComposer({
  disabled = false,
  onSendMessage,
  onFilesSelected,
  maxFiles = DEFAULT_MAX_FILES,
  maxFileSizeMB =
    DEFAULT_MAX_FILE_SIZE_MB,
}: ChatComposerProps) {
  const [value, setValue] =
    useState("");

  const [
    selectedFiles,
    setSelectedFiles,
  ] = useState<
    SelectedFile[]
  >([]);

  const [error, setError] =
    useState("");

  const inputRef =
    useRef<HTMLInputElement>(
      null,
    );

  const textareaRef =
    useRef<HTMLTextAreaElement>(
      null,
    );

  const maxFileSize =
    maxFileSizeMB * 1024 * 1024;

  /* =======================================================
     NOTIFY PARENT OF FILE CHANGES
  ======================================================= */

  useEffect(() => {
    onFilesSelected?.(
      selectedFiles.map(
        (item) => item.file,
      ),
    );
  }, [
    selectedFiles,
    onFilesSelected,
  ]);

  /* =======================================================
     AUTO RESIZE TEXTAREA
  ======================================================= */

  useEffect(() => {
    const textarea =
      textareaRef.current;

    if (!textarea) {
      return;
    }

    textarea.style.height =
      "auto";

    const maxHeight =
      window.innerWidth <= 640
        ? 96
        : 140;

    const nextHeight =
      Math.min(
        textarea.scrollHeight,
        maxHeight,
      );

    textarea.style.height = `${
      Math.max(
        24,
        nextHeight,
      )
    }px`;
  }, [value]);

  /* =======================================================
     CLEANUP PREVIEW URL
  ======================================================= */

  useEffect(() => {
    return () => {
      selectedFiles.forEach(
        (item) => {
          if (
            item.previewUrl
          ) {
            URL.revokeObjectURL(
              item.previewUrl,
            );
          }
        },
      );
    };
  }, []);

  /* =======================================================
     OPEN FILE PICKER
  ======================================================= */

  const openFilePicker =
    () => {
      if (disabled) {
        return;
      }

      inputRef.current?.click();
    };

  /* =======================================================
     HANDLE FILE SELECTION
  ======================================================= */

  const handleFileChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const incomingFiles =
      Array.from(
        event.target.files ??
          [],
      );

    /**
     * Reset native input so the
     * same file can be selected again.
     */
    event.target.value = "";

    if (
      !incomingFiles.length ||
      disabled
    ) {
      return;
    }

    setError("");

    setSelectedFiles(
      (currentFiles) => {
        const remainingSlots =
          Math.max(
            0,
            maxFiles -
              currentFiles.length,
          );

        if (
          remainingSlots === 0
        ) {
          setError(
            `You can attach up to ${maxFiles} files.`,
          );

          return currentFiles;
        }

        const filesToProcess =
          incomingFiles.slice(
            0,
            remainingSlots,
          );

        const nextFiles: SelectedFile[] =
          [];

        let hasValidationError =
          false;

        for (const file of filesToProcess) {
          /* ---------------------------------------------
             FILE TYPE
          --------------------------------------------- */

          if (
            !isAcceptedFile(
              file,
            )
          ) {
            setError(
              `"${file.name}" is not a supported file type.`,
            );

            hasValidationError =
              true;

            continue;
          }

          /* ---------------------------------------------
             FILE SIZE
          --------------------------------------------- */

          if (
            file.size >
            maxFileSize
          ) {
            setError(
              `"${file.name}" is larger than ${maxFileSizeMB} MB.`,
            );

            hasValidationError =
              true;

            continue;
          }

          /* ---------------------------------------------
             DUPLICATE
          --------------------------------------------- */

          if (
            isDuplicateFile(
              file,
              [
                ...currentFiles,
                ...nextFiles,
              ],
            )
          ) {
            continue;
          }

          /* ---------------------------------------------
             IMAGE PREVIEW
          --------------------------------------------- */

          let previewUrl:
            | string
            | undefined;

          if (
            isImageFile(file)
          ) {
            try {
              previewUrl =
                URL.createObjectURL(
                  file,
                );
            } catch {
              previewUrl =
                undefined;
            }
          }

          nextFiles.push({
            id: createFileId(
              file,
            ),
            file,
            previewUrl,
          });
        }

        /* ---------------------------------------------
           MAX FILE WARNING
        --------------------------------------------- */

        if (
          incomingFiles.length >
          remainingSlots
        ) {
          setError(
            `You can attach up to ${maxFiles} files.`,
          );
        } else if (
          hasValidationError &&
          !nextFiles.length
        ) {
          /**
           * Keep validation error.
           */
        }

        return [
          ...currentFiles,
          ...nextFiles,
        ];
      },
    );
  };

  /* =======================================================
     REMOVE FILE
  ======================================================= */

  const removeFile = (
    id: string,
  ) => {
    setSelectedFiles(
      (currentFiles) => {
        const fileToRemove =
          currentFiles.find(
            (item) =>
              item.id === id,
          );

        if (
          fileToRemove?.previewUrl
        ) {
          URL.revokeObjectURL(
            fileToRemove.previewUrl,
          );
        }

        return currentFiles.filter(
          (item) =>
            item.id !== id,
        );
      },
    );

    setError("");
  };

  /* =======================================================
     SUBMIT
  ======================================================= */

  const submit = async () => {
    if (disabled) {
      return;
    }

    const message =
      value.trim();

    const hasMessage =
      message.length > 0;

    const hasFiles =
      selectedFiles.length > 0;

    if (
      !hasMessage &&
      !hasFiles
    ) {
      return;
    }

    /**
     * IMPORTANT FOR PDF GENERATION
     * ---------------------------------
     *
     * We pass BOTH:
     *
     * 1. message
     * 2. files
     *
     * to AIChat.tsx.
     *
     * AIChat.tsx then sends them to:
     *
     * POST /api/ai/chat
     *
     * The backend decides whether the
     * message requires PDF generation.
     *
     * Therefore ChatComposer does NOT
     * generate the PDF itself.
     */

    const files =
      selectedFiles.map(
        (item) => item.file,
      );

    try {
      await onSendMessage(
        message,
        files,
      );
    } catch (error) {
      console.error(
        "Failed to send chat message:",
        error,
      );

      /**
       * Don't clear the composer
       * if the parent request fails.
       *
       * This lets the user retry.
       */
      setError(
        "Unable to send your message. Please try again.",
      );

      return;
    }

    /* =====================================================
       CLEANUP AFTER SUCCESSFUL SEND
    ===================================================== */

    selectedFiles.forEach(
      (item) => {
        if (
          item.previewUrl
        ) {
          URL.revokeObjectURL(
            item.previewUrl,
          );
        }
      },
    );

    setValue("");
    setSelectedFiles([]);
    setError("");

    if (
      textareaRef.current
    ) {
      textareaRef.current.style.height =
        "24px";
    }
  };

  /* =======================================================
     KEYBOARD
  ======================================================= */

  const handleKeyDown = (
    event: KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    if (
      event.key ===
        "Enter" &&
      !event.shiftKey &&
      !event.nativeEvent
        .isComposing
    ) {
      event.preventDefault();

      void submit();
    }
  };

  /* =======================================================
     SUBMIT STATE
  ======================================================= */

  const canSubmit =
    useMemo(
      () =>
        !disabled &&
        (value.trim()
          .length > 0 ||
          selectedFiles.length >
            0),
      [
        disabled,
        value,
        selectedFiles.length,
      ],
    );

  const hasAttachments =
    selectedFiles.length > 0;

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <div
      className="
        ai-composer-wrapper
        fixed
        inset-x-0
        bottom-0
        z-40
        pointer-events-none
        px-4
        pb-[calc(16px+env(safe-area-inset-bottom))]
        sm:px-6
        sm:pb-6
      "
    >
      <div
        className="
          mx-auto
          w-full
          max-w-[920px]
          pointer-events-auto
        "
      >
        {/* =================================================
            ATTACHMENT / ERROR AREA
        ================================================== */}

        {(hasAttachments ||
          error) && (
          <div
            className="
              mb-2
              overflow-hidden
              rounded-[20px]
              border
              border-border-light
              bg-white/95
              shadow-card
              backdrop-blur-xl
            "
          >
            {/* ---------------------------------------------
                ATTACHMENTS
            ---------------------------------------------- */}

            {hasAttachments && (
              <div
                className="
                  flex
                  max-h-[150px]
                  flex-wrap
                  gap-2
                  overflow-y-auto
                  p-3
                  sm:max-h-[170px]
                "
                aria-label="Selected files"
              >
                {selectedFiles.map(
                  ({
                    id,
                    file,
                    previewUrl,
                  }) => (
                    <div
                      key={id}
                      className="
                        group
                        flex
                        min-w-0
                        max-w-full
                        items-center
                        gap-2
                        rounded-[14px]
                        border
                        border-border-light
                        bg-surface-light
                        px-2.5
                        py-2
                        transition-[border-color,box-shadow]
                        duration-200
                        hover:border-accent/40
                      "
                    >
                      {/* FILE PREVIEW */}

                      <div
                        className="
                          relative
                          flex
                          h-9
                          w-9
                          shrink-0
                          items-center
                          justify-center
                          overflow-hidden
                          rounded-[10px]
                          bg-white
                          text-text-muted
                        "
                      >
                        {previewUrl ? (
                          <img
                            src={
                              previewUrl
                            }
                            alt=""
                            className="
                              h-full
                              w-full
                              object-cover
                            "
                          />
                        ) : (
                          <div
                            className="
                              flex
                              flex-col
                              items-center
                              justify-center
                              gap-0.5
                            "
                          >
                            <FileText
                              size={
                                17
                              }
                              strokeWidth={
                                1.6
                              }
                            />

                            <span
                              className="
                                text-[7px]
                                font-medium
                                uppercase
                                tracking-[0.04em]
                              "
                            >
                              {getFileTypeLabel(
                                file,
                              )}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* FILE INFORMATION */}

                      <div
                        className="
                          min-w-0
                          max-w-[180px]
                          sm:max-w-[240px]
                        "
                      >
                        <p
                          className="
                            truncate
                            text-[13px]
                            font-medium
                            leading-5
                            text-secondary
                          "
                          title={
                            file.name
                          }
                        >
                          {
                            file.name
                          }
                        </p>

                        <p
                          className="
                            text-[11px]
                            leading-4
                            text-text-muted
                          "
                        >
                          {formatFileSize(
                            file.size,
                          )}
                        </p>
                      </div>

                      {/* REMOVE */}

                      <button
                        type="button"
                        className="
                          ml-auto
                          flex
                          h-7
                          w-7
                          shrink-0
                          items-center
                          justify-center
                          rounded-full
                          text-text-muted
                          transition-colors
                          duration-150
                          hover:bg-black/5
                          hover:text-secondary
                          focus-visible:outline-none
                          focus-visible:ring-2
                          focus-visible:ring-accent/50
                          disabled:pointer-events-none
                          disabled:opacity-40
                        "
                        onClick={() =>
                          removeFile(
                            id,
                          )
                        }
                        disabled={
                          disabled
                        }
                        aria-label={`Remove ${file.name}`}
                      >
                        <X
                          size={
                            14
                          }
                          strokeWidth={
                            1.8
                          }
                        />
                      </button>
                    </div>
                  ),
                )}
              </div>
            )}

            {/* ---------------------------------------------
                ERROR
            ---------------------------------------------- */}

            {error && (
              <div
                className="
                  border-t
                  border-border-light
                  px-4
                  py-2.5
                  text-[12px]
                  leading-5
                  text-text-muted
                "
                role="alert"
              >
                {error}
              </div>
            )}
          </div>
        )}

        {/* =================================================
            MAIN COMPOSER
        ================================================== */}

        <div
          className={`
            ai-composer
            flex
            w-full
            items-end
            gap-2
            rounded-[38px]
            border
            border-border-light
            bg-white
            px-3
            py-2
            shadow-[0_4px_22px_rgba(65,90,30,0.12)]
            backdrop-blur-xl
            transition-[border-color,box-shadow]
            duration-200
            sm:min-h-[76px]
            sm:gap-3
            sm:px-4
            sm:py-3
            ${
              disabled
                ? "opacity-60"
                : "focus-within:border-accent/30 focus-within:shadow-[0_5px_25px_rgba(65,90,30,0.15)]"
            }
          `}
        >
          {/* =================================================
              HIDDEN FILE INPUT
          ================================================== */}

          <input
            ref={inputRef}
            type="file"
            className="hidden"
            accept={[
              "image/*",
              ".pdf",
              ".doc",
              ".docx",
              ".txt",
              ".csv",
              ".xls",
              ".xlsx",
            ].join(",")}
            multiple
            onChange={
              handleFileChange
            }
            disabled={
              disabled
            }
            aria-label="Upload files"
          />

          {/* =================================================
              PLUS BUTTON
          ================================================== */}

          <button
            type="button"
            className="
              mb-0.5
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-full
              text-secondary
              transition-all
              duration-150
              hover:bg-black/[0.04]
              active:scale-95
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-accent/50
              disabled:pointer-events-none
              disabled:opacity-40
              sm:h-11
              sm:w-11
            "
            onClick={
              openFilePicker
            }
            disabled={
              disabled
            }
            aria-label="Add files"
            title="Add images or documents"
          >
            <Plus
              size={25}
              strokeWidth={
                1.55
              }
            />
          </button>

          {/* =================================================
              TEXT INPUT
          ================================================== */}

          <textarea
            ref={
              textareaRef
            }
            value={value}
            onChange={(
              event,
            ) => {
              setValue(
                event.target
                  .value,
              );

              if (error) {
                setError("");
              }
            }}
            onKeyDown={
              handleKeyDown
            }
            placeholder="Ask anything"
            disabled={
              disabled
            }
            rows={1}
            maxLength={4000}
            className="
              ai-composer-input
              min-h-[24px]
              max-h-[140px]
              flex-1
              resize-none
              overflow-y-auto
              self-center
              border-0
              bg-transparent
              px-1
              py-1.5
              text-[16px]
              leading-6
              text-secondary
              outline-none
              placeholder:text-text-muted
              focus:outline-none
              disabled:cursor-not-allowed
              sm:max-h-[140px]
            "
            aria-label="Ask anything"
          />

          {/* =================================================
              SEND BUTTON
          ================================================== */}

          <button
            type="button"
            className="
              mb-0.5
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-secondary
              text-white
              shadow-sm
              transition-all
              duration-150
              hover:scale-[1.03]
              hover:bg-black
              active:scale-95
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-accent/60
              focus-visible:ring-offset-2
              focus-visible:ring-offset-white
              disabled:pointer-events-none
              disabled:cursor-not-allowed
              disabled:opacity-30
              sm:h-11
              sm:w-11
            "
            onClick={() => {
              void submit();
            }}
            disabled={
              !canSubmit
            }
            aria-label="Send message"
            title={
              hasAttachments
                ? "Send message with attachments"
                : "Send message"
            }
          >
            <ArrowUp
              size={23}
              strokeWidth={
                1.7
              }
            />
          </button>
        </div>
      </div>
    </div>
  );
}