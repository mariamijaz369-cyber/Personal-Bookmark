// src/routes/visit.routes.ts
import { Router } from "express";
import { BookmarkVisitController } from "../controllers/visit.controller"; 
const router = Router();
const bookmarkVisitController = new BookmarkVisitController();

router.post("/visit/:bookmarkId", (req, res)=>
  bookmarkVisitController.trackVisit(req, res)
);

router.get( "/visits/:bookmarkId", (req, res) =>
 bookmarkVisitController.getMostVisitedUrl(req, res)
);
export default router;

