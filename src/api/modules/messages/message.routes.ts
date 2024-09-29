import { RequestHandler, Router } from "express";
import { MessageController } from "./message.controller";

export const MessageRouter = Router();

MessageRouter.post(
  "/sendMessage",
  MessageController.sendMessage as unknown as RequestHandler,
);

MessageRouter.get(
  "/",
  MessageController.getAllMessages as unknown as RequestHandler,
);

MessageRouter.post(
  "/",
  MessageController.createMessage as unknown as RequestHandler,
);

MessageRouter.put(
  "/:messageId",
  MessageController.updateByMessageById as unknown as RequestHandler,
);

MessageRouter.delete(
  "/:messageId",
  MessageController.deleteMessageById as unknown as RequestHandler,
);
