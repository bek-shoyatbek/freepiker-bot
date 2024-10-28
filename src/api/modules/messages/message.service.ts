import { chunk } from 'lodash';
import { IMessageDeliveryStatus, MessageDeliveryStatus } from '../../../models/message-delivery-status.model';
import bot from '../../../bot';
import { NotifyMe } from '../../../bot/api/notifications/notify-me';
import { IMessage, Message } from '../../../models/message.model';
import mongoose from 'mongoose';

interface IMessageDeliverySummary {
  messageId: string;
  totalAttempted: number;
  successCount: number;
  failedCount: number;
  failedUserIds: string[];
  deliveryRate: number;
  errors: { [key: string]: number };
}

export class MessageService {
  private static readonly CHUNK_SIZE = 30;
  private static readonly DELAY_BETWEEN_CHUNKS = 60000; // 1 minute in milliseconds

  private static async trackDelivery(delivery: Omit<IMessageDeliveryStatus, 'timestamp'>) {
    try {
      await MessageDeliveryStatus.create({
        ...delivery,
        timestamp: new Date()
      });
    } catch (err) {
      console.error('Error tracking message delivery:', err);
      // Continue execution even if tracking fails
    }
  }

  private static async createDeliverySummary(
    messageId: string,
    successes: string[],
    failures: { userId: string; error: string }[]
  ): Promise<IMessageDeliverySummary> {
    const totalAttempted = successes.length + failures.length;
    const errorCounts = failures.reduce((acc, { error }) => {
      acc[error] = (acc[error] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });

    return {
      messageId,
      totalAttempted,
      successCount: successes.length,
      failedCount: failures.length,
      failedUserIds: failures.map(f => f.userId),
      deliveryRate: totalAttempted > 0 ? (successes.length / totalAttempted) * 100 : 0,
      errors: errorCounts
    };
  }

  static async sendMessage(userTelegramIds: string[], messageId: string) {
    try {
      const message = await MessageService.getMessageById(messageId);
      if (!message) {
        throw new Error(`Message with ID ${messageId} not found`);
      }

      const successfulDeliveries: string[] = [];
      const failedDeliveries: { userId: string; error: string }[] = [];
      const userChunks = chunk(userTelegramIds, this.CHUNK_SIZE);

      for (const [index, currentChunk] of userChunks.entries()) {
        const deliveryPromises = currentChunk.map(async (userId: string) => {
          try {
            await bot.api.sendMessage(userId, message.text);

            await this.trackDelivery({
              messageId: messageId,
              userId: userId,
              status: 'success'
            });

            successfulDeliveries.push(userId);
          } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';

            await this.trackDelivery({
              messageId,
              userId,
              status: 'failed',
              error: errorMessage
            });

            failedDeliveries.push({ userId, error: errorMessage });
          }
        });

        await Promise.all(deliveryPromises);

        // Add delay if there are more chunks to process
        if (index < userChunks.length - 1) {
          await new Promise(resolve => setTimeout(resolve, this.DELAY_BETWEEN_CHUNKS));
        }
      }

      const summary = await this.createDeliverySummary(
        messageId,
        successfulDeliveries,
        failedDeliveries
      );

      await NotifyMe.sendMessage(
        `Message Delivery Summary:\n` +
        `Total Attempted: ${summary.totalAttempted}\n` +
        `Successful: ${summary.successCount}\n` +
        `Failed: ${summary.failedCount}\n` +
        `Delivery Rate: ${summary.deliveryRate.toFixed(2)}%\n\n` +
        `Error Breakdown:\n${Object.entries(summary.errors)
          .map(([error, count]) => `${error}: ${count}`)
          .join('\n')}`
      );

      return summary;
    } catch (err) {
      console.error("Error sending messages:", err);
      throw err;
    }
  }

  static async getMessageDeliveryStatus(messageId: string): Promise<IMessageDeliverySummary> {
    try {
      const deliveries = await MessageDeliveryStatus.find({ messageId });
      const successes = deliveries
        .filter(d => d.status === 'success')
        .map(d => d.userId);
      const failures = deliveries
        .filter(d => d.status === 'failed')
        .map(d => ({ userId: d.userId, error: d.error || 'Unknown error' }));

      return this.createDeliverySummary(messageId, successes, failures);
    } catch (err) {
      console.error("Error getting message delivery status:", err);
      throw err;
    }
  }

  static async getMessageById(messageId: string) {
    try {
      const message = await Message.findById(messageId);
      if (!message) {
        throw new Error(`Message with ID ${messageId} not found`);
      }
      return message;
    } catch (err) {
      console.error("Error fetching message:", err);
      throw err;
    }
  }

  static async getAll() {
    try {
      return await Message.find().sort({ createdAt: -1 });
    } catch (err) {
      console.error("Error fetching messages:", err);
      throw err;
    }
  }

  static async create(message: Partial<IMessage>) {
    try {
      const newMessage = await Message.create(message);
      return newMessage;
    } catch (err) {
      console.error("Error creating message:", err);
      throw err;
    }
  }

  static async updateById(messageId: string, message: Partial<IMessage>) {
    try {
      const oldMessage = await Message.findById(messageId);
      if (!oldMessage) {
        throw new Error(`Message with ID ${messageId} not found`);
      }

      const updatedMessage = await Message.findByIdAndUpdate(
        messageId,
        {
          title: message.title || oldMessage.title,
          text: message.text || oldMessage.text,
        },
        { new: true }
      );

      return updatedMessage;
    } catch (err) {
      console.error("Error updating message:", err);
      throw err;
    }
  }

  static async deleteById(messageId: string) {
    try {
      const result = await Message.findByIdAndDelete(messageId);
      if (!result) {
        throw new Error(`Message with ID ${messageId} not found`);
      }

      // Clean up associated delivery statuses
      await MessageDeliveryStatus.deleteMany({ messageId });

      return result;
    } catch (err) {
      console.error("Error deleting message:", err);
      throw err;
    }
  }

  static async getDeliveryAnalytics(messageId: string) {
    try {
      const deliveries = await MessageDeliveryStatus.find({ messageId });

      const totalAttempts = deliveries.length;
      const successfulDeliveries = deliveries.filter(d => d.status === 'success').length;
      const failedDeliveries = deliveries.filter(d => d.status === 'failed').length;

      const errorBreakdown = await MessageDeliveryStatus.aggregate([
        { $match: { messageId: new mongoose.Types.ObjectId(messageId), status: 'failed' } },
        { $group: { _id: '$error', count: { $sum: 1 } } }
      ]);

      const deliveryTimes = await MessageDeliveryStatus.aggregate([
        { $match: { messageId: new mongoose.Types.ObjectId(messageId) } },
        {
          $group: {
            _id: { $hour: '$timestamp' },
            count: { $sum: 1 }
          }
        },
        { $sort: { '_id': 1 } }
      ]);

      return {
        totalAttempts,
        successfulDeliveries,
        failedDeliveries,
        deliveryRate: (successfulDeliveries / totalAttempts) * 100,
        errorBreakdown: errorBreakdown.map(e => ({
          error: e._id,
          count: e.count
        })),
        deliveryTimeDistribution: deliveryTimes.map(t => ({
          hour: t._id,
          count: t.count
        }))
      };
    } catch (err) {
      console.error("Error getting delivery analytics:", err);
      throw err;
    }
  }
}