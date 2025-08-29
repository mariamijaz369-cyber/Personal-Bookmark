import { Request, Response, NextFunction } from "express";
import { Session } from "../models/session.model"; // your session schema
// import { UnauthorizedError } from "../error/custom_error.error"; // custom error (optional)

export async function authenticate(req: Request, res: Response, next: NextFunction) {
   try{
    const authHeader = req.header("Authorization");

    // ✅ Step 1: Check if token exists
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next()
    }

    // ✅ Step 2: Extract token
    const token = authHeader!.replace("Bearer ", "").trim();

    // ✅ Step 3: Find session in DB
    const session = await Session.findOne({ token });

    if (!session) {
      return res.status(401).json({ message: "❌ Invalid token" });
    }

    // ✅ Step 4: Check if user logged out
    if (session.logoutAt !== null) {
      return res.status(401).json({ message: "❌ User already logged out" });
    }

    // ✅ Step 5: Check expiry
    if (session.expiresAt < new Date()) {
      return res.status(401).json({ message: "❌ Token expired" });
    }

    // ✅ Step 6: Save token + user in res.locals for next APIs
    res.locals.user = session.userId;
    res.locals.token = token;

    // ✅ Step 7: Go to next middleware / controller
    next();
  } catch(err){
    next(err)
  }
}

