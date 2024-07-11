import { Request } from 'express';
import { AnyZodObject } from 'zod';

const validate = (schema: AnyZodObject) => async (req: Request) => {
  try {
    await schema.parseAsync({
      body: req.body,
      query: req.query,
      params: req.params,
    });

    return null;
  } catch (err: any) {
    const errorMap: Object = {};

    err.errors.forEach((error) => {
      errorMap[error.path[1]] = error.message;
    });
    return errorMap;
  }
};

export default validate;
