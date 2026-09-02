export function logoutAuthSession() {
  if (typeof window === "undefined") return;

  /*
   =========================================================
   ADMIN AUTHENTICATION
   =========================================================
  */

  localStorage.removeItem("admin_token");
  localStorage.removeItem("admin_user");

  /*
   =========================================================
   EXISTING ERP AUTHENTICATION
   Keep these if your ERP uses these storage keys.
   =========================================================
  */

  localStorage.removeItem("auth_token");
  localStorage.removeItem("user");
  localStorage.removeItem("user_data");
}