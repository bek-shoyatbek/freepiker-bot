import mongoose, { Document, Schema } from "mongoose";

export interface IPayment extends Document {
  userId: mongoose.Types.ObjectId;
  planId: mongoose.Types.ObjectId;
  amount: number;
  status: "pending" | "approved" | "rejected";
  chequeImage: string;
}

const PaymentSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  planId: { type: Schema.Types.ObjectId, ref: "Plan", required: true },
  amount: { type: Number, required: true },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  chequeImage: { type: String, required: true },
});

export const Payment = mongoose.model<IPayment>("Payment", PaymentSchema);
