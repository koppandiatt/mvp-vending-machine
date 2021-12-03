import dotenv from "dotenv";

function config() {
  const node_env = process.env.NODE_ENV || "development";

  dotenv.config({
    path: node_env === "production" ? ".env" : `.env.${node_env}`,
  });

  if (!process.env.JWT_PRIVATE_KEY) {
    throw new Error("FATAL ERROR: JWT_PRIVATE_KEY is not defined.");
  }
}

export default config;
