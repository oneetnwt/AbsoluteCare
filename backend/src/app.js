import express from "express";
import { PORT } from "./config/env.js";

import authRoutes from "./router/authRoutes.js";
import connectDB from "./config/db.js";

const app = express();

app.use(express.json());

app.use("/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}`);
  connectDB();
});
