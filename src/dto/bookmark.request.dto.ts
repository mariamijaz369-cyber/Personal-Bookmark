import Joi from "joi";

export interface GetActiveBookmarksRequest {
  page(userId: string, searchQuery: string | undefined, tags: string | undefined, page: any, limit: number | undefined): unknown; 
  searchQuery?: string;
  tags?: string;   // still string (comma-separated if you want multiple)
  cursor?: string; // ✅ last bookmark ID or createdAt for pagination
  limit?: number;  // ✅ how many items to fetch after cursor, default = 10
}

export const GetActiveBookmarksSchema = Joi.object({
  searchQuery: Joi.string().optional().allow(""),
  tags: Joi.string().optional().allow(""), // e.g. "work,study"

  // ✅ cursor pagination
  cursor: Joi.string().optional().allow(""), 
  limit: Joi.number().integer().min(1).max(100).default(10),
});
