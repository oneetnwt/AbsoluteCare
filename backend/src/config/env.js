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
