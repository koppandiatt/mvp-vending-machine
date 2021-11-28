import express from "express";
import dotenv from "dotenv";
import winston from "winston";
import initializeServer from "./bootstrap/initialize.js";

dotenv.config();

const app = express();

await initializeServer();

const port = process.env.PORT || 8000;
app.listen(port, () =>
  winston.info(`Express Server Listening on PORT ${port}`)
);
