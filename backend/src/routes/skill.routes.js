
import express from "express";

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
router.post("/", createSkillCategory);

// Update category details
router.patch("/:id", updateSkillCategory);

// Add a skill to an existing category
router.post("/:id/items", addSkillItem);

// Update a skill within a category
router.patch("/:id/items/:skillName", updateSkillItem);

// Remove a skill from a category
router.delete("/:id/items/:skillName", deleteSkillItem);

// Delete an entire category
router.delete("/:id", deleteSkillCategory);

export default router;
