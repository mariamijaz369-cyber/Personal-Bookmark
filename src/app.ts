import express, { Application, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import routes from "./routes/route";
import { authenticate } from "./middlewares/authentication.middleware";
import { errorHandler } from "./middlewares/error_Handler.middleware";
import bookmarkRoutes from "./routes/bookmark.routes";
import rateLimit from "express-rate-limit";
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import cors from "cors";
dotenv.config();

const app: Application = express();

// Middlewares
app.use(express.json());

// ✅ Rate limiter should come BEFORE auth & routes
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minute
  max: 100,              // only 100 requests per 15 minute
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req: Request, res: Response) => {
    res.status(429).json({ success: false, message: "⛔ Too many requests" });
  }
});
app.use(limiter);

// Debugging – log IPs
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log("Client IP detected:", req.ip);
  next();
});

// 🔑 Auth middleware
app.use(authenticate);

// Routes
app.use("/", routes);
app.use("/api", bookmarkRoutes);

// Global error handler
app.use(errorHandler);

// Health check
app.get("/health", (req: Request, res: Response) => {
  res.send("✅ API is running...");
});

export default app;
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My API",
      version: "1.0.0",
      description: "API documentation with Swagger",
    },
    servers: [{ url: "http://localhost:8000" }], // your backend URL
  },
  apis: ["./resources/docs/openapi/*"],// path to your route files with docs
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs)); 
app.use(cors());