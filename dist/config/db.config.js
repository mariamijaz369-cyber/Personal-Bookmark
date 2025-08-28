"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.disconnectDB = exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // Load environment variables
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/bookmarks-app";
// ✅ Connect to MongoDB
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(MONGODB_URI);
        console.log(`✅ Connected to MongoDB at ${MONGODB_URI}`);
    }
    catch (error) {
        console.error("❌ MongoDB connection error:", error);
        process.exit(1); // Stop app if DB connection fails
    }
});
exports.connectDB = connectDB;
// 🔌 Disconnect from MongoDB
const disconnectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.disconnect();
        console.log("🔌 Disconnected from MongoDB");
    }
    catch (error) {
        console.error("❌ MongoDB disconnection error:", error);
    }
});
exports.disconnectDB = disconnectDB;
