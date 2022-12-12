import mongoose, { Schema, Document } from "mongoose";
import { UserDocument } from "./user.model";
export interface TokenInput {
  token: string;
  user: UserDocument["_id"];
}
export interface TokenDocument extends Document, TokenInput {
  createdAt: Date;
  updatedAt: Date;
  expirersAt: Date;
}
const TokenSchema: Schema = new Schema(
  {
    token: { type: "string", required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    expirersAt: { type: "date", default: new Date(Date.now() + 3600000) },
  },
  { timestamps: true }
);
export default mongoose.model<TokenDocument>("Token", TokenSchema);
