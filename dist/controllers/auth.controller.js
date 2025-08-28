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
exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_model_1 = __importDefault(require("../models/user.model")); // your Mongoose User schema
// Register new user
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, dateOfBirth } = req.body;
        // 1️⃣ Check if all fields are provided
        if (!name || !email || !password || !dateOfBirth) {
            return res.status(400).json({ message: "All fields are required" });
        }
        // 2️⃣ Check if email is already registered
        const existingUser = yield user_model_1.default.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email is already registered" });
        }
        // 3️⃣ Hash password (for security)
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        // 4️⃣ Save user to MongoDB
        const newUser = new user_model_1.default({
            name,
            email,
            password: hashedPassword,
            dateOfBirth,
        });
        yield newUser.save();
        // 5️⃣ Send success response (never return raw password)
        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                dateOfBirth: newUser.dateOfBirth,
            },
        });
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});
exports.register = register;
