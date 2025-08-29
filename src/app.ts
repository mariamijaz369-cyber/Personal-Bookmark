// import express, { Application, Request, Response } from "express";
// import session from "express-session";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import swaggerUi from "swagger-ui-express";
// import swaggerJsDoc from "swagger-jsdoc";
// import routes from "./routes/route"

// // import { errorHandler } from "./middlewares/errorHandler.middleware";
// // import { isAuthenticated } from "./middlewares/authenticate.middleware";

// // // Import routes
// // import authRoutes from "./routes/auth.routes";
// // import userRoutes from "./routes/user.routes";
// // import bookmarkRoutes from "./routes/bookmark.routes";

// // Load environment variables
// dotenv.config();

// const app: Application = express();

// // ========== Middleware ==========
// app.use(express.json()); // parse JSON request body

// // ✅ Setup sessions (for authentication)
// // app.use(
// //   session({
// //     secret: process.env.SESSION_SECRET || "supersecret",
// //     resave: false,
// //     saveUninitialized: false,
// //     cookie: { secure: false }, // true only if HTTPS
// //   })
// // );
// app.use('/',routes)

// // ========== Swagger Setup ==========

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
//   apis: ["./src/routes/*.ts"], // routes folder
// };

// const swaggerDocs = swaggerJsDoc(swaggerOptions);
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));


// // Health check
// app.get("/", (req: Request, res: Response) => {
//   res.send("✅ API is running...");
// });


// 
import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import routes from "./routes/route";
import { authenticate } from "./middlewares/authentication.middleware";
import { errorHandler } from "./middlewares/error_Handler.middleware";
dotenv.config();

const app: Application = express();

// Middlewares
app.use(express.json());
app.use(authenticate)
// Routes
app.use("/", routes);
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
