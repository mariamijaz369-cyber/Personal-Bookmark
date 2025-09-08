"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const route_1 = __importDefault(require("./routes/route"));
// import Bookmarkrouter from "./routes/bookmark.routes";
const authentication_middleware_1 = require("./middlewares/authentication.middleware");
const error_Handler_middleware_1 = require("./middlewares/error_Handler.middleware");
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middlewares
app.use(express_1.default.json());
app.use(authentication_middleware_1.authenticate);
// Routes
app.use("/", route_1.default);
// app.use("/", Bookmarkrouter)
app.use(error_Handler_middleware_1.errorHandler);
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
app.get("/", (req, res) => {
    res.send("✅ API is running...");
});
exports.default = app;
