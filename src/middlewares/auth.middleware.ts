// bookmark
import { Request, Response, NextFunction } from "express";

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
