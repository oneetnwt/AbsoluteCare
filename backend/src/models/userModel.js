import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    password: { type: String, required: true },
    profilePicture: { type: String, default: "" },
    phone: { type: String, default: "" },
    dateOfBirth: { type: String, default: "" },
    address: { type: String, default: "" },
    specialization: { type: mongoose.Schema.Types.Mixed, default: "" },
    workingDays: {
      type: [String],
      default: [],
      enum: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    workingHours: {
      start: { type: String, default: "08:00" },
      end: { type: String, default: "17:00" },
    },
    googleCalendar: {
      connected: { type: Boolean, default: false },
      email: { type: String, default: "" },
      calendarId: { type: String, default: "primary" },
      refreshTokenEncrypted: { type: String, default: "" },
      connectedAt: { type: Date, default: null },
    },
    authProvider: { type: String, enum: ["local", "google"], default: "local" },
    isActive: { type: Boolean, default: true },
    isArchived: { type: Boolean, default: false },
    removedAt: { type: Date, default: null },
    accountAudit: [
      {
        action: { type: String, required: true },
        by: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        at: { type: Date, default: Date.now },
      },
    ],
    role: {
      type: String,
      enum: ["user", "therapist", "admin", "secretary"],
      default: "user",
    },
  },
  { timestamps: true },
);

userSchema.methods.omitPassword = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

userSchema.virtual("fullname").get(function () {
  return `${this.firstname} ${this.lastname}`;
});

const User = mongoose.model("User", userSchema);

export default User;
