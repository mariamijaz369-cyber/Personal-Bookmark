"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const router = (0, express_1.Router)();
/**
 * @route   POST /api/auth/register
 * @desc    Register new user
 */
router.post("/register", auth_controller_1.register);
/**
 * @route   POST /api/auth/login
 * @desc    Login user
 */
// router.post("/login", login);
// /**
//  * @route   POST /api/auth/logout
//  * @desc    Logout user
//  */
// router.post("/logout", logout);
exports.default = router;
