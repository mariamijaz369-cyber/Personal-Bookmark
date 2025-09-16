import { Bookmark, IBookmark } from "../models/bookmark.model";
import { FilterQuery, Types } from "mongoose"
interface GetActiveBookmarkResult {
  bookmarks: IBookmark[];
  nextCursor: string | null;
  hasNextPage: boolean;
}
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
  static GetActiveBookmarks(userId: string, arg1: string, arg2: string, cursor: string | undefined, arg4: number, sortOption: Record<string, 1 | -1>) {
    throw new Error("Method not implemented.");
  }
 
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

  async GetActiveBookmark(
    userId: string,
    searchQuery = "",
    tags = "",
    cursor?: string,
    limit = 10,
    sort = "createdAt:desc" // default sorting
  ): Promise<GetActiveBookmarkResult> {
    const query: any = { userId };

    // Filter by search query
    if (searchQuery) query.title = { $regex: searchQuery, $options: "i" };

    // Filter by tags
    if (tags) query.tags = { $in: tags.split(",") };

    // Cursor pagination (_id greater than last cursor)
    if (cursor) query._id = { $gte: cursor };

    // Parse sort string (e.g., "createdAt:desc" or "title:asc")
    const [field, order] = sort.split(":");
    const sortObj: any = {};
    sortObj[field] = order === "desc" ? -1 : 1;

    // Fetch bookmarks with limit + 1 (to check next page)
    const bookmarks = await Bookmark.find(query)
      .sort(sortObj)
      .limit(limit + 1);

    let hasNextPage = false;
    let nextCursor: string | null = null;

    if (bookmarks.length > limit) {
      hasNextPage = true;
      const nextItem = bookmarks.pop(); // remove extra
      nextCursor = nextItem?._id.toString() ?? null;
    }

    return { bookmarks, nextCursor, hasNextPage };
  }
}