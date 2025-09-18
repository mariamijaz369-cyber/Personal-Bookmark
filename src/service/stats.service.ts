import { getMostFavoriteUrlsRepo } from "../repositiories/stats.repo";

export async function fetchMostFavoriteUrls(userId: string) {
  try {
    // Call repo function
    const result = await getMostFavoriteUrlsRepo(userId);

    // Pass repo result directly (or transform if needed)
    return {
      code: result.code,
      success: true,
      message: result.message,
      data: result.data,
    };
  } catch (error: any) {
    console.error("Service Error:", error.message);

    return {
      code: 500,
      success: false,
      message: "Unexpected error occurred in service",
      data: null,
    };
  }
}
