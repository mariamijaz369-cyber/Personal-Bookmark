
// Single bookmark response DTO
export interface BookmarkResponse {
  id: string;
  url: string;
  title: string;
  notes?: string;
  tags?: string[];
  createdAt: Date;
}

// Request DTO for getting active bookmarks (query params)
export interface GetActiveBookmarksRequest {
  searchQuery?: string;
  tags?: string;
  cursor?: string;     // for pagination
  limit?: number;      // number of items per page
  sort?: string;       // e.g., "createdAt:desc"
}

// Response DTO for active bookmarks API
export interface GetActiveBookmarksResponse {
  code: number,
  success: boolean,
  message: string,
  bookmarks: BookmarkResponse[];  // array of bookmarks
  nextCursor: string | null;      // cursor for next page
  hasNextPage: boolean;           // is there more data?
}
