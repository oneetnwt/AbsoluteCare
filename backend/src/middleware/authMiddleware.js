import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";
import User from "../models/userModel.js";

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
    req.user.userId = decoded.userId || decoded.sub;

    if (!req.user.userId) {
      return res.status(401).json({
        message: "Unauthorized: Invalid session identity",
      });
    }

    const user = await User.findById(req.user.userId).select(
      "isActive isArchived removedAt",
    );
    if (!user || user.removedAt) {
      return res.status(403).json({
        message: "This account no longer exists.",
      });
    }
    if (!user.isActive) {
      return res.status(403).json({
        message:
          "Your account has been deactivated. Contact the clinic administrator.",
      });
    }

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized: Invalid or expired token",
    });
  }
};

export function requireRole(...roles) {
  return async (req, res, next) => {
    const user = await User.findById(req.user.userId).select(
      "role isActive isArchived removedAt",
    );
    if (user?.removedAt) {
      return res.status(403).json({
        message: "This account no longer exists.",
      });
    }
    if (user && !user.isActive) {
      return res.status(403).json({
        message:
          "Your account has been deactivated. Contact the clinic administrator.",
      });
    }
    if (!user || !roles.includes(user.role)) {
      return res
        .status(403)
        .json({ message: "You do not have access to this workspace." });
    }
    req.user.role = user.role;
    next();
  };
}
