import type { Request, Response } from "express";

import { AppError } from "../../../../../packages/middlewares/errorMiddleware";
import { modifyItemRecord } from "../../../../../packages/query/modifyItemRecord";
import { getItemByIdRecord } from "../../../../../packages/query/getItemByRecord";
import { getItemsByQueryRecord } from "../../../../../packages/query/getItemsByQueryRecord";
import { deleteItemRecord } from "../../../../../packages/query/deleteItemRecord";
import { createItemRecord } from "../../../../../packages/query/createItemRecord";

export async function createItem(req: Request, res: Response) {
  const userId = req.userId;
  if (!userId) {
    throw new AppError("UserId not found", 401);
  }
  const { name, description } = req.body;
  const item = await createItemRecord(Number(userId), name, description);
  return res.status(201).json({ success: true, item });
}

export async function getItemById(req: Request, res: Response) {
  const itemId = Number(req.params.itemId);
  const item = await getItemByIdRecord(itemId);
  if (!item) {
    throw new AppError("Item not found", 404);
  }
  return res.status(200).json({ success: true, item });
}

export async function getItemsByQuery(req: Request, res: Response) {
  const userId = req.userId;
  if (!userId) {
    throw new AppError("UserId not found", 401);
  }
  const items = await getItemsByQueryRecord(userId, req.query);
  return res.status(200).json({ success: true, items });
}

export async function deleteItem(req: Request, res: Response) {
  const userId = req.userId;
  if (!userId) {
    throw new AppError("UserId not found", 401);
  }
  const itemId = Number(req.params.itemId);
  console.log("itemId :", itemId);
  
  const result = await deleteItemRecord(itemId, Number(userId));
  if (result.count === 0) {
    throw new AppError("Item not found", 404);
  }
  return res
    .status(200)
    .json({ success: true, message: "item deleted successfully" });
}

export async function modifyItem(req: Request, res: Response) {
  const userId = req.userId;
  if (!userId) {
    throw new AppError("UserId not found", 401);
  }
  const itemId = Number(req.params.itemId);
  const item = await modifyItemRecord(itemId, Number(userId), req.body);
  if (!item) {
    throw new AppError("Item not found or you are not the owner", 404);
  }
  return res.status(200).json({ success: true, item });
}
