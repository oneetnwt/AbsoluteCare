import express from "express";
import { FRONTEND_URL, PORT } from "./config/env.js";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./router/authRoutes.js";
import connectDB from "./config/db.js";

const app = express();

const allowedOrigins = (process.env.CORS_ORIGINS || FRONTEND_URL)
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const corsOptions = {
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error(`CORS origin is not allowed: ${origin}`));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}`);
  connectDB();
});
