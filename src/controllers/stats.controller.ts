// src/controllers/stats.controller.ts
import { Request, Response } from "express";
import { getMostStatsService } from "../service/stats.service";

export async function getMostStatsController(req: Request, res: Response) {
  try {
    // ✅ Assuming userId comes from auth middleware (req.user)
    const userId = res.locals.user || req.params.userId;

    if (!userId) {
      return res.status(400).json({
        code: 400,
        status: "error",
        message: "User ID is required",
        data: null,
      });
    }

    // ✅ Call service
    const response = await getMostStatsService(userId);

    // ✅ Send back response
    return res.status(response.code).json(response);
  } catch (error: any) {
    console.error("Error in getMostStatsController:", error);
    return res.status(500).json({
      code: 500,
      status: "error",
      message: "Unexpected error occurred in controller",
      data: null,
    });
  }
}
