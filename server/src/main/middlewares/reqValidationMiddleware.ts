import type { NextFunction, Response, Request } from "express";
import { z } from "zod";

export const validate = (schema: z.ZodType) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const result = await schema.safeParseAsync({
      params: req.params,
      body: req.body,
      query: req.query,
    });
    if (!result.success) {
      throw result.error;
    }

    req.body = result.data.body;
    req.params = result.data.params;
    // req.query = result.data.query;
    next();
  };
};
