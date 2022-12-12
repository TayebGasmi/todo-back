//send mail with nodemailer
import nodemailer, { createTransport } from "nodemailer";
import { TokenInput } from "./../models/token.model";
import logger from "./../logs/logger";
const transport = createTransport({
  service: "Gmail",
  auth: {
    pass: process.env.EMAIL_PASS,
    user: process.env.EMAIL_USER,
  },
});
export const sendRestMail = async (to: string, token: TokenInput) => {
  try {
    await transport.sendMail({
      from: process.env.EMAIL_USER,
      to: to,
      subject: "Reset Password",
      html: `<h1>Reset Password</h1>
    <p>Click the link below to reset your password</p>
    <a href="${
      (process.env.FRONTEND_URL as string) || "http://localhost:3000"
    }/reset-password/${token.user}/${token.token}">Reset Password</a>`,
    });
    logger.info(`Reset password mail sent to ${to}`);
  } catch (error: any) {
    console.log(error);
    logger.error(error.message);
  }
};
