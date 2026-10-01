import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    type: {
      type: String,
      enum: [
        "appointment_confirmed",
        "appointment_rescheduled",
        "appointment_cancelled",
        "appointment_reminder",
        "appointment_request",
        "appointment_completed",
        "appointment_no_show",
        "reschedule_request_update",
      ],
      required: true,
    },
    title: { type: String, required: true },
    message: { type: String, required: true },
    appointment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
      default: null,
    },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true },
);

notificationSchema.index({ user: 1, createdAt: -1 });

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;
