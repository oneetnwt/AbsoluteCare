import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    password: { type: String, required: true },
    profilePicture: { type: String, default: "" },
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
