import bot from "../../../bot";
import { NotifyMe } from "../../../bot/api/notifications/notify-me";
import { IMessage, Message } from "../../../models/message.model";

export class MessageService {
  static async sendMessage(userTelegramIds: string[], messageId: string) {
    try {
      const message = await MessageService.getMessageById(messageId);
      const chunkSize = 30; // Maximum number of messages per second
      const delay = 1000 * 60; // 1 min delay between chunks

      for (let i = 0; i < userTelegramIds.length; i += chunkSize) {
        const chunk = userTelegramIds.slice(i, i + chunkSize);
        const promises = chunk.map((userId) =>
          bot.api.sendMessage(userId, message!.text),
        );

        await Promise.all(promises);

        if (i + chunkSize < userTelegramIds.length) {
          await new Promise((resolve) => setTimeout(resolve, delay));
        }
      }

      await NotifyMe.sendMessage("All messages sent successfully");
    } catch (err) {
      console.error("Error sending messages:", err);
    }
  }

  static async getMessageById(messageId: string) {
    return await Message.findById(messageId);
  }

  static async getAll() {
    try {
      const messages = await Message.find();
      return messages;
    } catch (err) {
      console.error(err);
      throw new Error();
    }
  }

  static async create(message: IMessage) {
    try {
      const messages = await Message.create(message);
      return messages;
    } catch (err) {
      console.error(err);
      throw new Error();
    }
  }

  static async updateById(messageId: string, message: Partial<IMessage>) {
    try {
      const oldMessage = await Message.findOne({ _id: messageId });

      if (!oldMessage) {
        throw new Error("Message with id not found");
      }
      console.log("message", message);

      const messages = await Message.updateOne(
        { _id: messageId },
        {
          title: message?.title || oldMessage.title,
          text: message?.text || oldMessage.text,
        },
      );

      return "Message updated";
    } catch (err) {
      console.error(err);
      throw new Error();
    }
  }

  static async deleteById(messageId: string) {
    try {
      const message = await Message.deleteOne({ _id: messageId });

      if (!message) {
        throw new Error("Message with id not found");
      }
      return message;
    } catch (err) {
      console.error(err);
      throw new Error();
    }
  }
}
