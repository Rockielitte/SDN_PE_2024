import express, { Request, Response, NextFunction } from "express";
import { authRouter } from "./auth.route";
import { errorRouter } from "./error.route";
import authentication from "../middlewares/authentication";
import { dashboardRouter } from "./dashboard.route";
import { apiRouter } from "./api.route";
import parseToken from "../middlewares/parseToken";

const router = express.Router();
router.use("/api", apiRouter);
router.use(parseToken);
router.use("/", authRouter);
router.use("/", authentication, dashboardRouter);
router.use("/", errorRouter);
router.use((req: Request, res: Response, next: NextFunction) => {
  return res.render("./error/404");
});

export default router;
