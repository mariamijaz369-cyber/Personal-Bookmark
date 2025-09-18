
import { BookmarkController } from "../controllers/bookmark.controller";
import { Bookmark } from "../models/bookmark.model";
import authroutes from "./auth.routes";
import Clickroutes from"./click.routes";
import visitroutes from "./visit.routes";
import bookmarkroutes from "./bookmark.routes";
import statsroutes from "./stats.routes";
const routes = [authroutes,bookmarkroutes,Clickroutes,visitroutes,statsroutes];
export default routes;