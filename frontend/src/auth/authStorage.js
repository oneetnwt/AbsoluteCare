const AUTH_STORAGE_KEY = "absolutecare_user";
const SUPPORTED_ROLES = new Set([
  "user",
  "patient",
  "therapist",
  "admin",
  "secretary",
]);

export function getStoredUser() {
  const storedUser = localStorage.getItem(AUTH_STORAGE_KEY);
  if (!storedUser) return null;

  try {
    return JSON.parse(storedUser);
  } catch {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    return null;
  }
}

export function setStoredUser(user) {
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
}

export function isAuthenticated() {
  const user = getStoredUser();
  return Boolean(user?.role && SUPPORTED_ROLES.has(user.role));
}

export function clearStoredUser() {
  localStorage.removeItem(AUTH_STORAGE_KEY);
}
