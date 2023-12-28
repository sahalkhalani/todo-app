import * as dotenv from "dotenv";
dotenv.config();

export default {
  jwt_secret: process.env.JWT_SECRET || "",
  db_url: process.env.DB_URL,
  app: {
    port: process.env.PORT || 4007,
  },
};
