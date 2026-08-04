import { Pool } from "pg";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  max: 10,
  idleTimeoutMillis: 30000,
});

// Test connection
pool.query("SELECT NOW()").then(() => {
  console.log("✅ PostgreSQL conectado");
}).catch((err) => {
  console.error("❌ Erro ao conectar no PostgreSQL:", err.message);
  process.exit(1);
});

// Run migrations on startup
async function migrate() {
  const schemaPath = path.join(__dirname, "schema.sql");
  if (fs.existsSync(schemaPath)) {
    const sql = fs.readFileSync(schemaPath, "utf-8");
    try {
      await pool.query(sql);
      console.log("✅ Migrations executadas");
    } catch (err: any) {
      console.error("⚠️ Migration error:", err.message);
    }
  }
}

migrate();

export default pool;
