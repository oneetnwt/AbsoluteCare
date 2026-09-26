import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";

export const protectRoute = async (req, res, next) => {
  try {
    const session = req.cookies.session;

    if (!session) {
      return res.status(401).json({
        message: "Unauthorized: No token found",
      });
    }

    const decoded = jwt.verify(session, JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized: Invalid or expired token",
    });
  }
};
