import { NextFunction, Request, Response } from "express";
import { ClickService } from "../service/click.service";

export class ClickController {
  private clickService: ClickService;

  constructor() {
    this.clickService = new ClickService();
  }

  /**
   * 🔹 Track a click on a bookmark
   * POST /clicks/:bookmarkId
   */
  async trackClick(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = res.locals.user; // ✅ userId comes from auth middleware
      const { bookmarkId } = req.params;
      const { url } = req.body;
    if (!bookmarkId) {
        res.status(400).json({ success: false, message: "bookmarkId is required" });
        return;
      }
      if (!userId) {
        res.status(400).json({ success: false, message: "login is required" });
        return;
      }
      const click = await this.clickService.trackClick(userId, bookmarkId, url);

      return res.status(200).json({
        success: true,
        message: "✅ Click tracked successfully",
        data: click,
      });
    } catch (error) {
      next(error);
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
        message: "✅ All click stats retrieved successfully",
        data: allClicks,
      });
    } catch (error: any) {
      next(error);
    }
  }
  async getMostClickedUrl(req: Request, res: Response): Promise<void> {
    try {
      const userId  = res.locals.user;
     console.log(userId)
      const mostClicked = await this.clickService.getMostClickedUrl(userId);

      if (!mostClicked) {
        res.status(404).json({ success: false, message: "No clicks found for this user" });
        return;
      }

      res.status(200).json({
        success: true,
        message: "Most clicked URL fetched successfully",
        data: mostClicked,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: "Server Error", error });
    }
  }
}
