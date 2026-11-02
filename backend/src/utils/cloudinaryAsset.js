import cloudinary, {
  cvFolder,
  projectImageFolder,
} from "../config/cloudinary.js";

const createSuffix = () =>
  `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;

const uploadBuffer = (buffer, options) =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      options,
      (error, result) => {
        if (error) {
          return reject(error);
        }

        resolve(result);
      }
    );

    stream.end(buffer);
  });

export const uploadProjectImageAsset = async (file) => {
  try {
    return await uploadBuffer(file.buffer, {
      resource_type: "image",
      public_id: `${projectImageFolder}/project-${createSuffix()}`,
      overwrite: false,
    });
  } catch (error) {
    console.error(
      "Cloudinary project image upload failed:",
      error.message
    );

    throw Object.assign(
      new Error("Could not upload the project image. Please try again."),
      { statusCode: 502 }
    );
  }
};

export const uploadCvAsset = async (file) => {
  try {
    return await uploadBuffer(file.buffer, {
      resource_type: "raw",
      public_id: `${cvFolder}/cv-${createSuffix()}.pdf`,
      overwrite: false,
    });
  } catch (error) {
    console.error("Cloudinary CV upload failed:", error.message);

    throw Object.assign(
      new Error("Could not upload the CV. Please try again."),
      { statusCode: 502 }
    );
  }
};

export const tryDeleteCloudinaryAsset = async (
  publicId,
  resourceType
) => {
  if (!publicId) return;

  try {
    await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType,
      invalidate: true,
    });
  } catch (error) {
    console.error(
      `Cloudinary asset deletion failed (${publicId}):`,
      error.message
    );
  }
};
