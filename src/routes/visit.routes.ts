// src/routes/visit.routes.ts
import { Router } from "express";
import { BookmarkVisitController } from "../controllers/visit.controller";

const router = Router();
const bookmarkVisitController = new BookmarkVisitController();

/**
 * 🔹 Routes for visits
 */

// Track a visit (user visits a bookmark)
router.post("/visit/:bookmarkId", (req, res) =>
  bookmarkVisitController.trackVisit(req, res)
);

// Get stats for a specific user + bookmark
// router.get("/:userId/:bookmarkId/stats", (req, res) =>
//   bookmarkVisitController.getVisitStats(req, res)
// );

// // Get all visits (admin/analytics)
// router.get("/", (req, res) =>
//   bookmarkVisitController.getAllVisits(req, res)
// );

export default router;

