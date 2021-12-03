import cors from "cors";
import express from "express";
import morgan from "morgan";
import winston from "winston";
import initializeServer from "./app/initialize.js";
import routes from "./routes/index.js";

const app = express();

await initializeServer(app);

app.use(morgan("common"));
app.use(express.json());
app.use(cors());
app.use("/api", routes);

const port = process.env.PORT || 8000;
const server = app.listen(port, () =>
  winston.info(`Express Server Listening on PORT ${port}`)
);

export default function runServer() {
  return server;
}
