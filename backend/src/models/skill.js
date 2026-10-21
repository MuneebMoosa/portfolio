import mongoose from "mongoose";

const skillItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    percent: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    icon: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const skillSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      trim: true,
      enum: [
        "Frontend",
        "Backend",
        "Databases",
        "DevOps",
        "Tools",
      ],
    },
    icon: {
      type: String,
      required: true,
    },
    skills: {
      type: [skillItemSchema],
      default: [],
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Skill = mongoose.model("Skill", skillSchema);

export default Skill;
