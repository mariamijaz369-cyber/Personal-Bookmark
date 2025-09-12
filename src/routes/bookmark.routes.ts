import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { isAuthenticated } from "../middlewares/auth.middleware";
import { BookmarkController } from "../controllers/bookmark.controller";
import express from "express";

 const router = Router();
// ✅ create an object
const bookmarkController = new BookmarkController();

// ✅ updatebookmark
router.put(
  "/bookmark/:id",
  bookmarkController.updateBookmark.bind(bookmarkController)
);
// create bookmark
 router.post("/bookmark",bookmarkController.createBookmark.bind(bookmarkController));
 export default router;
// delete
router.delete(
  "/deletebookmark/:id",
   router.delete("/deletebookmark/:id",bookmarkController.deleteBookmark)
);
// get api
router.get("/getbookmarks",bookmarkController.getActiveBookmarks.bind(bookmarkController));