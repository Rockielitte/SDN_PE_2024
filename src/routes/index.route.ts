import express, { Request, Response, NextFunction } from "express";
import { authRouter } from "./auth.route";
import { errorRouter } from "./error.route";
import authentication from "../middlewares/authentication";
import { dashboardRouter } from "./dashboard.route";

const router = express.Router();

router.get("/", authentication, dashboardRouter);
router.use("/", authRouter);
router.use("/", errorRouter);
router.use((req: Request, res: Response, next: NextFunction) => {
  return res.render("./error/404");
});

export default router;
