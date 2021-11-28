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
    const customFormat = winston.format.combine(
      winston.format.colorize({
        all: true,
      }),
      winston.format.label({
        label: "[LOGGER]",
      }),
      winston.format.timestamp({
        format: "YY-MM-DD HH:MM:SS",
      }),
      winston.format.printf(
        (info) =>
          ` ${info.label}  ${info.timestamp}  ${info.level} : ${info.message}`
      )
    );
    winston.add(
      new winston.transports.Console({
        format: winston.format.combine(winston.format.colorize(), customFormat),
      })
    );
  }

  process.on("unhandledRejection", (ex) => {
    throw ex;
  });
}

export default logging;
