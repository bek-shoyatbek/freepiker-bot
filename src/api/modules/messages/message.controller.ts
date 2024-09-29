import { Request, Response } from "express";
import { MessageService } from "./message.service";

export class MessageController {
  static async sendMessage(req: Request, res: Response) {
    const userIds = req.body?.userIds;
    const messageId = req.body?.messageId;

    if (!userIds || !messageId) {
      return res.status(400).json({
        message: "User ids or messageId is invalid!",
        data: [],
      });
    }

    const result = await MessageService.sendMessage(userIds, messageId);

    return res.status(200).json({
      message: "Messages fetched successfully",
      data: result,
    });
  }

  static async getAllMessages(req: Request, res: Response) {
    const messages = await MessageService.getAll();

    if (!messages) {
      return res.status(400).json({
        message: "Messages not found",
        data: [],
      });
    }

    return res.status(200).json({
      message: "Messages fetched successfully",
      data: messages,
    });
  }

  static async createMessage(req: Request, res: Response) {
    const reqBody = req.body;

    const newMessage = await MessageService.create(reqBody);

    if (!newMessage) {
      return res.status(400).json({
        message: "Messages not created",
        data: [],
      });
    }

    return res.status(201).json({
      message: "Messages created",
      data: newMessage,
    });
  }

  static async updateByMessageById(req: Request, res: Response) {
    const messageId = req.params["messageId"];
    const reqBody = req.body;

    const updatedResult = await MessageService.updateById(messageId, reqBody);

    if (!updatedResult) {
      return res.status(500).json({
        message: "Couldn't update message by Id",
        data: [],
      });
    }

    return res.status(200).json({
      message: "Messages updated",
      data: updatedResult,
    });
  }

  static async deleteMessageById(req: Request, res: Response) {
    const messageId = req.params["messageId"];

    const deleteResult = await MessageService.deleteById(messageId);

    if (!deleteResult) {
      return res.status(400).json({
        message: "Messages not deleted",
        data: [],
      });
    }

    return res.status(200).json({
      message: "Messages deleted",
      data: deleteResult,
    });
  }
}
