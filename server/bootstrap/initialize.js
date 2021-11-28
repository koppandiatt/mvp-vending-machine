import winston from "winston";
import database from "./database.js";
import logging from "./logging.js";
import checkJWTPrivateKey from "./config.js";
import customJoi from "./../utils/customJoi.js";

async function initializeServer() {
  try {
    logging();
    checkJWTPrivateKey();
    await database();
    customJoi();
  } catch (error) {
    winston.error(error.message);
    process.exit(1);
  }
}

export default initializeServer;
