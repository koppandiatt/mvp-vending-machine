import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import winston from "winston";
import initializeServer from "./bootstrap/initialize.js";
import routes from "./routes/index.js";

dotenv.config();
await initializeServer();

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("common"));
app.use("/api", routes);

const port = process.env.PORT || 8000;
app.listen(port, () =>
  winston.info(`Express Server Listening on PORT ${port}`)
);
