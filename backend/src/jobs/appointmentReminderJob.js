import Appointment from "../models/appointmentModel.js";
import { createPatientNotification } from "../services/notificationService.js";

export async function runAppointmentReminderJob() {
  const now = new Date();
  const windowStart = new Date(now.getTime() + 23.5 * 60 * 60 * 1000);
  const windowEnd = new Date(now.getTime() + 24.5 * 60 * 60 * 1000);
  const candidates = await Appointment.find({
    status: "confirmed",
    scheduledStart: { $gte: windowStart, $lt: windowEnd },
    reminderSentAt: null,
  }).select("_id patient");

  await Promise.all(
    candidates.map(async (candidate) => {
      const claimed = await Appointment.findOneAndUpdate(
        { _id: candidate._id, reminderSentAt: null },
        { reminderSentAt: new Date() },
        { new: true },
      );
      if (!claimed) return;
      await createPatientNotification({
        user: claimed.patient,
        type: "appointment_reminder",
        title: "Appointment reminder",
        message:
          "You have an appointment scheduled for about 24 hours from now.",
        appointment: claimed._id,
      });
    }),
  );
}
