import { Bookmark, IBookmark } from "../models/bookmark.model";
import { Types } from "mongoose";

/**
 * Find bookmark by user and URL
 */
export async function findBookmarkByUserAndUrl(
  userId: Types.ObjectId,
  url: string
): Promise<IBookmark | null> {
  return Bookmark.findOne({ userId, url, deletedAt: null });
}

/**
 * Bookmark Repository (single definition)
 */
export class BookmarkRepository {
  /**
   * Create a new bookmark
   */
  async createBookmark(
    userId: Types.ObjectId,
    url: string,
    title: string,
    tags: string[],
    notes?: string,
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
  async deleteBookmark(bookmarkId: Types.ObjectId, isSoftDelete: boolean = true): Promise<IBookmark | null> {
    if (isSoftDelete) {
      // Soft delete → mark as deleted instead of removing
      return Bookmark.findByIdAndUpdate(
        bookmarkId,
        { $set: { isDeleted: true } },
        { new: true }
      );
    } else {
      // Hard delete → remove completely
      return Bookmark.findByIdAndDelete(bookmarkId);
    }
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

// ✅ Export singleton instance
export const bookmarkRepository = new BookmarkRepository();

/**
 * Example in-memory update function (fake DB)
 */
let bookmarks = [
  { id: "1", url: "https://google.com", title: "Google", notes: "Search engine", tags: ["search"] },
  { id: "2", url: "https://youtube.com", title: "YouTube", notes: "Videos", tags: ["videos"] }
];

// ✅ Update a bookmark in memory
export async function updateBookmark(
  bookmarkId: string,
  updateData: Partial<{ url: string; title: string; notes: string; tags: string[] }>
) {
  const index = bookmarks.findIndex(b => b.id === bookmarkId);
  if (index === -1) throw new Error("Bookmark not found");

  bookmarks[index] = { ...bookmarks[index], ...updateData };
  return bookmarks[index];
}


// delete
export async function deleteBookmark(
  bookmarkId: string,
  isSoftDelete: boolean = true
): Promise<IBookmark | null> {
  let deletedBookmark: IBookmark | null;

  if (isSoftDelete) {
    // ✅ Soft delete → mark as deleted instead of removing
    deletedBookmark = await Bookmark.findByIdAndUpdate(
      bookmarkId,
      { $set: { isDeleted: true } },
      { new: true }
    );
  } else {
    // ✅ Hard delete → remove completely
    deletedBookmark = await Bookmark.findByIdAndDelete(bookmarkId);
  }

  return deletedBookmark;
}
