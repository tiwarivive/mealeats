const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://mealeats-ai.onrender.com/api";

export function getAuthToken() {
  if (typeof window === "undefined") return null;

  return localStorage.getItem("admin_token");
}

export function setAuthToken(token: string) {
  if (typeof window === "undefined") return;

  localStorage.setItem("admin_token", token);
}

export function removeAuthToken() {
  if (typeof window === "undefined") return;

  localStorage.removeItem("admin_token");
}

type ApiOptions = RequestInit & {
  requireAuth?: boolean;
};

export async function apiClient<T>(
  endpoint: string,
  options: ApiOptions = {}
): Promise<T> {
  const {
    requireAuth = false,
    headers,
    ...fetchOptions
  } = options;

  const token = requireAuth ? getAuthToken() : null;

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...fetchOptions,

    headers: {
      "Content-Type": "application/json",
      ...(token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : {}),
      ...headers,
    },
  });

  let data: any = null;

  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    const message =
      data?.message ||
      data?.error ||
      "Something went wrong. Please try again.";

    if (response.status === 401) {
      removeAuthToken();
    }

    throw new Error(message);
  }

  return data as T;
}