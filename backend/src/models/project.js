
import mongoose from "mongoose";

const projectTypeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      enum: [
        "Full Stack",
        "Frontend",
        "Backend",
        "Chrome Extension",
        "AI/ML",
        "Mobile App",
        "Other",
      ],
    },
    icon: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { _id: false }
);

const technologySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    icon: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { _id: false }
);

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: projectTypeSchema,
      required: true,
    },
    techStack: {
      type: [technologySchema],
      default: [],
    },
    image: {
      type: String,
      default: "",
    },
    liveUrl: {
      type: String,
      default: "",
    },
    githubUrl: {
      type: String,
      default: "",
    },
    featured: {
      type: Boolean,
      default: false,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);

export default Project;
