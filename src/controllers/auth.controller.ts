import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import User from "../models/user.model"; // your Mongoose User schema
import { Session } from "../models/session.model";
import crypto from "crypto";
import dotenv from "dotenv";
import { AuthService } from "../service/auth.service";
export class AuthController {
  private authService = new AuthService();
  logout: any;

  // ✨ Signup (Register)
    public async signup(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email, password, dateOfBirth } = req.body;

    //  const { user, session } = await this.authService.registerUser(
      const { newUser, session } = await this.authService.registerUser(
        name,
        email,
        password,
        dateOfBirth
      );
    console.log(session)
      // new (res "✅ Signup successful", session, user.name);
      res.status(201).json({
      success: true,
      message: "✅ Signup successful",
      session,
      userName: newUser.name,
});
    } catch (err) {
      next(err);
    }
  }

  // ✨ Login
  public async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      const { user, session } = await this.authService.loginUser(email, password);

      // new Login(res, "✅ Login successful", session, user.name);
      res.status(200).json({
      success: true,
      message: "✅ Login successful",
      session,
      userName: user.name,
});

    } catch (err) {
      next(err);
    }
  }

  // ✨ Logout
  public async logoutUser(req: Request, res: Response, next: NextFunction) {
    try {
      if (!res.locals.token) {
        throw new Error("❌ Missing token");
      }
      const token = res.locals.token;
      await this.authService.logoutUser(token);
      res.status(200).json({
      success: true,
      message: "✅ Logout successful",
});
    } catch (err) {
      next(err);
    }
  }
}