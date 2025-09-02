import { NextFunction, Router } from "express";
import { AuthController } from "../controllers/auth.controller";
const authController = new AuthController();
const router = Router();

/**
 * @route   POST /api/auth/register
 * @desc    Register new user
 */
router.post("/register",authController.signup.bind(authController));


//  @route   POST /api/auth/login
//   @desc    Login user
 
  router.post("/login", authController.login.bind(authController));

// /**
//  * @route   POST /api/auth/logout
//  * @desc    Logout user
//  */
 router.post("/logout", authController.logoutUser.bind(authController));

 export default router;
