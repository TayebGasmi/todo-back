import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";

interface UserInput {
  name: string;
  email: string;
  password: string;
  phone: string;
}
export interface UserDocument extends UserInput, Document {
  comparePassword(password: string): boolean;
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
}
const UserSchema: Schema = new Schema(
  {
    firstName: { type: "string", required: true },
    lastName: { type: "string", required: true },
    email: { type: "string", required: true, unique: true },
    password: { type: "string", required: true },
    phone: { type: "string", required: true },
    verified: { type: "boolean", default: false },
  },
  { timestamps: true }
);
UserSchema.index({ email: 1 }, { unique: true });
UserSchema.methods.comparePassword = function (password: string): boolean {
  return bcrypt.compareSync(password, this.password);
};
UserSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();
  const salt = bcrypt.genSaltSync(10);
  this.password = bcrypt.hashSync(this.password, salt);
  next();
});
export default mongoose.model<UserDocument>("User", UserSchema);
