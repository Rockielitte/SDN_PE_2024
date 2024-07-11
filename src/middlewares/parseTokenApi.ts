import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt";
import userModel from "../models/user.model";

const parseTokenApi = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bearToken = req.headers.authorization;
    console.log(bearToken);

    if (!bearToken || bearToken.split(" ").length !== 2) {
      return next();
    }
    const accessToken = bearToken.split(" ")[1];
    if (!accessToken) {
      return next();
    }
    const { error, payload } = verifyToken(accessToken);

    if (error) {
      return next();
    }

    if (payload && payload.userId) {
      const user = await userModel.findById(payload.userId);
      res.locals.user = user;
      res.locals.userObject = user.toObject();
    }
    return next();
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      errorMessage: "Internal error.",
    });
  }
};

export default parseTokenApi;
