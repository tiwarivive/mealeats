import {
  apiClient,
  removeAuthToken,
  setAuthToken,
} from "@/app/api/client";

export type LoginPayload = {
  email: string;
  password: string;
};

export type AdminUser = {
  id: string;
  name: string;
  email: string;
  role: string;
};

type LoginResponse = {
  success: boolean;
  message: string;

  data: {
    token: string;
    admin: AdminUser;
  };
};

export async function loginUser(
  payload: LoginPayload
): Promise<LoginResponse> {
  const response = await apiClient<LoginResponse>(
    "/auth/admin/login",
    {
      method: "POST",
      body: JSON.stringify({
        email: payload.email.trim().toLowerCase(),
        password: payload.password,
      }),
    }
  );

  if (!response.success || !response.data?.token) {
    throw new Error(response.message || "Login failed");
  }

  setAuthToken(response.data.token);

  if (typeof window !== "undefined") {
    localStorage.setItem(
      "admin_user",
      JSON.stringify(response.data.admin)
    );
  }

  return response;
}

export function logoutUser() {
  removeAuthToken();

  if (typeof window !== "undefined") {
    localStorage.removeItem("admin_user");
  }
}

export function getCurrentAdmin(): AdminUser | null {
  if (typeof window === "undefined") return null;

  const admin = localStorage.getItem("admin_user");

  if (!admin) return null;

  try {
    return JSON.parse(admin);
  } catch {
    return null;
  }
}