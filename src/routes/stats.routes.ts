import { Router } from "express";
import { getMostFavoriteUrlsController } from "../controllers/stats.controller";

const router = Router();

// ✅ Route: GET /stats/:userId
router.get("/stats/:userId", getMostFavoriteUrlsController);

export default router;
