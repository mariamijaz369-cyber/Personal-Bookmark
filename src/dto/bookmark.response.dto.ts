// Shape of a single bookmark in the response
// export interface BookmarkResponse {
//   id: string;
//   url: string;
//   title: string;
//   notes?: string;
//   tags?: string[];
//   createdAt: Date;
// }

import { IBookmark } from "../models/bookmark.model";

// // Shape of the whole response
// export interface GetActiveBookmarksResponse {
//   code: number;              // e.g. 200
//   success: boolean;          // true / false
//   message: string;           // "bookmark retrieved successfully"
//   data: [
//    {
//       id: string;
//   url: string;
//   title: string;
//   notes?: string;
//   tags?: string[];
//   createdAt: Date;
// }
// ]
// }
// Single bookmark shape
export interface BookmarkResponse {
  id: string;
  url: string;
  title: string;
  notes?: string;
  tags?: string[];
  createdAt: Date;
}

// Full API response shape
export interface GetActiveBookmarksResponse {
  code: number;       // e.g. 200
  success: boolean;   // true / false
  message: string;    // "bookmark retrieved successfully"
  bookmarks :BookmarkResponse []
}
