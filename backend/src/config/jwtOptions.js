export const cookieOptions = {
  maxAge: 24 * 60 * 60 * 1000,
  httpOnly: true,
  sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",
  secure: process.env.NODE_ENV !== "development",
};

export const jwtOptions = {
  expiresIn: "1d",
};
