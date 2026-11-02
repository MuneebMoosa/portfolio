import mongoose from "mongoose";
import Project from "../models/project.js";
import asyncHandler from "../utils/asyncHandler.js";
import { assertValidProjectImage } from "../utils/fileValidation.js";
import {
  tryDeleteCloudinaryAsset,
  uploadProjectImageAsset,
} from "../utils/cloudinaryAsset.js";

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

const invalidPayload = (message) =>
  Object.assign(new Error(message), { statusCode: 400 });

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

const parseJsonField = (value, fieldName) => {
  if (typeof value !== "string") return value;

  try {
    return JSON.parse(value);
  } catch {
    throw invalidPayload(`Invalid ${fieldName} value.`);
  }
};

const normalizeProjectPayload = (body) => {
  const payload = getAllowedFields(body);

  if ("type" in payload) {
    payload.type = parseJsonField(payload.type, "project type");

    if (
      !payload.type ||
      typeof payload.type !== "object" ||
      Array.isArray(payload.type)
    ) {
      throw invalidPayload("Invalid project type value.");
    }
  }

  if ("techStack" in payload) {
    payload.techStack =
      typeof payload.techStack === "string" &&
      payload.techStack.trim() === ""
        ? []
        : parseJsonField(payload.techStack, "technology stack");

    if (!Array.isArray(payload.techStack)) {
      throw invalidPayload("Invalid technology stack value.");
    }
  }

  if (
    "featured" in payload &&
    typeof payload.featured === "string"
  ) {
    payload.featured = payload.featured === "true";
  }

  if ("order" in payload && typeof payload.order === "string") {
    const order = Number(payload.order);

    if (!Number.isFinite(order)) {
      throw invalidPayload("Invalid project order value.");
    }

    payload.order = order;
  }

  return payload;
};

const uploadRequestImage = async (file) => {
  assertValidProjectImage(file);

  const result = await uploadProjectImageAsset(file);

  return {
    image: result.secure_url,
    imagePublicId: result.public_id,
  };
};

const cleanupUploadedImage = async (uploadedImage) => {
  if (!uploadedImage?.imagePublicId) return;

  await tryDeleteCloudinaryAsset(
    uploadedImage.imagePublicId,
    "image"
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
  const payload = normalizeProjectPayload(req.body);
  let uploadedImage = null;

  if (req.file) {
    uploadedImage = await uploadRequestImage(req.file);
    Object.assign(payload, uploadedImage);
  }

  try {
    const project = await Project.create(payload);

    return res.status(201).json({
      success: true,
      message: "Project created successfully",
      data: project,
    });
  } catch (error) {
    await cleanupUploadedImage(uploadedImage);
    throw error;
  }
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

  const project = await Project.findById(id);

  if (!project) {
    return res.status(404).json({
      success: false,
      message: "Project not found",
    });
  }

  const payload = normalizeProjectPayload(req.body);
  let uploadedImage = null;

  if (req.file) {
    uploadedImage = await uploadRequestImage(req.file);
    Object.assign(payload, uploadedImage);
  }

  if (Object.keys(payload).length === 0) {
    return res.status(400).json({
      success: false,
      message: "No valid project fields provided",
    });
  }

  const previousImagePublicId = project.imagePublicId;

  project.set(payload);

  try {
    await project.save();
  } catch (error) {
    await cleanupUploadedImage(uploadedImage);
    throw error;
  }

  if (
    uploadedImage &&
    previousImagePublicId &&
    previousImagePublicId !== uploadedImage.imagePublicId
  ) {
    await tryDeleteCloudinaryAsset(previousImagePublicId, "image");
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

  await tryDeleteCloudinaryAsset(
    project.imagePublicId,
    "image"
  );

  return res.status(200).json({
    success: true,
    message: "Project deleted successfully",
  });
});
