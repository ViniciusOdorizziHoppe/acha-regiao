import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// ─── Health Check ───
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    name: "Acha Região API",
    version: "1.0.0",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// ─── Categories ───
const CATEGORIES = [
  "Todos", "Eletrônicos", "Móveis", "Veículos",
  "Roupas", "Esportes", "Casa", "Ferramentas",
];

app.get("/api/categories", (_req, res) => {
  res.json(CATEGORIES);
});

// ─── Mock Products ───
const MOCK_PRODUCTS = [
  {
    id: "1",
    title: "iPhone 13 Pro 128GB Grafite",
    price: 3200,
    city: "Rio do Sul",
    imageUrl: "https://images.unsplash.com/photo-1632661675695-15c8e3e8e7b4?w=400&h=400&fit=crop",
    destaque: true,
    category: "Eletrônicos",
  },
  {
    id: "2",
    title: "Sofá 3 Lugares Retrátil",
    price: 850,
    city: "Presidente Getúlio",
    imageUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop",
    destaque: false,
    category: "Móveis",
  },
  {
    id: "3",
    title: "Honda CG 160 Titan 2023",
    price: 14500,
    city: "Ibirama",
    imageUrl: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=400&h=400&fit=crop",
    destaque: true,
    category: "Veículos",
  },
  {
    id: "4",
    title: "Geladeira Frost Free 375L",
    price: 1800,
    city: "Rio do Sul",
    imageUrl: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=400&h=400&fit=crop",
    destaque: false,
    category: "Eletrônicos",
  },
  {
    id: "5",
    title: "Mesa de Jantar 6 Lugares",
    price: 650,
    city: "Presidente Getúlio",
    imageUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d6ab6?w=400&h=400&fit=crop",
    destaque: false,
    category: "Móveis",
  },
  {
    id: "6",
    title: "Kit Halteres 20kg + Barra",
    price: 280,
    city: "Laurentino",
    imageUrl: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=400&fit=crop",
    destaque: false,
    category: "Esportes",
  },
];

app.get("/api/products", (req, res) => {
  const { category, search, city } = req.query;

  let filtered = [...MOCK_PRODUCTS];

  if (category && category !== "Todos") {
    filtered = filtered.filter((p) => p.category === category);
  }

  if (search) {
    const s = (search as string).toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.title.toLowerCase().includes(s) ||
        p.city.toLowerCase().includes(s)
    );
  }

  if (city) {
    filtered = filtered.filter(
      (p) => p.city.toLowerCase() === (city as string).toLowerCase()
    );
  }

  res.json(filtered);
});

app.get("/api/products/:id", (req, res) => {
  const product = MOCK_PRODUCTS.find((p) => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ error: "Produto não encontrado" });
  }
  res.json(product);
});

// ─── Start ───
app.listen(PORT, () => {
  console.log(`🟡 Acha Região API rodando na porta ${PORT}`);
  console.log(`   http://localhost:${PORT}/api/health`);
});
