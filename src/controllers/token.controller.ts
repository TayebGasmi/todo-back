import Token from "../models/token.model";
import { v4 as uuidv4 } from "uuid";
import { Request, Response, NextFunction } from "express";
import User from "../models/user.model";
import { sendRestMail } from "./../utils/mail";
import logger from "./../logs/logger";

const createToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findOne({ email: req.body.email }).lean().exec();
    if (!user) return res.status(400).json({ message: "User not found" });
    const token = new Token({
      token: uuidv4() as string,
      user: user._id,
    });
    await token.save();
    sendRestMail(user.email, { token: token.token, user: user._id });
    return res.status(201).json({ message: "Token created", token });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = await Token.findOne({
      token: req.params.token,
      user: req.params.user,
    });
    if (!token) return res.status(400).json({ message: "Token not found" });
    const user = await User.findById(token.user);
    if (!user) return res.status(400).json({ message: "User not found" });
    user.password = req.body.password;
    await user.save();
    await token.remove();
    logger.info(`Password reset successfully for user ${user.email}`);
    return res.status(200).json({ message: "Password reset successfully" });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
export const TokenController = {
  createToken,
  resetPassword,
};
