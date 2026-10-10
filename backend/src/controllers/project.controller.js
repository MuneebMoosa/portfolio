
import mongoose from "mongoose";
import Project from "../models/project.js";
import asyncHandler from "../utils/asyncHandler.js";

const allowedFields = [
  "title",
  "description",
  "type",
  "techStack",
  "image",
  "liveUrl",
  "githubUrl",
  "featured",
  "order",
];

// Only allow fields defined above in create/update requests
const getAllowedFields = (body) => {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return {};
  }

  return Object.fromEntries(
    Object.entries(body).filter(([key]) =>
      allowedFields.includes(key)
    )
  );
};

// GET /api/projects
// Get all projects for the portfolio Home page
export const getProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find().sort({
    order: 1,
    createdAt: -1,
  });

  return res.status(200).json({
    success: true,
    count: projects.length,
    data: projects,
  });
});

// GET /api/projects/:id
// Get a single project by its MongoDB ID
export const getProjectById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid project ID",
    });
  }

  const project = await Project.findById(id);

  if (!project) {
    return res.status(404).json({
      success: false,
      message: "Project not found",
    });
  }

  return res.status(200).json({
    success: true,
    data: project,
  });
});

// POST /api/projects
// Create a new project
export const createProject = asyncHandler(async (req, res) => {
  const payload = getAllowedFields(req.body);

  const project = await Project.create(payload);

  return res.status(201).json({
    success: true,
    message: "Project created successfully",
    data: project,
  });
});

// PATCH /api/projects/:id
// Update selected fields of a project
export const updateProject = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid project ID",
    });
  }

  const payload = getAllowedFields(req.body);

  if (Object.keys(payload).length === 0) {
    return res.status(400).json({
      success: false,
      message: "No valid project fields provided",
    });
  }

  const project = await Project.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  if (!project) {
    return res.status(404).json({
      success: false,
      message: "Project not found",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Project updated successfully",
    data: project,
  });
});

// DELETE /api/projects/:id
// Delete a project
export const deleteProject = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid project ID",
    });
  }

  const project = await Project.findByIdAndDelete(id);

  if (!project) {
    return res.status(404).json({
      success: false,
      message: "Project not found",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Project deleted successfully",
  });
});
