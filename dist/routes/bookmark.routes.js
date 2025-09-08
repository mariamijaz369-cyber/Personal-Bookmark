"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bookmark_controller_1 = require("../controllers/bookmark.controller");
const bookmark_controller_2 = require("../controllers/bookmark.controller");
const router = (0, express_1.Router)();
// ✅ create an object
const bookmarkController = new bookmark_controller_1.BookmarkController();
// ✅ use its method
router.put("/bookmark/:id", bookmarkController.updateBookmark.bind(bookmarkController));
//  export default Bookmarkrouter;
// your routes...
// import {
//   createBookmark,
// //   getBookmarks,
// //   getBookmarkById,
//   updateBookmark,
// //   deleteBookmark,
//  }
//  from "../controllers/bookmark.controller";
// // import { isAuthenticated } from "../middlewares/authenticate.middleware";
// const Bookmarkrouter = Router();
// // /**
// //  * @route   POST /api/bookmarks
// //  * @desc    Create new bookmark
// //  */
router.post("/bookmark", bookmarkController.createBookmark.bind(bookmarkController));
exports.default = router;
// // /**
// //  * @route   GET /api/bookmarks
// //  * @desc    Get all bookmarks of logged-in user
// //  */
// // router.get("/", isAuthenticated, getBookmarks);
// // /**
// //  * @route   GET /api/bookmarks/:id
// //  * @desc    Get single bookmark by ID
// //  */
// // router.get("/:id", isAuthenticated, getBookmarkById);
// // /**
// //  * @route   PUT /api/bookmarks/:id
// //  * @desc    Update bookmark by ID
// //  */
//  router.put("/:id", isAuthenticated, updateBookmark);
//  Bookmarkrouter.put("/bookmark",bookmarkController.updateBookmark.bind(bookmarkController));
//  router.put("/:id", bookmarkController.updateBookmark.bind(bookmarkController));
//  export default router;
// export default Bookmarkrouter;
// // /**
// //  * @route   DELETE /api/bookmarks/:id
// //  * @desc    Delete bookmark by ID
// //  */
router.delete("/deletebookmark/:id", router.delete("/deletebookmark/:id", bookmark_controller_2.deleteBookmark)
// bookmarkController.deleteBookmark.bind(bookmarkController)
);
//  router.delete("/:id", deleteBookmark);
// // /**
// //  * @route   GET /api/bookmarks/search?q=keyword
// //  * @desc    Search or filter bookmarks by tags/notes
// //  */
// // router.get("/search", isAuthenticated, searchBookmarks);
//  export default router;
