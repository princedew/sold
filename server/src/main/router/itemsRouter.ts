import { Router } from "express";
import { validate } from "../middlewares/reqValidationMiddleware";
import {
  createItemSchema,
  getItemByIdSchema,
  getItemsByQuerySchema,
  modifyItemSchema,
} from "../zodSchema/itemsSchema";
import {
  createItem,
  deleteItem,
  getItemById,
  getItemsByQuery,
  modifyItem,
} from "../handlers/itemsHandlers/itemHandlers";
import { authMiddleware } from "../middlewares/authMiddleware";
import { prisma } from "../../lib/prisma";

const itemsRouter = Router();

itemsRouter.get("/items", authMiddleware, validate(getItemsByQuerySchema), getItemsByQuery);
itemsRouter.get("/items/:itemId", validate(getItemByIdSchema), getItemById);
itemsRouter.post(
  "/items",
  authMiddleware,
  validate(createItemSchema),
  createItem,
);
itemsRouter.patch(
  "/items/:itemId",
  authMiddleware,
  validate(modifyItemSchema),
  modifyItem,
);
itemsRouter.delete(
  "/items/:itemId",
  authMiddleware,
  validate(getItemByIdSchema),
  deleteItem,
);


export default itemsRouter;
