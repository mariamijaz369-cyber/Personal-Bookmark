// bookmark
// bookmark
import { Request, Response, NextFunction } from "express";
import { Session } from "../models/session.model";

interface AuthenticatedRequest extends Request {
  user?: any; // or a proper User type
}
export const isAuthenticated = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  if (req.user) {
    console.log("User is logged in:", req.user);
    return next();
  }

  return res.status(401).json({ message: "Unauthorized" });
};
export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Expecting "Bearer token"

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const session = await Session.findOne({ token, expiresAt: { $gt: new Date() } });

    if (!session) {
      return res.status(401).json({ message: "Invalid or expired session" });
    }

    res.locals.userId = session.userId; // ✅ Attach userId for controller
    next();
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};