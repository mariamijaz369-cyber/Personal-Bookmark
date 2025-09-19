import { NextFunction, Router } from "express";
import { AuthController } from "../controllers/auth.controller";
const authController = new AuthController();
const router = Router();


router.post("/register",authController.signup.bind(authController));

  router.post("/login", authController.login.bind(authController));

 router.post("/logout", authController.logoutUser.bind(authController));

 export default router;
