// src/services/stats.service.ts
import { getMostStatsRepo } from "../repositiories/stats.repo";

export async function getMostStatsService(userId: string) {
  try {
    // Call repo function
    const result = await getMostStatsRepo(userId);

    return result; // repo already returns { code, status, message, data }
  } catch (error: any) {
    console.error("Error in getMostStatsService:", error);

    return {
      code: 500,
      status: "error",
      message: "Something went wrong while fetching most stats",
      error: error.message || error,
    };
  }
}
