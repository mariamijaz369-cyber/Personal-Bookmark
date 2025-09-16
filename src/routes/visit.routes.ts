import { Router } from "express";
import { BookmarkVisitController } from "../controllers/visit.controller";

const router = Router();
const bookmarkVisitController = new BookmarkVisitController();

// 🔹 Track a visit for a specific bookmark
// POST /api/bookmarks/:bookmarkId/visit
router.post("/:bookmarkId/visit", (req, res, next) =>
  bookmarkVisitController.trackVisit(req, res, next)
);

// // 🔹 Get total visits for a user on a specific bookmark
// // GET /api/bookmarks/:bookmarkId/visit/stats
// router.get("/:bookmarkId/visit/stats", (req, res, next) =>
//   bookmarkVisitController.getVisitStats(req, res, next)
// );

// // 🔹 Get all visits (admin/analytics)
// // GET /api/bookmarks/visits
// router.get("/visits", (req, res, next) =>
//   bookmarkVisitController.getAllVisits(req, res, next)
// );

export default router;
