import express, { Request, Response, NextFunction } from "express";

import validate from "../validate/validate";
import { itemValidate } from "../validate/item.validate";
import { isValid } from "zod";
import { isValidId } from "../utils";
import { itemModel } from "../models/item.model";
import { subItemModel } from "../models/subItem.model";
export class DashboardController {
  static async dashboardPage(req: Request, res: Response, next: NextFunction) {
    try {
      const list = await itemModel.find({}).populate("course").lean();
      const subList = await subItemModel.find({}).lean();
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
    const subList = await subItemModel.find({}).lean();
    return res.render("./new", {
      subList: subList,
    });
  }
  static async add(req: Request, res: Response, next: NextFunction) {
    console.log(req.body);

    try {
      const subList = await subItemModel.find({}).lean();
      const errorMap = await validate(itemValidate)(req);
      if (errorMap) {
        return res.render("./new", {
          validationError: errorMap,
          ...req.body,
          subList: subList,
        });
      }
      const item = await itemModel.create({
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
      const isValid = isValidId(req.params.id);
      if (!isValid)
        return res.render("./new", {
          errorMessage: "Item not found!",
        });
      const subList = await subItemModel.find({}).lean();
      const item = await itemModel
        .findById(req.params.id)
        .populate("course")
        .lean();

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
      if (!isValid)
        return res.render("./new", {
          errorMessage: "Item not found!",
        });

      const subList = await subItemModel.find({}).lean();
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
      const item = await itemModel.findById(req.params.id);
      if (!item) {
        return res.render("./new", {
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
      if (!isValid)
        return res.render("./404", {
          errorMessage: "Item not found!",
        });

      const item = await itemModel.findById(req.params.id);
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
