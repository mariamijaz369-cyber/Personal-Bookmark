import { Router } from "express";
import { register,loginUser } from "../controllers/auth.controller";

const router = Router();

/**
 * @route   POST /api/auth/register
 * @desc    Register new user
 */
router.post("/register", register);


//  @route   POST /api/auth/login
//   @desc    Login user
 
  router.post("/login", loginUser);

// /**
//  * @route   POST /api/auth/logout
//  * @desc    Logout user
//  */
// router.post("/logout", logout);

 export default router;
