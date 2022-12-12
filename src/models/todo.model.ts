import mongoose, { Schema, Document } from "mongoose";
import { UserDocument } from "./user.model";
export interface todoDocument extends Document {
  description: string;
  title: string;
  finished: boolean;
  finishedAt: Date;
  createdAt: Date;
  updatedAt: Date;
  owner: UserDocument["_id"];
}
const todoSchema: Schema = new Schema(
  {
    title: { type: "string", required: true },
    description: { type: "string", required: true, maxLength: 300 },
    finished: { type: "boolean", default: false },
    finishedAt: { type: "Date", default: null },
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);
export default mongoose.model<todoDocument>("todo", todoSchema);
