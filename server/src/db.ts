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

// Test connection (graceful - não crasha sem DB)
pool.query("SELECT NOW()").then(() => {
  console.log("✅ PostgreSQL conectado");
}).catch((err) => {
  console.error("⚠️ PostgreSQL indisponível:", err.message || JSON.stringify(err));
  console.error("   API rodando em modo degrade (auth/produtos usam fallback)");
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
