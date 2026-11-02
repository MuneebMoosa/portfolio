import multer from "multer";

export const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
export const MAX_CV_SIZE = 10 * 1024 * 1024;

export const ALLOWED_IMAGE_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
]);

export const ALLOWED_CV_TYPES = new Set(["application/pdf"]);

const createUploader = ({ maxSize, allowedTypes, errorMessage }) =>
  multer({
    storage: multer.memoryStorage(),
    limits: {
      fileSize: maxSize,
      files: 1,
    },
    fileFilter: (req, file, callback) => {
      if (!allowedTypes.has(file.mimetype)) {
        return callback(
          Object.assign(new Error(errorMessage), { statusCode: 400 })
        );
      }

      callback(null, true);
    },
  });

export const uploadProjectImage = createUploader({
  maxSize: MAX_IMAGE_SIZE,
  allowedTypes: ALLOWED_IMAGE_TYPES,
  errorMessage: "Only JPG, JPEG, PNG and WebP images are allowed.",
});

export const uploadCvFile = createUploader({
  maxSize: MAX_CV_SIZE,
  allowedTypes: ALLOWED_CV_TYPES,
  errorMessage: "Only PDF files are allowed.",
});
