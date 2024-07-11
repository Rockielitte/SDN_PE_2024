import { NextFunction, Request, Response } from "express";

const authentication = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!res.locals.user) {
    return res.redirect("/login");
  }
  next();
};

export default authentication;
