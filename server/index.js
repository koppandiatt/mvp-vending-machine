import express from "express";
import dotenv from "dotenv";
import winston from "winston";
import initialize from "./bootstrap/initialize.js";

dotenv.config();

const app = express();

initialize.logging();
await initialize.database();

const port = process.env.PORT || 8000;
app.listen(port, () =>
  winston.info(`Express Server Listening on PORT ${port}`)
);
