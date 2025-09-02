"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const authController = new auth_controller_1.AuthController();
const router = (0, express_1.Router)();
/**
 * @route   POST /api/auth/register
 * @desc    Register new user
 */
router.post("/register", authController.signup.bind(authController));
//  @route   POST /api/auth/login
//   @desc    Login user
router.post("/login", authController.login.bind(authController));
// /**
//  * @route   POST /api/auth/logout
//  * @desc    Logout user
//  */
router.post("/logout", authController.logout.bind(authController));
exports.default = router;
