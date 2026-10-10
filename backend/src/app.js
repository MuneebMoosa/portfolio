import express from 'express'
import cors from 'cors'
import errorMiddleware from "./middlewares/error.middleware.js";
import projectRoutes from "./routes/project.routes.js"
import skillRoutes from "./routes/skill.routes.js"
import journeyRoutes from "./routes/journey.routes.js"


const app = express()

app.use(cors())
app.use(express.json())

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Portfolio backend is running"
  });
});

app.use("/api/projects", projectRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/journey", journeyRoutes);

app.use(errorMiddleware);
export default app;