import axiosInstance from "./axiosInstance";

export const getCurrentPatient = () => axiosInstance.get("/auth/me");
