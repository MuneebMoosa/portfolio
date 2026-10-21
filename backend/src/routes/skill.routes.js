import express from "express";
import { requireAdmin } from "../middlewares/requireAdmin.js";
import {
  getSkills,
  getSkillById,
  createSkillCategory,
  updateSkillCategory,
  addSkillItem,
  updateSkillItem,
  deleteSkillItem,
  deleteSkillCategory,
} from "../controllers/skill.controller.js";

const router = express.Router();

// Get all skill categories
router.get("/", getSkills);

// Get one category by ID
router.get("/:id", getSkillById);

// Create a new category
router.post("/",requireAdmin, createSkillCategory);

// Update category details
router.patch("/:id",requireAdmin, updateSkillCategory);

// Add a skill to an existing category
router.post("/:id/items",requireAdmin, addSkillItem);

// Update a skill within a category
router.patch("/:id/items/:skillName",requireAdmin, updateSkillItem);

// Remove a skill from a category
router.delete("/:id/items/:skillName", requireAdmin,deleteSkillItem);

// Delete an entire category
router.delete("/:id",requireAdmin, deleteSkillCategory);

export default router;
