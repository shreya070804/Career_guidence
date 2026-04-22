import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const connectionString = process.env.DATABASE_URL || process.env.DB_URL;

let sequelize;

if (connectionString) {
  sequelize = new Sequelize(connectionString, {
    dialect: "postgres",
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  });
} else {
  console.warn("⚠️ DATABASE_URL or DB_URL not found in environment variables.");
  console.warn("⚠️ Skipping Sequelize initialization. Database features will be unavailable.");
  
  // Robust mock object to prevent crashes when DB is missing
  const mockModel = {
    hasMany: () => {},
    belongsTo: () => {},
    belongsToMany: () => {},
    hasOne: () => {},
    count: async () => 0,
    findAll: async () => [],
    findOne: async () => null,
    create: async (data) => ({ id: "mock-" + Date.now(), ...data }),
    update: async () => [0],
    destroy: async () => 0,
  };

  sequelize = {
    define: () => mockModel,
    sync: async () => console.log("⏩ Skipping sync (No DB)"),
    authenticate: async () => { throw new Error("Database not configured"); },
  };
}

const connectDB = async () => {
  if (!connectionString) {
    console.warn("ℹ️ connectDB skipped: No connection string provided.");
    return;
  }
  
  try {
    await sequelize.authenticate();
    console.log("✅ Neon PostgreSQL connected successfully.");
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error.message);
    console.warn("ℹ️ Continuing without database connection...");
    // Do not call process.exit(1) so the server can still start
  }
};

export { sequelize, connectDB };
export default connectDB;
