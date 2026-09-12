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

    // if ("params" in result.data) {
    //   req.params = result.data.params as typeof req.params;
    // }

    // if ("body" in result.data) {
    //   req.body = result.data.body as typeof req.body;
    // } else {
    //   req.body = result.data as typeof req.body;
    // }

    // if ("query" in result.data) {
    //   req.query = result.data.query as typeof req.query;
    // }

    next();
  };
};
