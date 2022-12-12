import { createLogger } from "winston";
import { format, transports } from "winston";
import { Logger } from "winston";
const { timestamp, colorize, printf, combine } = format;
const logger: Logger = createLogger({
  level: process.env.LOG_LEVEL || "info",
  format: combine(
    colorize(),
    timestamp({ format: "YYYY-MM-DD hh:mm:ss" }),
    printf(({ level, message, timestamp }) => {
      return `[ ${timestamp} ] ${level}: ${message}`;
    })
  ),
  transports: [new transports.Console()],
});
export default logger;
