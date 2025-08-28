"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_config_1 = require("./config/db.config");
const app_1 = __importDefault(require("./app"));
const PORT = process.env.PORT || 8000;
app_1.default.use(express_1.default.json());
(0, db_config_1.connectDB)();
app_1.default.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
