import "dotenv/config";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Admin from "../models/Admin.js";

const createAdmin = async () => {
  try {
    const { MONGODB_URI, ADMIN_PASSWORD } = process.env;

    if (!MONGODB_URI || !ADMIN_PASSWORD) {
      throw new Error("MONGODB_URI and ADMIN_PASSWORD are required.");
    }

    if (ADMIN_PASSWORD.length < 12) {
      throw new Error("Password must be at least 12 characters.");
    }

    await mongoose.connect(MONGODB_URI);

    const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 12);

    const existingAdmin = await Admin.findOne().select("+passwordHash");

    if (existingAdmin) {
      existingAdmin.passwordHash = passwordHash;
      await existingAdmin.save();
    } else {
      await Admin.create({ passwordHash });
    }

    console.log("Admin password configured successfully.");
  } catch (error) {
    console.error("Admin setup failed:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
};

createAdmin();