"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const route_1 = __importDefault(require("./routes/route"));
// import { errorHandler } from "./middlewares/errorHandler.middleware";
// import { isAuthenticated } from "./middlewares/authenticate.middleware";
// // Import routes
// import authRoutes from "./routes/auth.routes";
// import userRoutes from "./routes/user.routes";
// import bookmarkRoutes from "./routes/bookmark.routes";
// Load environment variables
dotenv_1.default.config();
const app = (0, express_1.default)();
// ========== Middleware ==========
app.use(express_1.default.json()); // parse JSON request body
// ✅ Setup sessions (for authentication)
// app.use(
//   session({
//     secret: process.env.SESSION_SECRET || "supersecret",
//     resave: false,
//     saveUninitialized: false,
//     cookie: { secure: false }, // true only if HTTPS
//   })
// );
app.use('/', route_1.default);
// ========== Swagger Setup ==========
const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Bookmarks API",
            version: "1.0.0",
            description: "A simple backend API for managing personal bookmarks",
        },
        servers: [
            {
                url: "http://localhost:8000",
            },
        ],
    },
    apis: ["./src/routes/*.ts"], // routes folder
};
const swaggerDocs = (0, swagger_jsdoc_1.default)(swaggerOptions);
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocs));
// Health check
app.get("/", (req, res) => {
    res.send("✅ API is running...");
});
exports.default = app;
