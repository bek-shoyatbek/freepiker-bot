import mongoose, { Document, Schema } from 'mongoose';

export interface IMessageDeliveryStatus {
    messageId: string;
    userId: string;
    status: 'success' | 'failed';
    error?: string;
    timestamp: Date;
}

const MessageDeliveryStatusSchema = new Schema({
    messageId: {
        type: Schema.Types.ObjectId,
        ref: 'Message',
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['success', 'failed'],
        required: true,
    },
    error: {
        type: String,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    }
});

// Create compound index for faster queries
MessageDeliveryStatusSchema.index({ messageId: 1, userId: 1 });
MessageDeliveryStatusSchema.index({ status: 1 });
MessageDeliveryStatusSchema.index({ timestamp: 1 });

export const MessageDeliveryStatus = mongoose.model<IMessageDeliveryStatus>('MessageDeliveryStatus', MessageDeliveryStatusSchema);
