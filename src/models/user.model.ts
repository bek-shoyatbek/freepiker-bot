import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  telegramId: string;
  name: string;
  dailyRequestsCount: number;
  lastResetDate: Date;
}

const UserSchema: Schema = new Schema({
  telegramId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  dailyRequestsCount: { type: Number, default: 0 },
  lastResetDate: { type: Date, default: Date.now },
});

export const User = mongoose.model<IUser>("User", UserSchema);
