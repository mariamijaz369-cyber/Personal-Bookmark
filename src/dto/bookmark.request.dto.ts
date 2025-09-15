import Joi from "joi";

// 🔹 Request DTO (what client sends)
export interface GetActiveBookmarksRequest {
  searchQuery?: string;
  tags?: string;         // comma-separated tags if multiple
  cursor?: string;       // last bookmark ID (for cursor pagination)
  limit?: number;        // how many to fetch (default = 10)
}

// 🔹 Response DTO (what API sends back)
export interface BookmarkResponse {
  id: string;
  url: string;
  title: string;
  notes?: string;
  tags: string[];
  createdAt: Date;
}

export interface GetActiveBookmarksResponse {
  code: number;
  success: boolean;
  message: string;
  bookmarks: BookmarkResponse[];
  nextCursor: string | null;  // to know if there's more data
  hasNextPage: boolean;       // true if more bookmarks exist
}

// 🔹 Joi validation schema for request
export const GetActiveBookmarksSchema = Joi.object({
  searchQuery: Joi.string().optional().allow(""),
  tags: Joi.string().optional().allow(""), 
  cursor: Joi.string().optional().allow(""),
  limit: Joi.number().integer().min(1).max(100).default(10),
});
