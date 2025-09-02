"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_config_1 = require("./config/db.config");
const app_1 = __importDefault(require("./app"));
const PORT = 8000;
// app.use(express.json());
(0, db_config_1.connectDB)().then(() => {
    const server = app_1.default.listen(PORT, "0.0.0.0", () => {
        console.log(`:rocket: Server running at http://localhost:${PORT}`);
    });
    server.on("error", (err) => {
        console.error(":x: Server failed to start:", err);
    });
});
