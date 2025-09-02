// src/repositories/bookmark.repository.ts

 import { Bookmark, IBookmark } from "../models/bookmark.model";
import { Types } from "mongoose";

export class BookmarkRepository {
  /**
   * Create a new bookmark
   */
  async createBookmark(
    userId: Types.ObjectId,
    url: string,
    title: string,
    notes?: string,
    tags: string[] = []
  ): Promise<IBookmark> {
    const bookmark = await Bookmark.create({
      userId,
      url,
      title,
      notes,
      tags,
    });
    return bookmark.toObject();
  }

  /**
   * Find all bookmarks for a user
   */
  async findByUser(userId: Types.ObjectId): Promise<IBookmark[]> {
    return Bookmark.find({ userId, deletedAt: null });
  }

  /**
   * Find a single bookmark by ID
   */
  async findById(bookmarkId: Types.ObjectId): Promise<IBookmark | null> {
    return Bookmark.findById(bookmarkId);
  }

  /**
   * Update a bookmark
   */
  async updateBookmark(
    bookmarkId: Types.ObjectId,
    updates: Partial<IBookmark>
  ): Promise<IBookmark | null> {
    return Bookmark.findByIdAndUpdate(bookmarkId, updates, { new: true });
  }

  /**
   * Soft delete a bookmark
   */
  async softDeleteBookmark(bookmarkId: Types.ObjectId): Promise<IBookmark | null> {
    return Bookmark.findByIdAndUpdate(
      bookmarkId,
      { $set: { deletedAt: new Date() } },
      { new: true }
    );
  }

  /**
   * Permanently delete a bookmark
   */
  async deleteBookmark(bookmarkId: Types.ObjectId): Promise<boolean> {
    const result = await Bookmark.deleteOne({ _id: bookmarkId });
    return result.deletedCount === 1;
  }

  /**
   * Search bookmarks by text (title, notes, tags)
   */
  async searchBookmarks(userId: Types.ObjectId, query: string): Promise<IBookmark[]> {
    return Bookmark.find({
      userId,
      deletedAt: null,
      $or: [
        { title: { $regex: query, $options: "i" } },
        { notes: { $regex: query, $options: "i" } },
        { tags: { $regex: query, $options: "i" } },
      ],
    });
  }

  /**
   * Filter bookmarks by tag
   */
  async findByTag(userId: Types.ObjectId, tag: string): Promise<IBookmark[]> {
    return Bookmark.find({
      userId,
      tags: tag,
      deletedAt: null,
    });
  }
}

// Export singleton instance
export const bookmarkRepository = new BookmarkRepository();
