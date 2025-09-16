import { NextFunction, Request, Response } from "express";
import { ClickService } from "../service/click.service";

export class ClickController {
  private clickService: ClickService;

  constructor() {
    this.clickService = new ClickService();
  }

  /**
   * Track a click on a bookmark
   * POST /clicks/:bookmarkId
   */
  async trackClick(req: Request, res: Response, next: NextFunction) {
  try {
    const { bookmarkId } = req.params;
    const { url } = req.body;

    const click = await this.clickService.trackClick(bookmarkId, url);

    return res.status(200).json({
      success: true,
      message: "Click tracked successfully",
      data: click,
    });
  } catch (error) {
    next(error); // ✅ needs next
  }
}


  /**
   * Get stats for a single bookmark
   * GET /clicks/:bookmarkId
   */
  async getClickStats(req: Request, res: Response): Promise<void> {
    try {
      const { bookmarkId } = req.params;

      if (!bookmarkId) {
        res.status(400).json({ success: false, message: "bookmarkId is required" });
        return;
      }

      const stats = await this.clickService.getClickStats(bookmarkId);

      res.status(200).json({
        success: true,
        message: "Click stats retrieved successfully",
        data: stats,
      });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  /**
   * Get stats for all bookmarks
   * GET /clicks
   */
  async getAllClicks(req: Request, res: Response): Promise<void> {
    try {
      const allClicks = await this.clickService.getAllClicks();

      res.status(200).json({
        success: true,
        message: "All click stats retrieved successfully",
        data: allClicks,
      });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}