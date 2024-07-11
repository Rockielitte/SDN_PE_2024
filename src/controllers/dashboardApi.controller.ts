import { NextFunction, Request, Response } from "express";

import validate from "../validate/validate";
import { subItemSchema } from "../validate/subItem.validate";
import { isValidId } from "../utils";
import { subItemModel } from "../models/subItem.model";
import { itemModel } from "../models/item.model";

export class dashboardApiController {
  static async getDashboardApi(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const subList = await subItemModel.find({}).lean();
      return res.status(200).json({
        message: "Get list successfully",
        data: subList,
      });
    } catch (error) {
      return res.status(500).json({
        errorMessage: error.message,
      });
    }
  }

  static async postApi(req: Request, res: Response, next: NextFunction) {
    try {
      const errorMap = await validate(subItemSchema)(req);
      if (errorMap) {
        return res.status(400).json({
          errorMessage: "failed to validate.",
          error: errorMap,
        });
      }
      const { courseName, courseDescription } = req.body;
      const subItem = new subItemModel({
        courseName,
        courseDescription,
      });
      await subItem.save();
      return res.status(201).json({
        message: "Create subItem successfully",
        data: subItem,
      });
    } catch (error) {
      return res.status(500).json({
        errorMessage: error.message,
      });
    }
  }

  static async updateApi(req: Request, res: Response, next: NextFunction) {
    try {
      const isValid = isValidId(req.params.id);
      if (!isValid)
        return res.status(404).json({
          errorMessage: "Item not found!",
        });

      const errorMap = await validate(subItemSchema)(req);
      if (errorMap) {
        return res.status(400).json({
          errorMessage: "failed to validate.",
          error: errorMap,
        });
      }
      const { courseName, courseDescription } = req.body;
      const { id } = req.params;

      const subItem = await subItemModel.findById(id);
      if (!subItem) {
        return res.status(400).json({
          errorMessage: "Course not found",
        });
      }
      subItem.courseName = courseName;
      subItem.courseDescription = courseDescription;
      await subItem.save();
      return res.status(200).json({
        message: "Update subItem successfully",
        data: subItem,
      });
    } catch (error) {
      return res.status(500).json({
        errorMessage: error.message,
      });
    }
  }
  static async deleteApi(req: Request, res: Response, next: NextFunction) {
    try {
      const isValid = isValidId(req.params.id);
      if (!isValid)
        return res.status(404).json({
          errorMessage: "Item not found!",
        });
      const { id } = req.params;
      const subItem = await subItemModel.findById(id);
      if (!subItem) {
        return res.status(400).json({
          errorMessage: "Course not found",
        });
      }
      const list = await itemModel
        .find({
          course: req.params.id,
        })
        .lean();

      if (list.length) {
        return res.status(400).json({
          errorMessage:
            "Cannot delete because of containning related item - " +
            list[0].sectionName,
        });
      }
      await subItem.deleteOne();
      return res.status(200).json({
        message: "Delete subItem successfully",
      });
    } catch (error) {
      return res.status(500).json({
        errorMessage: error.message,
      });
    }
  }
}
