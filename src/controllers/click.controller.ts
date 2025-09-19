import { Request, Response, NextFunction } from "express";
import { ClickService } from "../service/click.service";
interface FetchResult {
  code: number;
  success: boolean;
  message: string;
  data: any;
}
export class ClickController {
  private clickService: ClickService;
  clickRepository: any;
  visitRepository: any;

  constructor() {
    this.clickService = new ClickService();
  }

  /**
   * 🔹 Track a click on a bookmark
   * POST /clicks/:bookmarkId
   */
 async trackClick(req: Request, res: Response): Promise<void> {
    try {
      const userId =  res.locals.user; // ✅ userId from token/middleware
      const { bookmarkId } = req.params;

      const click = await this.clickService.trackClick(userId, bookmarkId);

      res.status(200).json({
        success: true,
        message: "Click tracked successfully",
        data: click,
      });
    } catch (error: any) {
      res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || "Something went wrong",
      });
    }
  }
  /**
   * 🔹 Get stats for a single bookmark
   * GET /clicks/:bookmarkId
   */
   async getClickStats(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = res.locals.user; // ✅ include userId
      const { bookmarkId } = req.params;
     
      if (!bookmarkId) {
        res.status(400).json({ success: false, message: "bookmarkId is required" });
        return;
      }
      if (!userId) {
        res.status(400).json({ success: false, message: "login is required" });
        return;
      }
      const stats = await this.clickService.getClickStats(userId, bookmarkId);

      res.status(200).json({
        success: true,
        message: "✅ Click stats retrieved successfully",
        data: stats,
      });
    } catch (error: any) {
      next(error);
    }
  }
  /**
   * 🔹 Get stats for all bookmarks
   * GET /clicks
   */
  async getAllClicks(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const allClicks = await this.clickService.getAllClicks();

      res.status(200).json({
        success: true,
        message: "All click stats retrieved successfully",
        data: allClicks,
      });
    } catch (error: any) {
      next(error);
    }
  }

  /**
   * 🔹 Get the most clicked bookmark for a user
   * GET /clicks/most
   * Returns 404 if no bookmark exists
   */
  async getMostClickedUrl(req: Request, res: Response): Promise<void> {
    try {
      const userId = res.locals.user;

      if (!userId) {
        res.status(401).json({ success: false, message: "Unauthorized: userId not found" });
        return;
      }

      // ✅ Throws 404 internally if no bookmark exists
      const mostClicked = await this.clickService.getMostClickedUrl(userId);

      res.status(200).json({
        success: true,
        message: "Most clicked bookmark fetched successfully",
        data: mostClicked,
      });
    } catch (error: any) {
      res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || "Internal server error",
      });
    }
  }
}
