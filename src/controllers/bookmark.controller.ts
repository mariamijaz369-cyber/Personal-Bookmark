import { NextFunction, Request, Response } from "express";
import { Bookmark, IBookmark } from "../models/bookmark.model";
import { BookmarkService } from "../service/bookmark.service.copy";

export class BookmarkController {
  private bookmarkService: BookmarkService;
  deleteBookmark: any;

  constructor() {
    this.bookmarkService = new BookmarkService();
  }

  // ✅ Create a new bookmark
  public async createBookmark(req: Request, res: Response): Promise<void> {
    try {
      const userId = res.locals.user; // set by auth middleware
      if (!userId) {
        res.status(401).json({
          success: false,
          message: "Unauthorized: No valid user session",
        });
        return;
      }

      const { url, title, tags, notes } = req.body;

      const newBookmark = await this.bookmarkService.createBookmark({
        userId,
        url,
        title,
        tags,
        notes,
      });

      res.status(201).json({
        success: true,
        message: "Bookmark created successfully",
        data: newBookmark,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message || "Failed to create bookmark",
      });
    }
  }

  // ✅ Get all bookmarks
  public async getBookmarks(req: Request, res: Response): Promise<void> {
    try {
      const userId = res.locals.user;
      if (!userId) {
        res.status(401).json({ success: false, message: "Unauthorized" });
        return;
      }

      const bookmarks = await Bookmark.find({ userId, deletedAt: null }).sort({
        createdAt: -1,
      });

      res.status(200).json({ success: true, data: bookmarks });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // ✅ Get single bookmark
  public async getBookmarkById(req: Request, res: Response): Promise<void> {
    try {
      const userId = res.locals.user;
      const { id } = req.params;

      const bookmark = await Bookmark.findOne({ _id: id, userId });

      if (!bookmark || bookmark.deletedAt) {
        res
          .status(404)
          .json({ success: false, message: "Bookmark not found" });
        return;
      }

      res.status(200).json({ success: true, data: bookmark });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // ✅ Update bookmark
  public async updateBookmark(req: Request, res: Response): Promise<void> {
    try {
      const userId = res.locals.user;
      const { id } = req.params;
      const { url, title, notes, tags } = req.body;

      const updatedBookmark = await Bookmark.findOneAndUpdate(
        { _id: id, userId },
        { url, title, notes, tags },
        { new: true }
      );

      if (!updatedBookmark) {
        res.status(404).json({ success: false, message: "Bookmark not found" });
        return;
      }

      res.status(200).json({ success: true, data: updatedBookmark });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}
// delete
export const deleteBookmark = async (req: Request, res: Response) => {
  try {
    const userId = res.locals.user; // user comes from middleware
    const { id } = req.params; // bookmark id from URL

    const deletedBookmark = await Bookmark.findOneAndUpdate(
      { _id: id, userId },
      { deletedAt: new Date() }, // mark as deleted (soft delete)
      { new: true }
    );

    if (!deletedBookmark) {
      return res.status(404).json({ success: false, message: "❌ Bookmark not found" });
    }

    return res.status(200).json({
      success: true,
      message: "✅ Bookmark deleted",
      deletedBookmark,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};