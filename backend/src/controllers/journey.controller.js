
import mongoose from "mongoose";
import Journey from "../models/journey.js";
import asyncHandler from "../utils/asyncHandler.js";

const allowedFields = [
  "organization",
  "roleOrDegree",
  "startDate",
  "endDate",
  "description",
  "icon",
  "displayOrder",
];

// GET /api/journey
// Get all journey entries
export const getJourney = asyncHandler(async (req, res) => {
  const journey = await Journey.find().sort({
    displayOrder: 1,
    createdAt: 1,
  });

  return res.status(200).json({
    success: true,
    count: journey.length,
    data: journey,
  });
});

// GET /api/journey/:id
// Get one journey entry
export const getJourneyById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid journey ID",
    });
  }

  const journey = await Journey.findById(id);

  if (!journey) {
    return res.status(404).json({
      success: false,
      message: "Journey entry not found",
    });
  }

  return res.status(200).json({
    success: true,
    data: journey,
  });
});

// POST /api/journey
// Create a journey entry
export const createJourney = asyncHandler(async (req, res) => {
  const payload = {};

  for (const field of allowedFields) {
    if (req.body?.[field] !== undefined) {
      payload[field] = req.body[field];
    }
  }

  const journey = await Journey.create(payload);

  return res.status(201).json({
    success: true,
    message: "Journey entry created successfully",
    data: journey,
  });
});

// PATCH /api/journey/:id
// Update a journey entry
export const updateJourney = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid journey ID",
    });
  }

  const payload = {};

  for (const field of allowedFields) {
    if (req.body?.[field] !== undefined) {
      payload[field] = req.body[field];
    }
  }

  if (Object.keys(payload).length === 0) {
    return res.status(400).json({
      success: false,
      message: "No valid journey fields provided",
    });
  }

  const journey = await Journey.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  if (!journey) {
    return res.status(404).json({
      success: false,
      message: "Journey entry not found",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Journey entry updated successfully",
    data: journey,
  });
});

// DELETE /api/journey/:id
// Delete a journey entry
export const deleteJourney = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid journey ID",
    });
  }

  const journey = await Journey.findByIdAndDelete(id);

  if (!journey) {
    return res.status(404).json({
      success: false,
      message: "Journey entry not found",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Journey entry deleted successfully",
  });
});
