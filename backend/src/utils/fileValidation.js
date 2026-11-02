import {
  ALLOWED_CV_TYPES,
  ALLOWED_IMAGE_TYPES,
  MAX_CV_SIZE,
  MAX_IMAGE_SIZE,
} from "../middlewares/upload.js";

const hasBytes = (buffer, bytes, offset = 0) =>
  bytes.every((byte, index) => buffer[offset + index] === byte);

const isJpeg = (buffer) => hasBytes(buffer, [0xff, 0xd8, 0xff]);

const isPng = (buffer) =>
  hasBytes(buffer, [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

const isWebp = (buffer) =>
  buffer.length >= 12 &&
  buffer.toString("ascii", 0, 4) === "RIFF" &&
  buffer.toString("ascii", 8, 12) === "WEBP";

const isPdf = (buffer) =>
  buffer.subarray(0, 1024).toString("latin1").includes("%PDF-");

const imageSignatures = {
  "image/jpeg": isJpeg,
  "image/png": isPng,
  "image/webp": isWebp,
};

const invalidFile = (message) =>
  Object.assign(new Error(message), { statusCode: 400 });

export const assertValidProjectImage = (file) => {
  if (!file) {
    throw invalidFile("An image file is required.");
  }

  if (!ALLOWED_IMAGE_TYPES.has(file.mimetype)) {
    throw invalidFile("Only JPG, JPEG, PNG and WebP images are allowed.");
  }

  if (file.size > MAX_IMAGE_SIZE) {
    throw invalidFile("The image must be 5 MB or smaller.");
  }

  const isExpectedSignature = imageSignatures[file.mimetype];

  if (!isExpectedSignature || !isExpectedSignature(file.buffer)) {
    throw invalidFile("The uploaded image content does not match its file type.");
  }
};

export const assertValidCv = (file) => {
  if (!file) {
    throw invalidFile("A PDF file is required.");
  }

  if (!ALLOWED_CV_TYPES.has(file.mimetype)) {
    throw invalidFile("Only PDF files are allowed.");
  }

  if (file.size > MAX_CV_SIZE) {
    throw invalidFile("The CV must be 10 MB or smaller.");
  }

  if (!isPdf(file.buffer)) {
    throw invalidFile("The uploaded file is not a valid PDF.");
  }
};
