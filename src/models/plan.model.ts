import mongoose, { Document, Schema } from "mongoose";

export interface IPlan extends Document {
  title: string;
  dailyRequestCount: number;
  price: number;
}

const PlanSchema: Schema = new Schema({
  title: { type: String, required: true },
  dailyRequestCount: { type: Number, required: true },
  price: { type: Number, required: true },
});

export const Plan = mongoose.model<IPlan>("Plan", PlanSchema);
