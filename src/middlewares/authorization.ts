import { Request, Response, NextFunction } from 'express';

export const authorization = (roles: boolean[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!res.locals.user) {
      return res.render('./401');
    }
    if (!roles.includes(res.locals.user.role)) {
      return res.render('./404');
    }
    next();
  };
};
