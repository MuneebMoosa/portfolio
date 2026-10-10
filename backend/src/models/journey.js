
import mongoose from "mongoose";

const journeySchema = new mongoose.Schema(
  {
    organization: {
      type: String,
      required: true,
      trim: true,
    },
    roleOrDegree: {
      type: String,
      required: true,
      trim: true,
    },
    startDate: {
      type: String,
      required: true,
      match: /^\d{4}-(0[1-9]|1[0-2])$/,
    },
    endDate: {
      type: String,
      default: null,
      validate: {
        validator: (value) =>
          value === null ||
          /^\d{4}-(0[1-9]|1[0-2])$/.test(value),
        message: "End date must use YYYY-MM format or be null",
      },
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    icon: {
      type: String,
      required: true,
      enum: ["Briefcase", "GraduationCap"],
    },
    displayOrder: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Journey = mongoose.model("Journey", journeySchema);

export default Journey;
