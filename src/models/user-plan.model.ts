import mongoose, { Document, Schema } from "mongoose";

export interface IUserPlan extends Document {
  userId: mongoose.Types.ObjectId;
  planId: mongoose.Types.ObjectId;
  status: "pending" | "active" | "expired";
  startDate: Date;
  endDate: Date;
}

const UserPlanSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  planId: { type: Schema.Types.ObjectId, ref: "Plan", required: true },
  status: {
    type: String,
    enum: ["pending", "active", "expired"],
    default: "pending",
  },
  startDate: { type: Date },
  endDate: { type: Date },
});

export const UserPlan = mongoose.model<IUserPlan>("UserPlan", UserPlanSchema);
