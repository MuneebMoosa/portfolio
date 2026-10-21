import express from "express";
import cors from "cors";

import sessionMiddleware from "./config/session.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import projectRoutes from "./routes/project.routes.js";
import skillRoutes from "./routes/skill.routes.js";
import journeyRoutes from "./routes/journey.routes.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();

if (process.env.NODE_ENV === "production") {
  app.set("trust proxy", 1);
}

// CORS: allow your frontend to send session cookies
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

// Session configuration
app.use(sessionMiddleware);

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Portfolio backend is running",
  });
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/journey", journeyRoutes);

// Error handler must come after routes
app.use(errorMiddleware);

export default app;
