import bcrypt from "bcryptjs";
import Admin from "../models/Admin.js";
import asyncHandler from "../utils/asyncHandler.js";

// POST /api/auth/login
export const login = asyncHandler(async (req, res, next) => {
  const { password } = req.body ?? {};

  if (
    typeof password !== "string" ||
    password.length === 0 ||
    password.length > 1024
  ) {
    return res.status(400).json({
      message: "A valid password is required.",
    });
  }

  const admin = await Admin.findOne().select("+passwordHash");

  if (!admin || !(await bcrypt.compare(password, admin.passwordHash))) {
    return res.status(401).json({
      message: "Invalid password.",
    });
  }

  // Prevent session fixation after successful authentication.
  req.session.regenerate((error) => {
    if (error) return next(error);

    req.session.adminId = admin._id.toString();

    req.session.save((saveError) => {
      if (saveError) return next(saveError);

      return res.status(200).json({
        message: "Login successful.",
      });
    });
  });
});

// GET /api/auth/me
export const getCurrentAdmin = asyncHandler(async (req, res) => {
  // requireAdmin middleware verifies the session and admin.
  res.status(200).json({
    authenticated: true,
  });
});

// POST /api/auth/logout
export const logout = (req, res, next) => {
  if (!req.session) {
    return res.status(200).json({
      message: "Logged out successfully.",
    });
  }

  req.session.destroy((error) => {
    if (error) return next(error);

    res.clearCookie("portfolio.sid", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    return res.status(200).json({
      message: "Logged out successfully.",
    });
  });
};
