import express, { Request, Response, NextFunction } from "express";
import { DashboardController } from "../controllers/dashboard.controller";
export const dashboardRouter = express.Router();

dashboardRouter.get("/", DashboardController.dashboardPage);
// dashboardRouter.get("/create", DashboardController.addPage);
