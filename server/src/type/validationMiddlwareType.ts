import type { Condition } from "../generated/prisma/enums";

export type ResultData = {
  params: Record<string, unknown>;

  query: Record<string, unknown>;

  body: Record<string, unknown>;
};