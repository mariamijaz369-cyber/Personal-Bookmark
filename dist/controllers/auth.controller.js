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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_service_1 = require("../service/auth.service");
class AuthController {
    constructor() {
        this.authService = new auth_service_1.AuthService();
    }
    // ✨ Signup (Register)
    signup(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, password, dateOfBirth } = req.body;
                //  const { user, session } = await this.authService.registerUser(
                const { newUser, session } = yield this.authService.registerUser(name, email, password, dateOfBirth);
                // new (res "✅ Signup successful", session, user.name);
                res.status(201).json({
                    success: true,
                    message: "✅ Signup successful",
                    session,
                    userName: newUser.name,
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    // ✨ Login
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const { user, session } = yield this.authService.loginUser(email, password);
                // new Login(res, "✅ Login successful", session, user.name);
                res.status(200).json({
                    success: true,
                    message: "✅ Login successful",
                    session,
                    userName: user.name,
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    // ✨ Logout
    logoutUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!res.locals.token) {
                    throw new Error("❌ Missing token");
                }
                const token = res.locals.token;
                yield this.authService.logoutUser(token);
            }
            catch (err) {
                next(err);
            }
        });
    }
}
exports.AuthController = AuthController;
