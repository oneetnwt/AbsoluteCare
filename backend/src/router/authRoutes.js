import { Router } from "express";
import {
  completeGoogleSignup,
  googleCallback,
  googleSession,
  googleStart,
  signup,
  login,
  checkAuth,
} from "../controller/authController.js";
import { protectRoute } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/google", googleStart);
router.get("/google/callback", googleCallback);
router.get("/google/session", googleSession);
router.post("/google/complete", completeGoogleSignup);

router.get("/me", protectRoute, checkAuth);

export default router;
