import winston from "winston";
const { format } = winston;

function logging() {
  const fileError = new winston.transports.File({
    filename: "logs/errors.log",
    level: "error",
    format: winston.format.splat(),
  });

  const fileLogs = new winston.transports.File({
    filename: "logs/logs.log",
    level: "info",
    format: winston.format.combine(format.timestamp(), format.json()),
  });

  winston.add(fileError);
  winston.add(fileLogs);

  if (process.env.NODE_ENV !== "production") {
    winston.add(
      new winston.transports.Console({
        format: winston.format.simple(),
      })
    );
  }

  process.on("unhandledRejection", (ex) => {
    throw ex;
  });
}

export default logging;
