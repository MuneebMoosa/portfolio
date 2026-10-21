import express from "express";
import { requireAdmin } from "../middlewares/requireAdmin.js";
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

router.post("/",  requireAdmin, createProject);
router.patch("/:id",  requireAdmin, updateProject);
router.delete("/:id",  requireAdmin, deleteProject);

export default router;
