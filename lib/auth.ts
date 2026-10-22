export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
}

export const DEMO_USER: AuthUser = {
  id: "usr-admin-01",
  name: "Alex Vance",
  email: "admin@pixel.dev",
  role: "Super Admin",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200",
};

export const AUTH_COOKIE_NAME = "pixel_auth_session";
export const AUTH_STORAGE_KEY = "pixel_auth_user";

export function loginUser(email: string, password?: string): AuthUser {
  const user: AuthUser = {
    ...DEMO_USER,
    email: email || DEMO_USER.email,
  };

  if (typeof window !== "undefined") {
    // Set 7-day cookie
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    document.cookie = `${AUTH_COOKIE_NAME}=authenticated; path=/; expires=${expires.toUTCString()}; SameSite=Lax`;
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
  }

  return user;
}

export function logoutUser(): void {
  if (typeof window !== "undefined") {
    document.cookie = `${AUTH_COOKIE_NAME}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    localStorage.removeItem(AUTH_STORAGE_KEY);
  }
}

export function getSessionUser(): AuthUser | null {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem(AUTH_STORAGE_KEY);
  if (!stored) return null;
  try {
    return JSON.parse(stored) as AuthUser;
  } catch {
    return null;
  }
}

export function isUserLoggedIn(): boolean {
  if (typeof window === "undefined") return false;
  return document.cookie.includes(`${AUTH_COOKIE_NAME}=authenticated`);
}
