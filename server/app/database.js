import mongoose from "mongoose";
import winston from "winston";

async function database() {
  if (!process.env.DB)
    throw new Error("FATAL ERROR: DB string is not defined!");
  const db = process.env.DB;
  await mongoose.connect(db).then(
    () => winston.info(`Connected to Mongo DB...`),
    (error) => {
      winston.error(`Connection to Mongo DB Failed! ${error}`);
      process.exit(1);
    }
  );
}

export default database;
