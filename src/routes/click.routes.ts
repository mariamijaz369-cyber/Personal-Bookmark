import { Router } from "express";
import { ClickController } from "../controllers/click.controller";
import { isAuthenticated } from "../middlewares/auth.middleware"; // ✅ middleware that sets res.locals.user

const router = Router();
const clickController = new ClickController();

/**
 * 🔹 Track a click for a bookmark (user must be logged in)
 * POST /clicks/:bookmarkId
 */
router.post("/click/:bookmarkId", (req, res, next) =>
  clickController.trackClick(req, res, next)
);

// /**
//  * 🔹 Get click stats for a specific bookmark (for logged-in user)
//  * GET /clicks/:bookmarkId
//  */
// router.get("/:bookmarkId", isAuthenticated, (req, res, next) =>
//   clickController.getClickStats(req, res, next)
// );

// /**
//  * 🔹 Get all click records (admin/analytics)
//  * GET /clicks
//  */
// router.get("/", isAuthenticated, (req, res, next) =>
//   clickController.getAllClicks(req, res, next)
// );
router.get("/most-clicked/:userId", (req, res) =>
  clickController.getMostClickedUrl(req, res)
);
 export default router;
