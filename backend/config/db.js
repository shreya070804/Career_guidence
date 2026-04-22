import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const connectionString = process.env.DATABASE_URL;

const sequelize = new Sequelize(connectionString, {
  dialect: "postgres",
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // Set to true if you have the CA certificate
    },
  },
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Neon PostgreSQL connected successfully.");
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error.message);
    process.exit(1);
  }
};

export { sequelize, connectDB };
export default connectDB;
