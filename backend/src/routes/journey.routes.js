
import express from "express";

import {
  getJourney,
  getJourneyById,
  createJourney,
  updateJourney,
  deleteJourney,
} from "../controllers/journey.controller.js";

const router = express.Router();

// Get all journey entries
router.get("/", getJourney);

// Get one journey entry by ID
router.get("/:id", getJourneyById);

// Create a journey entry
router.post("/", createJourney);

// Update a journey entry
router.patch("/:id", updateJourney);

// Delete a journey entry
router.delete("/:id", deleteJourney);

export default router;
