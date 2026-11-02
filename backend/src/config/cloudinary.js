import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const trimSlashes = (value) => String(value).replace(/^\/+|\/+$/g, "");

export const projectImageFolder = trimSlashes(
  process.env.CLOUDINARY_PROJECT_FOLDER || "portfolio/projects"
);

export const cvFolder = trimSlashes(
  process.env.CLOUDINARY_CV_FOLDER || "portfolio/cv"
);

export default cloudinary;
