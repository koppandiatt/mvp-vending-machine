import express from "express";

const app = express();
const port = 3030;

const server = app.listen(port, () =>
  console.log(`Express Server Listening on PORT ${port}`)
);

export default server;
