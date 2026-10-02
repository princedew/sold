import type { NextFunction, Response, Request } from "express";
import { z } from "zod";


type Key = "body" | "query" | "params";
type SchemaObjectType = Record<Key, z.ZodType>;
type Issue = Record<Key, z.core.$ZodIssue[]>;

export const validate = (schemaObj: Partial<SchemaObjectType>) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const issues: Partial<Issue> = {};

    for (const [key, schema] of Object.entries(schemaObj) as [
      Key,
      z.ZodType,
    ][]) {
      const result = await schema.safeParseAsync(req[key]);
      if (!result.success) {
        issues[key] = result.error.issues;
      } else {
        if (key !== "query") {
          req[key] = result.data;
        }
      }
    }
    if (Object.keys(issues).length !== 0) {
      next();
    } else {
      res
        .status(400)
        .json({ success: "false", message: "Validation Failed", issues });
    }
  };
};
