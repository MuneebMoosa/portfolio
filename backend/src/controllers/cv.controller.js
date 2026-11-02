import { Readable } from "node:stream";
import CV from "../models/cv.js";
import asyncHandler from "../utils/asyncHandler.js";
import { assertValidCv } from "../utils/fileValidation.js";
import {
  tryDeleteCloudinaryAsset,
  uploadCvAsset,
} from "../utils/cloudinaryAsset.js";

const ACTIVE_CV_FILTER = { singletonKey: "active" };

const getDownloadFileName = (fileName) => {
  const base = String(fileName || "CV.pdf")
    .replace(/[\\/\r\n"]/g, "_")
    .trim();
  const withoutExtension = base.replace(/\.pdf$/i, "");

  return `${withoutExtension || "CV"}.pdf`;
};

const downloadError = (res) =>
  res.status(502).json({
    success: false,
    message: "Could not download the CV. Please try again later.",
  });

// GET /api/cv
export const getCv = asyncHandler(async (req, res) => {
  const cv = await CV.findOne(ACTIVE_CV_FILTER);

  return res.status(200).json({
    success: true,
    data: cv || null,
  });
});

// GET /api/cv/download
export const downloadCv = asyncHandler(async (req, res) => {
  const cv = await CV.findOne(ACTIVE_CV_FILTER);

  if (!cv) {
    return res.status(404).json({
      success: false,
      message: "No CV has been uploaded yet.",
    });
  }

  let cloudinaryResponse;

  try {
    cloudinaryResponse = await fetch(cv.fileUrl, {
      signal: AbortSignal.timeout(15000),
    });
  } catch (error) {
    console.error("CV fetch from Cloudinary failed:", error.message);
    return downloadError(res);
  }

  if (!cloudinaryResponse.ok || !cloudinaryResponse.body) {
    console.error(
      "CV fetch from Cloudinary returned status",
      cloudinaryResponse.status
    );
    return downloadError(res);
  }

  const fileName = getDownloadFileName(cv.fileName);
  const asciiFileName = fileName.replace(/[^\x20-\x7e]/g, "_");

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename="${asciiFileName}"; filename*=UTF-8''${encodeURIComponent(
      fileName
    )}`
  );
  res.setHeader("Cache-Control", "no-store");

  Readable.fromWeb(cloudinaryResponse.body)
    .on("error", (error) => {
      console.error("CV download stream failed:", error.message);
      res.destroy(error);
    })
    .pipe(res);
});

// POST /api/cv
export const uploadCv = asyncHandler(async (req, res) => {
  assertValidCv(req.file);

  const existingCv = await CV.findOne(ACTIVE_CV_FILTER);
  const uploadedCv = await uploadCvAsset(req.file);
  const previousPublicId = existingCv?.publicId;

  let cv;

  try {
    cv = await CV.findOneAndUpdate(
      ACTIVE_CV_FILTER,
      {
        $set: {
          fileUrl: uploadedCv.secure_url,
          publicId: uploadedCv.public_id,
          fileName: req.file.originalname,
          fileType: req.file.mimetype,
        },
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
        setDefaultsOnInsert: true,
      }
    );
  } catch (error) {
    await tryDeleteCloudinaryAsset(uploadedCv.public_id, "raw");
    throw error;
  }

  if (
    previousPublicId &&
    previousPublicId !== uploadedCv.public_id
  ) {
    await tryDeleteCloudinaryAsset(previousPublicId, "raw");
  }

  return res.status(200).json({
    success: true,
    message: existingCv
      ? "CV replaced successfully."
      : "CV uploaded successfully.",
    data: cv,
  });
});

// DELETE /api/cv
export const deleteCv = asyncHandler(async (req, res) => {
  const cv = await CV.findOneAndDelete(ACTIVE_CV_FILTER);

  if (!cv) {
    return res.status(404).json({
      success: false,
      message: "No CV has been uploaded yet.",
    });
  }

  await tryDeleteCloudinaryAsset(cv.publicId, "raw");

  return res.status(200).json({
    success: true,
    message: "CV deleted successfully.",
  });
});
