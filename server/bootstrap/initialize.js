import winston from "winston";
import database from "./database.js";
import logging from "./logging.js";
import checkJWTPrivateKey from "./config.js";

async function initializeServer() {
  logging();
  try {
    checkJWTPrivateKey();
    await database();
  } catch (error) {
    winston.error(error.message);
    process.exit(1);
  }
}

export default initializeServer;
