import express, { Request, Response, NextFunction } from "express";
import { DashboardController } from "../controllers/dashboard.controller";
export const dashboardRouter = express.Router();

dashboardRouter.get("/", DashboardController.dashboardPage);
dashboardRouter.get("/create", DashboardController.addPage);
dashboardRouter.post("/create", DashboardController.add);
dashboardRouter.get("/update/:id", DashboardController.updatePage);
dashboardRouter.put("/update/:id", DashboardController.update);
dashboardRouter.delete("/delete/:id", DashboardController.delete);
