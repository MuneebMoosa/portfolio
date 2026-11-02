import express from "express";
import { requireAdmin } from "../middlewares/requireAdmin.js";
import { uploadCvFile } from "../middlewares/upload.js";
import {
  deleteCv,
  downloadCv,
  getCv,
  uploadCv,
} from "../controllers/cv.controller.js";

const router = express.Router();

router.get("/", getCv);
router.get("/download", downloadCv);

router.post(
  "/",
  requireAdmin,
  uploadCvFile.single("cv"),
  uploadCv
);
router.delete("/", requireAdmin, deleteCv);

export default router;
