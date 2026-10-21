import express from "express";
import { requireAdmin } from "../middlewares/requireAdmin.js";
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
router.post("/",requireAdmin, createJourney);

// Update a journey entry
router.patch("/:id",requireAdmin, updateJourney);

// Delete a journey entry
router.delete("/:id",requireAdmin, deleteJourney);

export default router;
