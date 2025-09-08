
import { BookmarkController } from "../controllers/bookmark.controller";
import { Bookmark } from "../models/bookmark.model";
import authroutes from "./auth.routes";
import bookmarkroutes from "./bookmark.routes"
const routes = [authroutes,bookmarkroutes];
export default routes;