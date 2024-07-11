import dotenv from "dotenv";

dotenv.config();

const AppConfig = {
  MONGO_DB_URI: process.env.MONGO_DB_URI || "mongodb://127.0.0.1/SDN_PE",
  PORT: parseInt(process.env.PORT) || 3005,
  JWT_SECRET: process.env.JWT_SECRET || "!@#$",
  JWT_EXPIRE: parseInt(process.env.JWT_EXPIRE) || 1000 * 60 * 60 * 24,
};

export default AppConfig;
