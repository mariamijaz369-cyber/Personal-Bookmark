import { Router } from "express";
import { ClickController } from "../controllers/click.controller";
import { isAuthenticated } from "../middlewares/auth.middleware"; // ✅ middleware that sets res.locals.user

const router = Router();
const clickController = new ClickController();

router.post("/click/:bookmarkId", (req, res) =>
  clickController.trackClick(req, res)
);

router.get("/most-clicked", (req, res) =>
  clickController.getMostClickedUrl(req, res)
);
 export default router;