
import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
 import routes from "./routes/route";
// import Bookmarkrouter from "./routes/bookmark.routes";
import { authenticate } from "./middlewares/authentication.middleware";
import { errorHandler } from "./middlewares/error_Handler.middleware";
dotenv.config();

const app: Application = express();

// Middlewares
app.use(express.json());
app.use(authenticate)
// Routes
app.use("/", routes);
// app.use("/", Bookmarkrouter)
app.use(errorHandler)
// Swagger setup
// const swaggerOptions = {
//   definition: {
//     openapi: "3.0.0",
//     info: {
//       title: "Bookmarks API",
//       version: "1.0.0",
//       description: "A simple backend API for managing personal bookmarks",
//     },
//     servers: [
//       {
//         url: "http://localhost:8000",
//       },
//     ],
//   },
//   apis: ["./src/routes/*.ts"],
// };

// const swaggerDocs = swaggerJsDoc(swaggerOptions);
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Health check
app.get("/", (req: Request, res: Response) => {
  res.send("✅ API is running...");
});

export default app;
