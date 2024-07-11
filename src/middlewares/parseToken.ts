import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../utils/jwt';
import userModel from '../models/user.model';

const parseToken = async (req: Request, res: Response, next: NextFunction) => {
  const { accessToken } = req.cookies;
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
};

export default parseToken;
