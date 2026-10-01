import { config } from "dotenv";

config();

const getEnv = (key, defaultValue = null) => {
  const value = process.env[key] || defaultValue;

  if (value === undefined) {
    throw new Error(`No value found: ${key}`);
  }

  return value;
};

export const PORT = getEnv("PORT", 8080);
export const MONGO_URI = getEnv(
  "MONGO_URI",
  "mongodb://localhost:27017/absolutecare",
);
export const RECAPTCHA_SECRET_KEY = getEnv("RECAPTCHA_SECRET_KEY", "");
export const GOOGLE_CLIENT_ID = getEnv("GOOGLE_CLIENT_ID", "");
export const GOOGLE_SECRET_KEY = getEnv("GOOGLE_SECRET_KEY", "");
export const GOOGLE_REDIRECT_URI = getEnv(
  "GOOGLE_REDIRECT_URI",
  "http://localhost:5000/auth/google/callback",
);
export const GOOGLE_CALENDAR_REDIRECT_URI = getEnv(
  "GOOGLE_CALENDAR_REDIRECT_URI",
  "http://localhost:5000/integrations/google-calendar/callback",
);
export const GOOGLE_CALENDAR_ENCRYPTION_KEY = getEnv(
  "GOOGLE_CALENDAR_ENCRYPTION_KEY",
  "absolutecare-calendar-development-key",
);
export const CLINIC_ADDRESS = getEnv(
  "CLINIC_ADDRESS",
  "AbsoluteCare Physical Therapy",
);
export const FRONTEND_URL = getEnv("FRONTEND_URL", "http://localhost:5173");
export const JWT_SECRET = getEnv("JWT_SECRET", "absolutecare-secret-key");
