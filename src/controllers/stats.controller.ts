import { Request, Response } from "express";
import { fetchMostFavoriteUrls } from "../service/stats.service";

export async function getMostFavoriteUrlsController(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const userId = res.locals.userId;

    if (!userId) {
      return res.status(400).json({
        code: 400,
        success: false,
        message: "User ID is required",
      });
    }

    // Call service function
    const response = await fetchMostFavoriteUrls(userId);

    return res.status(response.code).json(response);
  } catch (error: any) {
    console.error("Controller Error:", error.message);

    return res.status(500).json({
      code: 500,
      success: false,
      message: "Unexpected error occurred in controller",
    });
  }
}
