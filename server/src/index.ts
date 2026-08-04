import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "./db";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || "acha-regiao-secret-dev";

app.use(cors());
app.use(express.json({ limit: "10mb" }));

// ─── MIDDLEWARE ───
function authMiddleware(req: any, res: any, next: any) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: "Token não informado" });
  try {
    const token = auth.split(" ")[1];
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: "Token inválido" });
  }
}

// ═══════════ AUTH ═══════════

app.post("/api/auth/register", async (req, res) => {
  try {
    const { nome, email, senha, cidade } = req.body;
    if (!nome || !email || !senha) return res.status(400).json({ error: "Nome, email e senha obrigatórios" });
    if (senha.length < 6) return res.status(400).json({ error: "Senha deve ter no mínimo 6 caracteres" });

    const exists = await pool.query("SELECT id FROM usuarios WHERE email = $1", [email]);
    if (exists.rows.length > 0) return res.status(409).json({ error: "Email já cadastrado" });

    const hash = await bcrypt.hash(senha, 10);
    const result = await pool.query(
      `INSERT INTO usuarios (nome, email, senha_hash, cidade) VALUES ($1, $2, $3, $4) RETURNING id, nome, email, cidade, estrelas, criado_em`,
      [nome, email, hash, cidade || "Presidente Getúlio"]
    );

    const user = result.rows[0];
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "7d" });

    res.status(201).json({ user, token });
  } catch (err: any) {
    console.error("Register error:", err.message);
    res.status(500).json({ error: "Erro ao cadastrar" });
  }
});

app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, senha } = req.body;
    if (!email || !senha) return res.status(400).json({ error: "Email e senha obrigatórios" });

    const result = await pool.query("SELECT * FROM usuarios WHERE email = $1", [email]);
    if (result.rows.length === 0) return res.status(401).json({ error: "Email ou senha incorretos" });

    const user = result.rows[0];
    const valid = await bcrypt.compare(senha, user.senha_hash);
    if (!valid) return res.status(401).json({ error: "Email ou senha incorretos" });

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "7d" });
    const { senha_hash, ...userData } = user;

    res.json({ user: userData, token });
  } catch (err: any) {
    console.error("Login error:", err.message);
    res.status(500).json({ error: "Erro ao fazer login" });
  }
});

app.get("/api/auth/me", authMiddleware, async (req: any, res) => {
  try {
    const result = await pool.query("SELECT id, nome, email, cidade, estrelas, avatar_url, criado_em FROM usuarios WHERE id = $1", [req.user.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: "Usuário não encontrado" });
    res.json({ user: result.rows[0] });
  } catch (err: any) {
    res.status(500).json({ error: "Erro ao buscar usuário" });
  }
});

// ═══════════ HEALTH ═══════════

app.get("/api/health", async (_req, res) => {
  try {
    const db = await pool.query("SELECT NOW()");
    res.json({
      status: "ok",
      name: "Acha Região API",
      version: "2.0.0",
      database: "connected",
      db_time: db.rows[0].now,
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    });
  } catch {
    res.status(500).json({ status: "degraded", database: "disconnected" });
  }
});

// ═══════════ PRODUTOS ═══════════

app.get("/api/products", async (req, res) => {
  try {
    const { categoria, cidade, search, limit = "50", offset = "0" } = req.query;
    let query = `SELECT p.*, u.nome as seller_name, u.estrelas as seller_stars, u.avatar_url as seller_avatar FROM produtos p JOIN usuarios u ON p.usuario_id = u.id WHERE p.status = 'ativo'`;
    const params: any[] = [];
    let paramIdx = 1;

    if (categoria && categoria !== "Todos") {
      query += ` AND p.categoria = $${paramIdx++}`;
      params.push(categoria);
    }
    if (cidade) {
      query += ` AND p.cidade = $${paramIdx++}`;
      params.push(cidade);
    }
    if (search) {
      query += ` AND (p.titulo ILIKE $${paramIdx} OR p.cidade ILIKE $${paramIdx})`;
      params.push(`%${search}%`);
      paramIdx++;
    }

    query += ` ORDER BY p.destaque DESC, p.criado_em DESC LIMIT $${paramIdx++} OFFSET $${paramIdx++}`;
    params.push(parseInt(limit as string), parseInt(offset as string));

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err: any) {
    console.error("Products error:", err.message);
    res.status(500).json({ error: "Erro ao buscar produtos" });
  }
});

app.get("/api/products/:id", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT p.*, u.nome as seller_name, u.estrelas as seller_stars, u.avatar_url as seller_avatar FROM produtos p JOIN usuarios u ON p.usuario_id = u.id WHERE p.id = $1`,
      [req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: "Produto não encontrado" });
    res.json(result.rows[0]);
  } catch (err: any) {
    res.status(500).json({ error: "Erro ao buscar produto" });
  }
});

app.post("/api/products", authMiddleware, async (req: any, res) => {
  try {
    const { titulo, descricao, preco, categoria, cidade, whatsapp, imagens } = req.body;
    if (!titulo || !descricao || !preco || !cidade) {
      return res.status(400).json({ error: "Título, descrição, preço e cidade são obrigatórios" });
    }

    const result = await pool.query(
      `INSERT INTO produtos (usuario_id, titulo, descricao, preco, categoria, cidade, whatsapp, imagens) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [req.user.id, titulo, descricao, preco, categoria || "Outros", cidade, whatsapp || null, imagens || []]
    );

    res.status(201).json(result.rows[0]);
  } catch (err: any) {
    console.error("Create product error:", err.message);
    res.status(500).json({ error: "Erro ao criar produto" });
  }
});

// ═══════════ FAVORITOS ═══════════

app.get("/api/favorites", authMiddleware, async (req: any, res) => {
  try {
    const result = await pool.query(
      `SELECT p.*, u.nome as seller_name, u.estrelas as seller_stars FROM favoritos f JOIN produtos p ON f.produto_id = p.id JOIN usuarios u ON p.usuario_id = u.id WHERE f.usuario_id = $1 ORDER BY f.criado_em DESC`,
      [req.user.id]
    );
    res.json(result.rows);
  } catch (err: any) {
    res.status(500).json({ error: "Erro ao buscar favoritos" });
  }
});

app.post("/api/favorites/:produtoId", authMiddleware, async (req: any, res) => {
  try {
    await pool.query(
      `INSERT INTO favoritos (usuario_id, produto_id) VALUES ($1, $2) ON CONFLICT (usuario_id, produto_id) DO NOTHING`,
      [req.user.id, req.params.produtoId]
    );
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: "Erro ao favoritar" });
  }
});

app.delete("/api/favorites/:produtoId", authMiddleware, async (req: any, res) => {
  try {
    await pool.query("DELETE FROM favoritos WHERE usuario_id = $1 AND produto_id = $2", [req.user.id, req.params.produtoId]);
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: "Erro ao remover favorito" });
  }
});

// ═══════════ CATEGORIES ═══════════

app.get("/api/categories", (_req, res) => {
  res.json(["Todos", "Eletrônicos", "Móveis", "Veículos", "Roupas", "Esportes", "Casa", "Ferramentas"]);
});

// ═══════════ START ═══════════
app.listen(PORT, () => {
  console.log(`🟡 Acha Região API v2 rodando na porta ${PORT}`);
  console.log(`   http://localhost:${PORT}/api/health`);
});
