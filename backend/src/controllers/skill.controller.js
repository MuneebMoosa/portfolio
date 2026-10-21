import mongoose from "mongoose";
import Skill from "../models/skill.js";
import asyncHandler from "../utils/asyncHandler.js";

// GET /api/skills
// Get all skill categories
export const getSkills = asyncHandler(async (req, res) => {
  const skills = await Skill.find().sort({
    order: 1,
    createdAt: 1,
  });

  return res.status(200).json({
    success: true,
    count: skills.length,
    data: skills,
  });
});

// GET /api/skills/:id
// Get one skill category
export const getSkillById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid category ID",
    });
  }

  const skill = await Skill.findById(id);

  if (!skill) {
    return res.status(404).json({
      success: false,
      message: "Skill category not found",
    });
  }

  return res.status(200).json({
    success: true,
    data: skill,
  });
});

// POST /api/skills
// Create a new category
export const createSkillCategory = asyncHandler(async (req, res) => {
  const { category, icon, skills = [], order = 0 } = req.body;

  if (!category?.trim() || !icon?.trim()) {
    return res.status(400).json({
      success: false,
      message: "Category and icon are required",
    });
  }

  const skill = await Skill.create({
    category: category.trim(),
    icon: icon.trim(),
    skills,
    order,
  });

  return res.status(201).json({
    success: true,
    message: "Skill category created successfully",
    data: skill,
  });
});

// PATCH /api/skills/:id
// Update category details
export const updateSkillCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid category ID",
    });
  }

  const allowedFields = ["category", "icon", "order"];

  const payload = Object.fromEntries(
    Object.entries(req.body || {}).filter(([key]) =>
      allowedFields.includes(key)
    )
  );

  if (Object.keys(payload).length === 0) {
    return res.status(400).json({
      success: false,
      message: "No valid category fields provided",
    });
  }

  const skill = await Skill.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  if (!skill) {
    return res.status(404).json({
      success: false,
      message: "Skill category not found",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Skill category updated successfully",
    data: skill,
  });
});

// POST /api/skills/:id/items
// Add a skill to an existing category
export const addSkillItem = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, percent, icon } = req.body;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid category ID",
    });
  }

  if (!name?.trim() || !icon?.trim() || percent === undefined) {
    return res.status(400).json({
      success: false,
      message: "Name, percent, and icon are required",
    });
  }

  const skill = await Skill.findByIdAndUpdate(
    id,
    {
      $push: {
        skills: {
          name: name.trim(),
          percent,
          icon: icon.trim(),
        },
      },
    },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!skill) {
    return res.status(404).json({
      success: false,
      message: "Skill category not found",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Skill added successfully",
    data: skill,
  });
});

// PATCH /api/skills/:id/items/:skillName
// Update an existing skill item by its name
export const updateSkillItem = asyncHandler(async (req, res) => {
  const { id, skillName } = req.params;
  const { name, percent, icon } = req.body;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid category ID",
    });
  }

  const updates = {};

  if (name !== undefined) updates["skills.$.name"] = name;
  if (percent !== undefined) updates["skills.$.percent"] = percent;
  if (icon !== undefined) updates["skills.$.icon"] = icon;

  if (Object.keys(updates).length === 0) {
    return res.status(400).json({
      success: false,
      message: "Provide at least one skill field to update",
    });
  }

  const skill = await Skill.findOneAndUpdate(
    {
      _id: id,
      "skills.name": skillName,
    },
    { $set: updates },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!skill) {
    return res.status(404).json({
      success: false,
      message: "Category or skill not found",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Skill updated successfully",
    data: skill,
  });
});

// DELETE /api/skills/:id/items/:skillName
// Remove a skill from a category
export const deleteSkillItem = asyncHandler(async (req, res) => {
  const { id, skillName } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid category ID",
    });
  }

  const skill = await Skill.findByIdAndUpdate(
    id,
    {
      $pull: {
        skills: { name: skillName },
      },
    },
    { new: true }
  );

  if (!skill) {
    return res.status(404).json({
      success: false,
      message: "Skill category not found",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Skill removed successfully",
    data: skill,
  });
});

// DELETE /api/skills/:id
// Delete an entire category
export const deleteSkillCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid category ID",
    });
  }

  const skill = await Skill.findByIdAndDelete(id);

  if (!skill) {
    return res.status(404).json({
      success: false,
      message: "Skill category not found",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Skill category deleted successfully",
  });
});
