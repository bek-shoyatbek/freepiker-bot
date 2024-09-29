import { IMessage, Message } from "../../../models/message.model";

export class MessageService {
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

      const messages = await Message.updateOne(
        { _id: messageId },
        {
          ...oldMessage,
          ...message,
        },
      );

      return messages;
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
