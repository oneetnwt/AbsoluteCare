import User from "../models/userModel.js";
import { signupSchema } from "../schema/authSchema.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  const body = signupSchema.parse(req.body);

  const user = await User.findOne({ email: body.email });

  if (user) {
    return res.status(409).json({
      message: "User already exists",
    });
  }

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(body.password, salt);

  const newUser = new User({
    ...body,
    password: hashPassword,
  });

  await newUser.save();

  return res.status(201).json({
    message: "User created successfully",
    user: newUser.omitPassword(),
  });
};
