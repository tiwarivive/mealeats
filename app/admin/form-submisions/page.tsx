"use client";

import {
  ChevronLeft,
  ChevronRight,
  Filter,
  MessageCircle,
  Search,
  X,
} from "lucide-react";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { apiClient } from "@/app/api/client";

type Contact = {
  _id?: string;
  id?: string;

  fullName?: string;
  email?: string;
  phone?: string;
  goal?: string;

  createdAt?: string;
  updatedAt?: string;

  [key: string]: unknown;
};

type Pagination = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

type ContactsResponse = {
  success: boolean;
  message?: string;
  data?: {
    contacts: Contact[];
    pagination: Pagination;
  };
};

const PAGE_SIZE = 20;

function getInitials(name?: string) {
  if (!name?.trim()) return "?";

  const parts = name.trim().split(/\s+/);

  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }

  return `${parts[0][0]}${
    parts[parts.length - 1][0]
  }`.toUpperCase();
}

function getAvatarColor(name?: string) {
  const colors = [
    "#3FA6A9",
    "#FFAE0B",
    "#2188E8",
    "#1CA9D4",
    "#9EA5BF",
    "#667EEA",
    "#7A9E9F",
  ];

  if (!name) return colors[0];

  let hash = 0;

  for (let i = 0; i < name.length; i++) {
    hash =
      name.charCodeAt(i) +
      ((hash << 5) - hash);
  }

  return colors[Math.abs(hash) % colors.length];
}

function formatDate(value?: string) {
  if (!value) return "—";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).format(date);
}

function truncate(
  value?: string,
  length = 32
) {
  if (!value) return "—";

  if (value.length <= length) {
    return value;
  }

  return `${value.slice(0, length)}…`;
}

function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  return "Unable to load contact submissions.";
}

export default function ContactsPage() {
  const [contacts, setContacts] =
    useState<Contact[]>([]);

  const [pagination, setPagination] =
    useState<Pagination>({
      total: 0,
      page: 1,
      limit: PAGE_SIZE,
      totalPages: 0,
    });

  const [search, setSearch] =
    useState("");

  const [searchInput, setSearchInput] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [showFilters, setShowFilters] =
    useState(false);

  const [goalFilter, setGoalFilter] =
    useState("all");

  /*
   * Selected goal for full-message modal.
   */
  const [selectedGoal, setSelectedGoal] =
    useState<string | null>(null);

  const fetchContacts = useCallback(
    async (
      page = 1,
      searchValue = ""
    ) => {
      try {
        setLoading(true);
        setError("");

        const params =
          new URLSearchParams();

        params.set(
          "page",
          String(page)
        );

        params.set(
          "limit",
          String(PAGE_SIZE)
        );

        if (searchValue.trim()) {
          params.set(
            "search",
            searchValue.trim()
          );
        }

        const result =
          await apiClient<ContactsResponse>(
            `/contact/contacts?${params.toString()}`,
            {
              method: "GET",
              requireAuth: true,
            }
          );

        if (
          !result.success ||
          !result.data
        ) {
          throw new Error(
            result.message ||
              "Failed to fetch contact submissions."
          );
        }

        setContacts(
          Array.isArray(
            result.data.contacts
          )
            ? result.data.contacts
            : []
        );

        setPagination(
          result.data.pagination || {
            total: 0,
            page,
            limit: PAGE_SIZE,
            totalPages: 0,
          }
        );
      } catch (err) {
        console.error(
          "FETCH CONTACTS ERROR:",
          err
        );

        setContacts([]);

        setError(
          getErrorMessage(err)
        );
      } finally {
        setLoading(false);
      }
    },
    []
  );

  /*
   * Initial request.
   */
  useEffect(() => {
    fetchContacts(1, "");
  }, [fetchContacts]);

  /*
   * Debounced search.
   */
  useEffect(() => {
    const timer =
      window.setTimeout(() => {
        const value =
          searchInput.trim();

        setSearch(value);
      }, 400);

    return () =>
      window.clearTimeout(timer);
  }, [searchInput]);

  /*
   * Fetch whenever search changes.
   */
  useEffect(() => {
    fetchContacts(1, search);
  }, [search, fetchContacts]);

  /*
   * Close modal with Escape.
   */
  useEffect(() => {
    if (selectedGoal === null) {
      return;
    }

    function handleKeyDown(
      event: KeyboardEvent
    ) {
      if (event.key === "Escape") {
        setSelectedGoal(null);
      }
    }

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [selectedGoal]);

  /*
   * Prevent background page from
   * scrolling while modal is open.
   */
  useEffect(() => {
    if (selectedGoal === null) {
      return;
    }

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow =
        previousOverflow;
    };
  }, [selectedGoal]);

  /*
   * Get available goals from
   * currently loaded submissions.
   */
  const availableGoals =
    useMemo(() => {
      const goals = contacts
        .map((contact) =>
          typeof contact.goal ===
          "string"
            ? contact.goal.trim()
            : ""
        )
        .filter(Boolean);

      return Array.from(
        new Set(goals)
      );
    }, [contacts]);

  /*
   * Client-side goal filter.
   */
  const filteredContacts =
    useMemo(() => {
      if (goalFilter === "all") {
        return contacts;
      }

      return contacts.filter(
        (contact) =>
          typeof contact.goal ===
            "string" &&
          contact.goal.trim() ===
            goalFilter
      );
    }, [contacts, goalFilter]);

  const firstItem =
    pagination.total === 0
      ? 0
      : (pagination.page - 1) *
          pagination.limit +
        1;

  const lastItem = Math.min(
    pagination.page *
      pagination.limit,
    pagination.total
  );

  function handleSearchSubmit(
    event: React.FormEvent
  ) {
    event.preventDefault();

    setSearch(
      searchInput.trim()
    );
  }

  function clearSearch() {
    setSearchInput("");
    setSearch("");
    setGoalFilter("all");
  }

  function goToPage(page: number) {
    if (
      page < 1 ||
      page > pagination.totalPages ||
      loading ||
      page === pagination.page
    ) {
      return;
    }

    fetchContacts(page, search);
  }

  function getPageNumbers() {
    const totalPages =
      pagination.totalPages;

    const currentPage =
      pagination.page;

    if (totalPages <= 5) {
      return Array.from(
        { length: totalPages },
        (_, index) => index + 1
      );
    }

    if (currentPage <= 3) {
      return [1, 2, 3, 4, 5];
    }

    if (
      currentPage >=
      totalPages - 2
    ) {
      return [
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    return [
      currentPage - 2,
      currentPage - 1,
      currentPage,
      currentPage + 1,
      currentPage + 2,
    ];
  }

  return (
    <>
      <main className="min-h-full bg-[#f1f3f7]">
        <section className="mx-auto w-full max-w-[1500px] overflow-hidden rounded-[14px] border border-white/80 bg-white shadow-[0_2px_12px_rgba(15,23,42,0.04)]">

          {/* =========================================
              TOOLBAR
          ========================================== */}

          <div className="border-b border-[#e5e7eb] px-4 py-4 sm:px-6">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">

              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">

                {/* FILTER */}

                <button
                  type="button"
                  onClick={() =>
                    setShowFilters(
                      (value) => !value
                    )
                  }
                  className={`flex h-[38px] items-center justify-center gap-2 rounded-full border px-4 text-[15px] transition ${
                    showFilters
                      ? "border-[#146cff] bg-[#f4f8ff] text-[#146cff]"
                      : "border-[#d7e3fa] bg-white text-[#146cff] hover:border-[#146cff]"
                  }`}
                >
                  <Filter
                    size={16}
                    strokeWidth={1.7}
                  />

                  Filter
                </button>

                {/* SEARCH */}

                <form
                  onSubmit={
                    handleSearchSubmit
                  }
                  className="relative w-full sm:w-[280px] lg:w-[300px]"
                >
                  <Search
                    size={17}
                    strokeWidth={1.8}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#146cff]"
                  />

                  <input
                    type="search"
                    value={
                      searchInput
                    }
                    onChange={(
                      event
                    ) =>
                      setSearchInput(
                        event.target
                          .value
                      )
                    }
                    placeholder="Search..."
                    autoComplete="off"
                    className="h-[38px] w-full rounded-full border border-[#d7e3fa] bg-white pl-11 pr-10 text-[15px] text-[#172033] outline-none transition placeholder:text-[#8994a8] focus:border-[#146cff] focus:ring-2 focus:ring-[#146cff]/10"
                  />

                  {searchInput && (
                    <button
                      type="button"
                      onClick={
                        clearSearch
                      }
                      aria-label="Clear search"
                      className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center justify-center rounded-full p-1 text-[#8b96a8] hover:bg-[#eef3fa] hover:text-[#172033]"
                    >
                      <X size={15} />
                    </button>
                  )}
                </form>
              </div>
            </div>

            {/* =========================================
                FILTER PANEL
            ========================================== */}

            {showFilters && (
              <div className="mt-4 rounded-xl border border-[#e1e8f3] bg-[#f8fafc] p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end">

                  <div className="w-full sm:max-w-[280px]">
                    <label
                      htmlFor="goal-filter"
                      className="mb-1.5 block text-xs font-medium text-[#5c6678]"
                    >
                      Goal
                    </label>

                    <select
                      id="goal-filter"
                      value={
                        goalFilter
                      }
                      onChange={(
                        event
                      ) =>
                        setGoalFilter(
                          event.target
                            .value
                        )
                      }
                      className="h-[38px] w-full rounded-lg border border-[#d7e3fa] bg-white px-3 text-sm text-[#172033] outline-none focus:border-[#146cff]"
                    >
                      <option value="all">
                        All goals
                      </option>

                      {availableGoals.map(
                        (goal) => (
                          <option
                            key={goal}
                            value={goal}
                          >
                            {truncate(
                              goal,
                              60
                            )}
                          </option>
                        )
                      )}
                    </select>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setGoalFilter(
                        "all"
                      )
                    }
                    className="h-[38px] rounded-lg border border-[#d7e3fa] bg-white px-4 text-sm text-[#146cff] hover:bg-[#f2f7ff]"
                  >
                    Clear filters
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* =========================================
              DESKTOP TABLE
          ========================================== */}

          <div className="hidden w-full overflow-x-auto md:block">
            <table className="w-full min-w-[1050px] border-collapse">
              <thead>
                <tr className="h-[60px] border-b border-[#dfe4eb] bg-[#fbfcfe]">

                  <th className="w-[280px] px-4 text-left text-[16px] font-normal text-[#07152f]">
                    Name
                  </th>

                  <th className="w-[310px] px-4 text-left text-[16px] font-normal text-[#07152f]">
                    Email
                  </th>

                  <th className="w-[250px] px-4 text-left text-[16px] font-normal text-[#07152f]">
                    Phone
                  </th>

                  <th className="w-[300px] px-4 text-left text-[16px] font-normal text-[#07152f]">
                    Goal
                  </th>

                  <th className="w-[180px] px-4 text-left text-[16px] font-normal text-[#07152f]">
                    Created
                  </th>
                </tr>
              </thead>

              <tbody>
                {/* LOADING */}

                {loading &&
                  Array.from({
                    length: 7,
                  }).map(
                    (_, index) => (
                      <tr
                        key={`skeleton-${index}`}
                        className="h-[86px] border-b border-[#e1e5eb]"
                      >
                        <td className="px-4">
                          <div className="flex items-center gap-4">
                            <div className="h-11 w-11 animate-pulse rounded-full bg-[#edf1f6]" />

                            <div className="h-4 w-28 animate-pulse rounded bg-[#edf1f6]" />
                          </div>
                        </td>

                        <td className="px-4">
                          <div className="h-4 w-48 animate-pulse rounded bg-[#edf1f6]" />
                        </td>

                        <td className="px-4">
                          <div className="h-4 w-32 animate-pulse rounded bg-[#edf1f6]" />
                        </td>

                        <td className="px-4">
                          <div className="h-6 w-28 animate-pulse rounded bg-[#edf1f6]" />
                        </td>

                        <td className="px-4">
                          <div className="h-4 w-24 animate-pulse rounded bg-[#edf1f6]" />
                        </td>
                      </tr>
                    )
                  )}

                {/* ERROR */}

                {!loading &&
                  error && (
                    <tr>
                      <td colSpan={5}>
                        <ErrorState
                          error={error}
                          onRetry={() =>
                            fetchContacts(
                              pagination.page,
                              search
                            )
                          }
                        />
                      </td>
                    </tr>
                  )}

                {/* EMPTY */}

                {!loading &&
                  !error &&
                  filteredContacts.length ===
                    0 && (
                    <tr>
                      <td colSpan={5}>
                        <EmptyState />
                      </td>
                    </tr>
                  )}

                {/* DATA */}

                {!loading &&
                  !error &&
                  filteredContacts.map(
                    (
                      contact,
                      index
                    ) => {
                      const name =
                        typeof contact.fullName ===
                        "string"
                          ? contact.fullName
                          : "Unknown";

                      const email =
                        typeof contact.email ===
                        "string"
                          ? contact.email
                          : "—";

                      const phone =
                        typeof contact.phone ===
                        "string"
                          ? contact.phone
                          : "—";

                      const goal =
                        typeof contact.goal ===
                        "string"
                          ? contact.goal
                          : "—";

                      const hasGoal =
                        goal !== "—" &&
                        goal.trim()
                          .length > 0;

                      return (
                        <tr
                          key={
                            contact._id ||
                            contact.id ||
                            `${email}-${index}`
                          }
                          className="group h-[86px] border-b border-[#e1e5eb] transition hover:bg-[#fafcff]"
                        >
                          {/* NAME */}

                          <td className="px-4">
                            <div className="flex min-w-0 items-center gap-4">
                              <Avatar
                                name={name}
                              />

                              <p className="truncate text-[16px] text-[#07152f]">
                                {name}
                              </p>
                            </div>
                          </td>

                          {/* EMAIL */}

                          <td className="px-4">
                            <p
                              title={email}
                              className="max-w-[280px] truncate text-[16px] !text-[#07152f]"
                            >
                              {email !==
                              "—" ? (
                                <a
                                  href={`mailto:${email}`}
                                  className="hover:text-[#146cff] hover:underline"
                                >
                                  {email}
                                </a>
                              ) : (
                                "—"
                              )}
                            </p>
                          </td>

                          {/* PHONE */}

                          <td className="px-4">
                            <p
                              title={phone}
                              className="max-w-[220px] truncate text-[16px] !text-[#07152f]"
                            >
                              {phone !==
                              "—" ? (
                                <a
                                  href={`tel:${phone}`}
                                  className="hover:text-[#146cff] hover:underline"
                                >
                                  {phone}
                                </a>
                              ) : (
                                "—"
                              )}
                            </p>
                          </td>

                          {/* GOAL */}

                          <td className="px-4">
                            {hasGoal ? (
                              <button
                                type="button"
                                onClick={() =>
                                  setSelectedGoal(
                                    goal
                                  )
                                }
                                title="Click to read the complete message"
                                className="group/goal inline-flex max-w-[270px] items-center gap-1.5 rounded-[6px] border border-[#dbe4ef] bg-[#f8fafc] px-2 py-1 text-left text-[13px] text-[#26364f] transition hover:border-[#b8c9e0] hover:bg-[#f1f6fc]"
                              >
                                <span className="min-w-0 truncate">
                                  {truncate(
                                    goal,
                                    36
                                  )}
                                </span>

                                <MessageCircle
                                  size={13}
                                  strokeWidth={1.8}
                                  className="shrink-0 text-[#146cff] opacity-70 transition group-hover/goal:opacity-100"
                                />
                              </button>
                            ) : (
                              <span className="text-sm text-[#9aa3b2]">
                                —
                              </span>
                            )}
                          </td>

                          {/* CREATED */}

                          <td className="px-4">
                            <p className="text-[14px] text-[#39465b]">
                              {formatDate(
                                contact.createdAt
                              )}
                            </p>
                          </td>
                        </tr>
                      );
                    }
                  )}
              </tbody>
            </table>
          </div>

          {/* =========================================
              MOBILE CARDS
          ========================================== */}

          <div className="md:hidden">
            {/* MOBILE LOADING */}

            {loading &&
              Array.from({
                length: 5,
              }).map(
                (_, index) => (
                  <div
                    key={`mobile-skeleton-${index}`}
                    className="border-b border-[#e5e9ef] p-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-11 w-11 animate-pulse rounded-full bg-[#edf1f6]" />

                      <div className="flex-1 space-y-2">
                        <div className="h-4 w-32 animate-pulse rounded bg-[#edf1f6]" />

                        <div className="h-3 w-48 animate-pulse rounded bg-[#edf1f6]" />
                      </div>
                    </div>
                  </div>
                )
              )}

            {/* MOBILE ERROR */}

            {!loading &&
              error && (
                <ErrorState
                  error={error}
                  onRetry={() =>
                    fetchContacts(
                      pagination.page,
                      search
                    )
                  }
                />
              )}

            {/* MOBILE EMPTY */}

            {!loading &&
              !error &&
              filteredContacts.length ===
                0 && <EmptyState />}

            {/* MOBILE DATA */}

            {!loading &&
              !error &&
              filteredContacts.map(
                (
                  contact,
                  index
                ) => {
                  const name =
                    typeof contact.fullName ===
                    "string"
                      ? contact.fullName
                      : "Unknown";

                  const email =
                    typeof contact.email ===
                    "string"
                      ? contact.email
                      : "—";

                  const phone =
                    typeof contact.phone ===
                    "string"
                      ? contact.phone
                      : "—";

                  const goal =
                    typeof contact.goal ===
                    "string"
                      ? contact.goal
                      : "—";

                  const hasGoal =
                    goal !== "—" &&
                    goal.trim()
                      .length > 0;

                  return (
                    <article
                      key={
                        contact._id ||
                        contact.id ||
                        `${email}-${index}`
                      }
                      className="border-b border-[#e5e9ef] p-4 transition hover:bg-[#fafcff]"
                    >
                      <div className="flex items-start gap-3">
                        <Avatar
                          name={name}
                        />

                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <h3 className="truncate text-[16px] font-medium text-[#07152f]">
                                {name}
                              </h3>

                              <p className="mt-1 truncate text-[13px] text-[#687386]">
                                {email}
                              </p>
                            </div>
                          </div>

                          <div className="mt-4 grid grid-cols-1 gap-3 min-[420px]:grid-cols-2">
                            {/* PHONE */}

                            <div className="min-w-0">
                              <p className="text-[11px] font-medium uppercase tracking-wide text-[#8994a8]">
                                Phone
                              </p>

                              <p className="mt-1 break-all text-[14px] text-[#39465b]">
                                {phone !==
                                "—" ? (
                                  <a
                                    href={`tel:${phone}`}
                                    className="hover:text-[#146cff] hover:underline"
                                  >
                                    {phone}
                                  </a>
                                ) : (
                                  "—"
                                )}
                              </p>
                            </div>

                            {/* CREATED */}

                            <div>
                              <p className="text-[11px] font-medium uppercase tracking-wide text-[#8994a8]">
                                Created
                              </p>

                              <p className="mt-1 text-[14px] text-[#39465b]">
                                {formatDate(
                                  contact.createdAt
                                )}
                              </p>
                            </div>
                          </div>

                          {/* GOAL */}

                          <div className="mt-3">
                            <p className="text-[11px] font-medium uppercase tracking-wide text-[#8994a8]">
                              Goal
                            </p>

                            {hasGoal ? (
                              <button
                                type="button"
                                onClick={() =>
                                  setSelectedGoal(
                                    goal
                                  )
                                }
                                title="Click to read the complete message"
                                className="mt-1 flex max-w-full items-center gap-1.5 rounded-[6px] border border-[#dbe4ef] bg-[#f8fafc] px-2 py-1 text-left text-[13px] text-[#26364f] transition hover:border-[#b8c9e0] hover:bg-[#f1f6fc]"
                              >
                                <span className="min-w-0 truncate">
                                  {truncate(
                                    goal,
                                    60
                                  )}
                                </span>

                                <MessageCircle
                                  size={13}
                                  strokeWidth={1.8}
                                  className="shrink-0 text-[#146cff]"
                                />
                              </button>
                            ) : (
                              <p className="mt-1 text-sm text-[#9aa3b2]">
                                —
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                }
              )}
          </div>

          {/* =========================================
              PAGINATION
          ========================================== */}

          {!loading &&
            !error &&
            pagination.total > 0 && (
              <div className="flex flex-col gap-3 border-t border-[#e1e5eb] px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">

                <p className="text-[13px] text-[#687386]">
                  Showing{" "}
                  <span className="font-medium text-[#172033]">
                    {firstItem}
                  </span>{" "}
                  –{" "}
                  <span className="font-medium text-[#172033]">
                    {lastItem}
                  </span>{" "}
                  of{" "}
                  <span className="font-medium text-[#172033]">
                    {pagination.total}
                  </span>
                </p>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    disabled={
                      pagination.page <=
                      1
                    }
                    onClick={() =>
                      goToPage(
                        pagination.page -
                          1
                      )
                    }
                    className="flex h-8 w-8 items-center justify-center rounded-md border border-[#dce3ed] text-[#566174] transition hover:bg-[#f4f7fb] disabled:cursor-not-allowed disabled:opacity-40"
                    aria-label="Previous page"
                  >
                    <ChevronLeft
                      size={16}
                    />
                  </button>

                  {getPageNumbers().map(
                    (page) => (
                      <button
                        key={page}
                        type="button"
                        disabled={loading}
                        onClick={() =>
                          goToPage(page)
                        }
                        className={`flex h-8 min-w-8 items-center justify-center rounded-md px-2 text-[13px] transition ${
                          page ===
                          pagination.page
                            ? "bg-[#146cff] text-white"
                            : "text-[#566174] hover:bg-[#f4f7fb]"
                        }`}
                      >
                        {page}
                      </button>
                    )
                  )}

                  <button
                    type="button"
                    disabled={
                      pagination.page >=
                      pagination.totalPages
                    }
                    onClick={() =>
                      goToPage(
                        pagination.page +
                          1
                      )
                    }
                    className="flex h-8 w-8 items-center justify-center rounded-md border border-[#dce3ed] text-[#566174] transition hover:bg-[#f4f7fb] disabled:cursor-not-allowed disabled:opacity-40"
                    aria-label="Next page"
                  >
                    <ChevronRight
                      size={16}
                    />
                  </button>
                </div>
              </div>
            )}
        </section>
      </main>

      {/* =================================================
          FULL GOAL / MESSAGE MODAL
      ================================================= */}

      {selectedGoal !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#07152f]/45 p-3 backdrop-blur-[3px] sm:p-5"
          role="dialog"
          aria-modal="true"
          aria-labelledby="goal-modal-title"
          onMouseDown={(event) => {
            if (
              event.target ===
              event.currentTarget
            ) {
              setSelectedGoal(null);
            }
          }}
        >
          <div
            className="
              flex
              max-h-[90vh]
              w-full
              max-w-[720px]
              min-w-0
              flex-col
              overflow-hidden
              rounded-[16px]
              border
              border-white/80
              bg-white
              shadow-[0_20px_60px_rgba(15,23,42,0.20)]
              sm:max-h-[85vh]
            "
          >
            {/* MODAL HEADER */}

            <div className="flex shrink-0 items-center justify-between gap-4 border-b border-[#e5e9ef] px-4 py-4 sm:px-5">
              <div className="flex min-w-0 items-center gap-3">
                <div
                  className="
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-[10px]
                    bg-[#edf4ff]
                    text-[#146cff]
                  "
                >
                  <MessageCircle
                    size={18}
                    strokeWidth={1.8}
                  />
                </div>

                <div className="min-w-0">
                  <h2
                    id="goal-modal-title"
                    className="
                      !mb-0
                      truncate
                      !text-[15px]
                      !font-semibold
                      !leading-5
                      !text-[#07152f]
                      sm:!text-[16px]
                    "
                  >
                    Complete message
                  </h2>

                  <p
                    className="
                      !mb-0
                      mt-0.5
                      !text-[11px]
                      !leading-4
                      !text-[#8994a8]
                    "
                  >
                    Full submission message
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  setSelectedGoal(null)
                }
                aria-label="Close message"
                className="
                  flex
                  h-9
                  w-9
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  text-[#718096]
                  transition
                  hover:bg-[#f1f4f8]
                  hover:text-[#172033]
                "
              >
                <X size={18} />
              </button>
            </div>

            {/* MODAL CONTENT */}

            <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4 sm:px-5 sm:py-5">
              <div
                className="
                  min-w-0
                  rounded-xl
                  border
                  border-[#e1e8f3]
                  bg-[#f8fafc]
                  px-4
                  py-4
                  sm:px-5
                  sm:py-5
                "
              >
                <p
                  className="
                    !mb-0
                    max-w-full
                    break-words
                    whitespace-pre-wrap
                    text-[13px]
                    font-normal
                    leading-6
                    text-[#26364f]
                    sm:text-[14px]
                    sm:leading-6
                  "
                >
                  {selectedGoal}
                </p>
              </div>
            </div>

            {/* MODAL FOOTER */}

            <div className="flex shrink-0 justify-end border-t border-[#e5e9ef] px-4 py-3 sm:px-5">
              <button
                type="button"
                onClick={() =>
                  setSelectedGoal(null)
                }
                className="
                  inline-flex
                  h-[38px]
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-[#d7e3fa]
                  bg-white
                  px-5
                  text-[12px]
                  font-medium
                  text-[#146cff]
                  transition
                  hover:bg-[#f4f8ff]
                  sm:text-[13px]
                "
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* =====================================================
   AVATAR
===================================================== */

function Avatar({
  name,
}: {
  name: string;
}) {
  return (
    <div
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-[13px] font-medium text-white"
      style={{
        backgroundColor:
          getAvatarColor(name),
      }}
    >
      {getInitials(name)}
    </div>
  );
}

/* =====================================================
   ERROR STATE
===================================================== */

function ErrorState({
  error,
  onRetry,
}: {
  error: string;
  onRetry: () => void;
}) {
  return (
    <div className="flex min-h-[280px] flex-col items-center justify-center px-6 py-12 text-center">
      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-500">
        !
      </div>

      <p className="text-sm font-medium text-[#172033]">
        Unable to load submissions
      </p>

      <p className="mt-1 max-w-md text-sm text-[#7b8494]">
        {error}
      </p>

      <button
        type="button"
        onClick={onRetry}
        className="mt-4 rounded-full border border-[#d7e3fa] px-4 py-2 text-sm text-[#146cff] transition hover:bg-[#f5f8fd]"
      >
        Try again
      </button>
    </div>
  );
}

/* =====================================================
   EMPTY STATE
===================================================== */

function EmptyState() {
  return (
    <div className="flex min-h-[320px] flex-col items-center justify-center px-6 py-12 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#f1f5fb]">
        <Search
          size={23}
          className="text-[#146cff]"
        />
      </div>

      <p className="text-[16px] font-medium text-[#172033]">
        No submissions found
      </p>

      <p className="mt-1 text-sm text-[#7b8494]">
        Try changing your search or
        filter.
      </p>
    </div>
  );
}