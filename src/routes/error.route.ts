import express, { Request, Response, NextFunction } from 'express';

export const errorRouter = express.Router();

errorRouter.get('/404', (req,res,next) => {
  res.render('./404')
});
