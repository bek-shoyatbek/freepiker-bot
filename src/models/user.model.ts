import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  telegramId: string;
  name: string;
  freeTrialUsed: boolean;
  dailyRequestsCount: number;
  lastResetDate: Date;
}

const UserSchema: Schema = new Schema({
  telegramId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  freeTrialUsed: { type: Boolean, default: false },
  dailyRequestsCount: { type: Number, default: 0 },
  lastResetDate: { type: Date, default: Date.now },
});

export const User = mongoose.model<IUser>("User", UserSchema);
