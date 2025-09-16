import { Request, Response, NextFunction } from "express";
import { BookmarkVisitService } from "../service/visit.service";

export class BookmarkVisitController {
  private bookmarkVisitService: BookmarkVisitService;

  constructor() {
    this.bookmarkVisitService = new BookmarkVisitService();
  }

  /**
   * 🔹 Track a visit for a user and bookmark
   */
  async trackVisit(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = res.locals.user; // assuming user id comes from auth middleware
      const { bookmarkId } = req.params;

      const visit = await this.bookmarkVisitService.trackVisit(userId, bookmarkId);

      return res.status(200).json({
        success: true,
        message: "✅ Visit tracked successfully",
        data: visit,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * 🔹 Get total visits for a user on a specific bookmark
   */
  async getVisitStats(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = res.locals.user;
      const { bookmarkId } = req.params;

      const count = await this.bookmarkVisitService.getVisitStats(userId, bookmarkId);

      return res.status(200).json({
        success: true,
        message: "✅ Visit stats retrieved successfully",
        data: { visitCount: count },
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * 🔹 Get all visit records (for admin/analytics)
   */
  async getAllVisits(req: Request, res: Response, next: NextFunction) {
    try {
      const visits = await this.bookmarkVisitService.getAllVisits();

      return res.status(200).json({
        success: true,
        message: "✅ All visits retrieved successfully",
        data: visits,
      });
    } catch (error) {
      next(error);
    }
  }
}
