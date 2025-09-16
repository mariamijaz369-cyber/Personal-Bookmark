import { Router } from "express";
import { ClickController } from "../controllers/click.controller";  // controller file you’ll create

const router = Router();
const clickController = new ClickController();

/**
 * @route POST /click/:bookmarkId
 * @desc Track a click for a specific bookmark
 */
router.post("/click/:bookmarkId", (req, res, next) =>
  clickController.trackClick(req, res, next)
);

// /**
//  * @route GET /click/:bookmarkId
//  * @desc Get total click stats for a bookmark
//  */
// router.get("/:bookmarkId", (req, res, next) =>
//   clickController.getClickStats(req, res, next)
// );

// /**
//  * @route GET /click
//  * @desc Get all click records (admin/reporting)
//  */
// router.get("/", (req, res, next) =>
//   clickController.getAllClicks(req, res, next)
// );

export default router;
