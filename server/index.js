import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3030;

const server = app.listen(port, () =>
  console.log(`Express Server Listening on PORT ${port}`)
);

export default server;
