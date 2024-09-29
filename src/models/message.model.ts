import mongoose, { Document, Schema } from "mongoose";

export interface IMessage extends Document {
  title: string;
  text: string;
}

const MessageSchema: Schema = new Schema({
  title: String,
  text: String,
});

export const Message = mongoose.model<IMessage>("Message", MessageSchema);
