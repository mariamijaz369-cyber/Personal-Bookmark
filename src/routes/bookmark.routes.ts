// import { Router } from "express";
// import {
//   createBookmark,
//   getBookmarks,
//   getBookmarkById,
//   updateBookmark,
//   deleteBookmark,
//   searchBookmarks,
// } from "../controllers/bookmark.controller";
// import { isAuthenticated } from "../middlewares/authenticate.middleware";

// const router = Router();

// /**
//  * @route   POST /api/bookmarks
//  * @desc    Create new bookmark
//  */
// router.post("/", isAuthenticated, createBookmark);

// /**
//  * @route   GET /api/bookmarks
//  * @desc    Get all bookmarks of logged-in user
//  */
// router.get("/", isAuthenticated, getBookmarks);

// /**
//  * @route   GET /api/bookmarks/:id
//  * @desc    Get single bookmark by ID
//  */
// router.get("/:id", isAuthenticated, getBookmarkById);

// /**
//  * @route   PUT /api/bookmarks/:id
//  * @desc    Update bookmark by ID
//  */
// router.put("/:id", isAuthenticated, updateBookmark);

// /**
//  * @route   DELETE /api/bookmarks/:id
//  * @desc    Delete bookmark by ID
//  */
// router.delete("/:id", isAuthenticated, deleteBookmark);

// /**
//  * @route   GET /api/bookmarks/search?q=keyword
//  * @desc    Search or filter bookmarks by tags/notes
//  */
// router.get("/search", isAuthenticated, searchBookmarks);

// export default router;
