import express, { Request, Response, NextFunction } from "express";
import AuthController from "../controllers/auth.controller";
import parseTokenApi from "../middlewares/parseTokenApi";
import authenticationApi from "../middlewares/authenticationApi";
import { dashboardApiController } from "../controllers/dashboardApi.controller";
export const apiRouter = express.Router();

apiRouter.use(parseTokenApi);
apiRouter.post("/login", AuthController.loginApi);
apiRouter.post("/logout", AuthController.logoutApi);
apiRouter.post("/register", AuthController.registerApi);
//dashboardAPi
apiRouter.use(authenticationApi);
apiRouter.get("/", dashboardApiController.getDashboardApi);
apiRouter.post("/", dashboardApiController.postApi);
apiRouter.put("/:id", dashboardApiController.updateApi);
apiRouter.delete("/:id", dashboardApiController.deleteApi);

apiRouter.use((req: Request, res: Response) => {
  return res.status(404).json({
    errorMessage: "Not found",
  });
});
