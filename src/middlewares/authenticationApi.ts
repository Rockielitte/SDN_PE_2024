import { NextFunction, Request, Response } from "express";

const authenticationApi = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(res.locals.user);

  if (!res.locals.user) {
    return res.status(401).json({
      errorMessage: "Unauthorization error, please login.",
    });
  }
  next();
};

export default authenticationApi;
