import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import { fileURLToPath } from "url";
import path from "path";
import expressLayouts from "express-ejs-layouts";

import apiRoutes from "./routes/api/v1/index.js";

import rateLimit from "express-rate-limit";

const apiLimiter = rateLimit({
  // 15 minutes
  windowMs: 15 * 60 * 1000,
  // IP limit
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

// Initialize app
const app = express();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Main middlewares
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(expressLayouts);
app.use(cors());
app.use("/api/", apiLimiter);
app.use(express.static(path.join(__dirname, "public")));

// Main routes
app.use("/api/v1", apiRoutes);

// Static files
app.use("/assets", express.static(path.join(__dirname, "../public/assets")));

export default app;
