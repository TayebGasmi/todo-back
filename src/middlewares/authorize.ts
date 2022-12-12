import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
const authorize = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization as string;

    if (!token) {
      return res.status(403).json({ message: "No token provided" });
    }
    if (!token.startsWith("Bearer ")) {
      return res.status(403).json({ message: "Invalid token" });
    }
    const tokenValue = token.split(" ")[1];
    const user = verify(tokenValue, process.env.JWT_SECRET as string);
    // @ts-ignore
    req.user = user;
    next();
  } catch (error) {
    return next(error);
  }
};
export default authorize;
