import { Request, Response } from "express";
import { BookmarkVisitService } from "../service/visit.service";
 import { BookmarkVisitRepository } from "../repositiories/visit.repo"; 
//  import { Request, Response } from "express-serve-static-core";
import { ParsedQs } from "qs";
// import { Request, Response } from "express-serve-static-core";
 const visitRepository = new BookmarkVisitRepository(); // ✅ correct instance
interface FetchResult {
  code: number;
  success: boolean;
  message: string;
  data: any;
}
// export class BookmarkVisitController {
//     getMostVisitedUrl(req: Request<{}, any, any, ParsedQs, Record<string, any>>, res: Response): unknown {
//      throw new Error("Method not implemented.");
//   }
// export class BookmarkVisitController {
//   private clickService: ClickService;
//   clickRepository: any;
//   visitRepository: any;

//   private visitService: BookmarkVisitService;
//   visitRepository: any;

//   constructor() {
//     this.visitService = new BookmarkVisitService();
//   }
// export class BookmarkVisitController {
//   getMostVisitedUrl(req: Request<{}, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>, number>): unknown {
//     throw new Error("Method not implemented.");
//   }
//   private visitService: BookmarkVisitService;
//   visitRepository: any; // optional placeholder like you did in ClickController

//   constructor() {
//     this.visitService = new BookmarkVisitService();
//   }
export class BookmarkVisitController{
  private visitService: BookmarkVisitService;
  visitRepository: any; // optional placeholder like you did in ClickController

  constructor() {
    this.visitService = new BookmarkVisitService();
  }
  
  //  * 🔹 Track a visit (POST /visits/:bookmarkId)
  
  async trackVisit(req: Request, res: Response): Promise<void> {
    try {
      const userId =res.locals.user;// ✅ Extract userId from token/middleware
      const { bookmarkId } = req.params;


      const visit = await this.visitService.trackVisit(userId, bookmarkId);

      res.status(200).json({
        success: true,
        message: "Visit tracked successfully",
        data: visit,
      });
    } catch (error: any) {
      res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || "Something went wrong",
      });
    }
  }

 async getMostVisitedUrl(req: Request, res: Response): Promise<void> {
  try {
         const userId = res.locals.user;

    const mostVisited = await this.visitService.getMostVisitedUrl(userId);

    if (!mostVisited) {
      res.status(404).json({ success: false, message: "No visits found" });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Most visited bookmark fetched successfully",
      data: mostVisited,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
}

  //  * 🔹 Fetch most favorite URLs (most clicked, most visited, most favorite)
  //  * GET /visits/favorites
   
  async fetchMostFavoriteUrls(req: Request, res: Response): Promise<void> {
  try {
    const userId = res.locals.user;

    if (!userId) {
      res.status(401).json({ success: false, message: "Unauthorized: userId not found", data: null });
      return;
    }

    // ✅ cast the result to FetchResult
    const result: FetchResult = await this.visitService.fetchMostFavoriteUrls(userId);

    res.status(result.code).json(result);
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || "Internal server error", data: null });
  }
}
}

function next(error: any) {
  throw new Error("Function not implemented.");
}