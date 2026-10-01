import mongoose from "mongoose";

const dependentSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    dateOfBirth: { type: String, default: "" },
    relationship: { type: String, default: "" },
  },
  { timestamps: true },
);

const Dependent = mongoose.model("Dependent", dependentSchema);

export default Dependent;
