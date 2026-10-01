import { Router } from "express";
import {
  cancelAppointment,
  getAppointment,
  getSession,
  listAppointments,
  listDependents,
  listNotifications,
  listServices,
  listSessions,
  markAllNotificationsRead,
  markNotificationRead,
  requestAppointment,
  requestReschedule,
  syncAppointmentCalendar,
  unreadNotificationCount,
} from "../controller/patientController.js";
import { protectRoute } from "../middleware/authMiddleware.js";
import { requirePatient } from "../middleware/patientMiddleware.js";

const router = Router();
const patientOnly = [protectRoute, requirePatient];

router.get("/services", patientOnly, listServices);
router.get("/dependents", patientOnly, listDependents);
router.post("/appointments", patientOnly, requestAppointment);
router.get("/appointments", patientOnly, listAppointments);
router.get("/appointments/:id", patientOnly, getAppointment);
router.post(
  "/appointments/:id/reschedule-request",
  patientOnly,
  requestReschedule,
);
router.post("/appointments/:id/cancel", patientOnly, cancelAppointment);
router.post(
  "/appointments/:id/calendar-sync",
  patientOnly,
  syncAppointmentCalendar,
);
router.get("/sessions", patientOnly, listSessions);
router.get("/sessions/:id", patientOnly, getSession);
router.get("/notifications", patientOnly, listNotifications);
router.patch("/notifications/:id/read", patientOnly, markNotificationRead);
router.patch("/notifications/read-all", patientOnly, markAllNotificationsRead);
router.get("/notifications/unread-count", patientOnly, unreadNotificationCount);

export default router;
