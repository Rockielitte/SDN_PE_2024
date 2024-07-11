import express, { Request, Response, NextFunction } from "express";
import { sectionModel } from "../models/section.model";
import { courseModel } from "../models/course.model";
export class DashboardController {
  static async dashboardPage(req: Request, res: Response, next: NextFunction) {
    try {
      const list = await sectionModel.find({}).populate("course").lean();
      const subList = await courseModel.find({}).lean();
      return res.render("./dashboard", {
        errorMessage: "",
        list: list,
        subList: subList,
      });
    } catch (error) {
      console.log(error);

      return res.render("./dashboard", {
        errorMessage: error.message,
        lists: [],
      });
    }
  }
  static async addPage(req: Request, res: Response, next: NextFunction) {
    console.log("dsfdasds");

    return res.render("./new");
  }
}
