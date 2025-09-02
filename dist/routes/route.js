"use strict";
// import authroutes from "./auth.routes"
// import { Router } from "express";
// const router = Router();
// export default routes;
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_routes_1 = __importDefault(require("./auth.routes"));
const routes = [auth_routes_1.default];
exports.default = routes;
// import authroutes from "./auth.routes";  // ✅ default export from auth.routes
// import { Router } from "express";
// const router = Router();
// router.use("/auth", authroutes);  // ✅ use the auth routes under /auth
// export default router;
