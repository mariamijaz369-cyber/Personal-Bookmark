import { Router } from "express";
import { getMostStatsController } from "../controllers/stats.controller";

const router = Router();

// ✅ Route: GET /stats/:userId
router.get("/stats-user", getMostStatsController);

export default router;
