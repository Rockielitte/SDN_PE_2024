import express, { Request, Response, NextFunction } from "express";
import { sectionModel } from "../models/section.model";
import { courseModel } from "../models/course.model";
import validate from "../validate/validate";
import { itemValidate } from "../validate/item.validate";
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
    const subList = await courseModel.find({}).lean();
    return res.render("./new", {
      subList: subList,
    });
  }
  static async add(req: Request, res: Response, next: NextFunction) {
    console.log(req.body);

    try {
      const subList = await courseModel.find({}).lean();
      const errorMap = await validate(itemValidate)(req);
      if (errorMap) {
        return res.render("./new", {
          validationError: errorMap,
          ...req.body,
          subList: subList,
        });
      }
      const item = await sectionModel.create({
        ...req.body,
        isMainTask: req.body.isMainTask ? true : false,
      });
      return res.redirect("/");
    } catch (error) {
      console.log(error);
      return res.render("./new", {
        errorMessage: error.message,
      });
    }
  }
  static async updatePage(req: Request, res: Response, next: NextFunction) {
    try {
      const subList = await courseModel.find({}).lean();
      const item = await sectionModel
        .findById(req.params.id)
        .populate("course")
        .lean();
      console.log(item, "dsaf");

      if (!item) {
        return res.render("./dashboard", {
          errorMessage: "Item not found!",
        });
      }
      return res.render("./new", {
        ...item,
        course: item.course._id.toString(),
        subList: subList,
        isEdit: true,
      });
    } catch (error) {
      console.log(error);
      return res.render("./dashboard", {
        errorMessage: error.message,
      });
    }
  }
  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(req.body, "dsaf");

      const subList = await courseModel.find({}).lean();
      const errorMap = await validate(itemValidate)(req);
      if (errorMap) {
        return res.render("./new", {
          validationError: errorMap,
          ...req.body,
          _id: req.params.id,
          subList: subList,
          isEdit: true,
        });
      }
      const item = await sectionModel.findById(req.params.id);
      if (!item) {
        return res.render("./dashboard", {
          errorMessage: "Item not found!",
        });
      }
      await item.updateOne({
        ...req.body,
        isMainTask: req.body.isMainTask ? true : false,
      });
      return res.redirect("/");
    } catch (error) {
      console.log(error);
      return res.render("./dashboard", {
        errorMessage: error.message,
      });
    }
  }
  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const item = await sectionModel.findById(req.params.id);
      if (!item) {
        return res.render("./dashboard", {
          errorMessage: "Item not found!",
        });
      }
      await item.deleteOne();
      return res.redirect("/");
    } catch (error) {
      console.log(error);
      return res.render("./dashboard", {
        errorMessage: error.message,
      });
    }
  }
}
