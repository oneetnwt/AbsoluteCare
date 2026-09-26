import axiosInstance from "./axiosInstance";

export const authenticate = (mode, payload) => {
  if (mode !== "login" && mode !== "signup") {
    throw new Error(`Unsupported authentication mode: ${mode}`);
  }

  return axiosInstance.post(`/auth/${mode}`, payload);
};

export const getGoogleAuthUrl = () =>
  `${axiosInstance.defaults.baseURL}/auth/google`;

export const completeGoogleSignup = (payload) =>
  axiosInstance.post("/auth/google/complete", payload);

export const getGoogleSession = (token) =>
  axiosInstance.get("/auth/google/session", {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getApiErrorMessage = (error) =>
  error.response?.data?.message ||
  error.message ||
  "Unable to complete authentication.";
