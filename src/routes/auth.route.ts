import express, { Request, Response, NextFunction } from "express";
import AuthController from "../controllers/auth.controller";
import { DashboardController } from "../controllers/dashboard.controller";
import authentication from "../middlewares/authentication";

export const authRouter = express.Router();

authRouter.get("/login", AuthController.loginPage);
authRouter.get("/logout", AuthController.logout);
authRouter.post("/login", AuthController.login);
authRouter.get("/register", AuthController.registerPage);
authRouter.post("/register", AuthController.register);
authRouter.use(authentication);
authRouter.get("/create", DashboardController.addPage);
authRouter.post("/create", DashboardController.add);
authRouter.get("/update/:id", DashboardController.updatePage);
authRouter.put("/update/:id", DashboardController.update);
authRouter.delete("/delete/:id", DashboardController.delete);
