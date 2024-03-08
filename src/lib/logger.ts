import winston, { format } from "winston";
import SlackHook from "winston-slack-webhook-transport";

import printf = format.printf;
import timestamp = format.timestamp;

const customFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} - ${level}: ${JSON.stringify(message, null, 2)}`;
});

const logger = winston.createLogger({
  level: "debug",
  format: winston.format.combine(timestamp(), customFormat),
  transports: [
    new winston.transports.Console(),
    new SlackHook({
      webhookUrl: process.env["SLACK_WEBHOOK_URL"] ?? "",
      channel: "#nextword-ops", // optional
      username: "NextwordLogger", // optional
      level: "error", // Send only error level logs to Slack
    }),
  ],
});

export default logger;
