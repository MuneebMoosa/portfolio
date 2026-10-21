import Admin from "../models/Admin.js";

export const requireAdmin = async (req, res, next) => {
  try {
    const adminId = req.session?.adminId;

    if (!adminId) {
      return res.status(401).json({
        message: "Authentication required.",
      });
    }

    const admin = await Admin.findById(adminId);

    if (!admin) {
      return res.status(401).json({
        message: "Invalid admin session.",
      });
    }

    req.admin = admin;
    next();
  } catch (error) {
    next(error);
  }
};
