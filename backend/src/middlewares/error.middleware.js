const errorMiddleware = (err, req, res, next) => {
  console.error(err);

  if (err.name === "MulterError") {
    const messages = {
      LIMIT_FILE_SIZE: "The uploaded file is too large.",
      LIMIT_FILE_COUNT: "Only one file can be uploaded.",
      LIMIT_UNEXPECTED_FILE: "Unexpected file field.",
    };

    return res.status(400).json({
      success: false,
      message: messages[err.code] || "Invalid file upload.",
    });
  }

  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors || {})
      .map((validationError) => validationError.message)
      .filter(Boolean);

    return res.status(400).json({
      success: false,
      message: messages[0] || "Invalid data.",
    });
  }

  if (err.name === "CastError") {
    return res.status(400).json({
      success: false,
      message: "Invalid data.",
    });
  }

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message:
      statusCode === 500
        ? "Internal server error"
        : err.message,
  });
};

export default errorMiddleware;
