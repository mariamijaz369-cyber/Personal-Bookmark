"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_routes_1 = __importDefault(require("./auth.routes"));
const bookmark_routes_1 = __importDefault(require("./bookmark.routes"));
const routes = [auth_routes_1.default, bookmark_routes_1.default];
// const bookmark = [Bookmark]
exports.default = routes;
// import authroutes from "./auth.routes";  // ✅ default export from auth.routes
// import { Router } from "express";
// const router = Router();
// router.use("/auth", authroutes);  // ✅ use the auth routes under /auth
// export default router;
// import { Router } from "express";
// // import { BookmarkController } from "../controllers/bookmark.controller";
// const router = Router();
// const bookmarkController = new BookmarkController();
// router.put("/:id", bookmarkController.updateBookmark.bind(bookmarkController));
// export default router;
