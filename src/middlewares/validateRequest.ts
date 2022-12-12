import { Request, Response, NextFunction } from "express";
import * as yup from "yup";
const validateRequest = (schema: yup.AnyObjectSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validBody = await schema.validate(req.body);
      req.body = schema.cast(validBody, { stripUnknown: true });
      next();
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  };
};
export default validateRequest;
