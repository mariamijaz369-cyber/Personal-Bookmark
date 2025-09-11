import { NextFunction, Request, Response } from "express";
import { Bookmark, IBookmark } from "../models/bookmark.model";
import { BookmarkService } from "../service/bookmark.service.copy";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { GetActiveBookmarksSchema } from "../dto/bookmark.request.dto";
import { Error } from "mongoose";
import {BookmarkResponse, GetActiveBookmarksResponse} from "../dto/bookmark.response.dto"
export class BookmarkController {
  bind(bind: any): import("express-serve-static-core").RequestHandler<ParamsDictionary, any, any, ParsedQs, Record<string, any>> {
    throw new Error("Method not implemented.");
  }
  private bookmarkService: BookmarkService;
  // deleteBookmark: any;

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
  public async updateBookmark(req: Request, res: Response) {
    try {
      const userId = res.locals.user as string;
      const { id } = req.params;
      const { title, url, tags, notes } = req.body as {
        title?: string;
        url?: string;
        tags?: string[];
        notes?: string;
      };

      // 1️⃣ Check bookmark first
      const bookmark = await Bookmark.findOne({ _id: id, userId });

      if (!bookmark) {
        return res.status(404).json({
          success: false,
          message: "❌ Bookmark not found or not yours",
        });
      }
      console.log("bookmark", bookmark);
      // 2️⃣ If bookmark is deleted → return message (DO NOT update)
      if (bookmark.deletedAt) {
        return res.status(400).json({
          success: false,
          message: "❌ Bookmark is already deleted. Update is not allowed.",
        });
      }

      // 3️⃣ Build update object only from valid values
      const update: Record<string, any> = {};
      if (typeof title === "string" && title.trim()) update.title = title.trim();
      if (typeof url === "string" && url.trim()) update.url = url.trim();
      if (Array.isArray(tags)) update.tags = tags;
      if (typeof notes === "string") update.notes = notes;

      if (Object.keys(update).length === 0) {
        return res.status(400).json({
          success: false,
          message: "❌ Nothing to update. Send at least one valid field.",
        });
      }

      // 4️⃣ Update only if bookmark is NOT deleted
      Object.assign(bookmark, update);
      await bookmark.save();

      return res.status(200).json({
        success: true,
        message: "✅ Bookmark updated successfully",
        bookmark,
      });

    } catch (error: any) {
      console.error("updateBookmark error:", error);
      return res.status(500).json({
        success: false,
        message: error.message || "Server error",
      });
    }
  }
  public async deleteBookmark(req: Request, res: Response) {
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

  // get api
//   public async getActiveBookmarks(req: Request, res: Response,next:NextFunction) {
//     try {
//       const userId = res.locals.user; // ✅ logged-in use
//       const { error, value } = GetActiveBookmarksSchema.validate(req.query);
//       if(error){
//         throw new Error(error.message)
//       }
//       if (!userId) {
//         return res.status(401).json({ success: false, message: "Unauthorized" });
//       }
//       const rawQuery = (value.searchQuery?? "").toString().trim();
//      console.log(rawQuery)
//       // base filter: only this user's bookmarks and not deleted
//       const filter: any = {
//         userId,
//         $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
//       };

//       // if there's a search query, add case-insensitive title match
//       if (rawQuery.length > 0) {
//         // split into words and escape each word, then match any word
//         const words = rawQuery.split(/\s+/).map((w:any) => this.escapeRegex(w));
//         const pattern = words.join("|"); // matches any of the words
//         filter.title = { $regex: pattern, $options: "i" }; // "i" = case-insensitive
//       }

//       const bookmarks = await Bookmark.find(
//         filter,
//         { title: 1, url: 1, tags: 1, notes: 1 } // projection
//       ).sort({ createdAt: -1 });

//       return res.status(200).json({ success: true, data: bookmarks });
//     } catch (error: any) {
//       next(error)
//     }
//   }
//   private escapeRegex(w: string): any {
//   return w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
// }
// }
// import { Request, Response, NextFunction } from "express";
// import { GetActiveBookmarksSchema } from "../dtos/bookmark.request.dto";
// import { GetActiveBookmarksResponse, BookmarkResponse } from "../dtos/bookmark.response.dto";
// import Bookmark from "../models/bookmark.model"; // adjust path

// export class BookmarkController {
  public async getActiveBookmarks(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = res.locals.user;
      const { error, value } = GetActiveBookmarksSchema.validate(req.query);

      if (error) {
        throw new Error(error.message);
      }

      if (!userId) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
      }

      const rawQuery = (value.searchQuery ?? "").toString().trim();

      const filter: any = {
        userId,
        $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
      };

      if (rawQuery.length > 0) {
        const words = rawQuery.split(/\s+/).map((w: any) => this.escapeRegex(w));
        const pattern = words.join("|");
        filter.title = { $regex: pattern, $options: "i" };
      }

      const bookmarks = await Bookmark.find(
        filter,
        { title: 1, url: 1, tags: 1, notes: 1, createdAt: 1 }
      ).sort({ createdAt: -1 });

      // ✅ Map MongoDB docs -> DTO
      const formatted: BookmarkResponse[] = bookmarks.map((b) => ({
        id: b._id.toString(),
        url: b.url,
        title: b.title,
        notes: b.notes,
        tags: b.tags,
        createdAt: b.createdAt,
      }));

      // ✅ Use the GetActiveBookmarksResponse interface
      const response: GetActiveBookmarksResponse = {
        code: 200,
        success: true,
        message: "Bookmarks retrieved successfully",
        bookmarks:formatted,
        // data: formatted, 
      };

      return res.status(200).json(response);
    } catch (error: any) {
      next(error);
    }
  }

  private escapeRegex(w: string): string {
    return w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }
}
