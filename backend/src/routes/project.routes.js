import express from "express";
import { requireAdmin } from "../middlewares/requireAdmin.js";
import { uploadProjectImage } from "../middlewares/upload.js";
import {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} from "../controllers/project.controller.js";

const router = express.Router();

router.get("/", getProjects);
router.get("/:id", getProjectById);

router.post(
  "/",
  requireAdmin,
  uploadProjectImage.single("image"),
  createProject
);
router.patch(
  "/:id",
  requireAdmin,
  uploadProjectImage.single("image"),
  updateProject
);
router.delete("/:id",  requireAdmin, deleteProject);

export default router;
