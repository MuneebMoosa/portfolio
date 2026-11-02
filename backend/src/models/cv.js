import mongoose from "mongoose";

const cvSchema = new mongoose.Schema(
  {
    fileUrl: {
      type: String,
      required: true,
    },
    publicId: {
      type: String,
      required: true,
    },
    fileName: {
      type: String,
      required: true,
    },
    fileType: {
      type: String,
      default: "application/pdf",
    },
    singletonKey: {
      type: String,
      default: "active",
      unique: true,
      immutable: true,
      select: false,
    },
  },
  { timestamps: true }
);

const CV = mongoose.model("CV", cvSchema);

export default CV;
