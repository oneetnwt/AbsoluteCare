import Notification from "../models/notificationModel.js";

export async function createPatientNotification({
  user,
  type,
  title,
  message,
  appointment = null,
}) {
  return Notification.create({ user, type, title, message, appointment });
}

export async function notifyAppointmentConfirmed(appointment) {
  return createPatientNotification({
    user: appointment.patient,
    type: "appointment_confirmed",
    title: "Appointment confirmed",
    message:
      "Your appointment has been confirmed and a therapist has been assigned.",
    appointment: appointment._id,
  });
}

export async function notifyAppointmentRescheduled(
  appointment,
  oldSchedule = "",
) {
  return createPatientNotification({
    user: appointment.patient,
    type: "appointment_rescheduled",
    title: "Appointment rescheduled",
    message: oldSchedule
      ? `Your appointment moved from ${oldSchedule}. Check the new schedule for details.`
      : "Your appointment schedule has changed. Check the new details.",
    appointment: appointment._id,
  });
}

export async function notifyAppointmentCancelled(appointment, reason = "") {
  return createPatientNotification({
    user: appointment.patient,
    type: "appointment_cancelled",
    title: "Appointment cancelled",
    message:
      reason ||
      "Your appointment was cancelled. Please book another visit when ready.",
    appointment: appointment._id,
  });
}

export async function notifyAppointmentCompleted(appointment) {
  return createPatientNotification({
    user: appointment.patient,
    type: "appointment_completed",
    title: "Appointment completed",
    message: "Your appointment was marked as completed.",
    appointment: appointment._id,
  });
}

export async function notifyAppointmentNoShow(appointment) {
  return createPatientNotification({
    user: appointment.patient,
    type: "appointment_no_show",
    title: "Appointment marked no-show",
    message:
      "Your appointment was marked as a no-show. Contact the clinic if this is incorrect.",
    appointment: appointment._id,
  });
}
