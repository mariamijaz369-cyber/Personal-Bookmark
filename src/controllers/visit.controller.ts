import { Request, Response } from "express";
import { BookmarkVisitService } from "../service/visit.service";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";

const visitService = new BookmarkVisitService();

export class BookmarkVisitController {
  visitService: any;
  /**
   * 🔹 Track a visit (userId comes from token, bookmarkId from param)
   */
  async trackVisit(req: Request, res: Response): Promise<void> {
    try {
      const userId = res.locals.user; // 👈 taken from token (auth middleware)
      const { bookmarkId } = req.params;   // 👈 only bookmarkId is required from client

      if (!bookmarkId) {
        res.status(400).json({ success: false, message: "bookmarkId is required" });
        return;
      }
    if (!userId) {
        res.status(400).json({ success: false, message: "login is required" });
        return;
      }
      const visit = await visitService.trackVisit(userId, bookmarkId);

      res.status(200).json({
        success: true,
        message: "Visit tracked successfully",
        data: visit,
      });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  /**
   * 🔹 Get visit stats for a bookmark (userId from token, bookmarkId from param)
   */
  async getVisitStats(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user.id;
      const { bookmarkId } = req.params;

      if (!bookmarkId) {
        res.status(400).json({ success: false, message: "bookmarkId is required" });
        return;
      }
      if (!userId) {
        res.status(400).json({ success: false, message: "login is required" });
        return;
      }
      const count = await visitService.getVisitStats(userId, bookmarkId);

      res.status(200).json({
        success: true,
        message: "Visit stats retrieved successfully",
        visitCount: count,
      });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  /**
   * 🔹 Get all visit records (for admin/analytics)
   */
  async getAllVisits(req: Request, res: Response): Promise<void> {
    try {
      const visits = await visitService.getAllVisits();

      res.status(200).json({
        success: true,
        message: "All visits retrieved successfully",
        data: visits,
      });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
  async getMostVisitedUrl(req: Request, res: Response): Promise<void> {
    try {
      const  userId = res.locals.user; // taking userId from route param

      const result = await visitService.getMostVisitedUrl(userId);

      if (!result) {
        res.status(404).json({ success: false, message: "No visits found for this user" });
        return;
      }

      res.json({
        success: true,
        message: "Most visited URL retrieved successfully",
        data: result,
      });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}