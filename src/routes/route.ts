// import authroutes from "./auth.routes"
// import { Router } from "express";
// const router = Router();
// export default routes;

import authroutes from "./auth.routes";
const routes = [authroutes];
export default routes;

// import authroutes from "./auth.routes";  // ✅ default export from auth.routes
// import { Router } from "express";

// const router = Router();
// router.use("/auth", authroutes);  // ✅ use the auth routes under /auth

// export default router;
