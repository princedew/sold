import { Router } from "express";
import { validate } from "@packages/middlewares/reqValidationMiddleware.js";
import {
  createItemSchema,
  getItemByIdSchema,
  getItemsByQuerySchema,
  modifyItemSchema,
} from "@packages/zodSchema/itemsSchema.js";
import {
  createItem,
  deleteItem,
  getItemById,
  getItemsByQuery,
  modifyItem,
} from "../handlers/itemsHandlers/itemHandlers.js";
import { authMiddleware } from "@packages/middlewares/authMiddleware.js";

const itemsRouter = Router();

itemsRouter.get(
  "/items",
  authMiddleware,
  validate(getItemsByQuerySchema),
  getItemsByQuery,
);
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
