-- Acha Região — Schema PostgreSQL
-- Executado automaticamente na inicialização do servidor

-- ═══════ USUÁRIOS ═══════
CREATE TABLE IF NOT EXISTS usuarios (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  senha_hash VARCHAR(255) NOT NULL,
  whatsapp VARCHAR(20),
  cidade VARCHAR(50) DEFAULT 'Presidente Getúlio',
  avatar_url TEXT,
  cover_url TEXT,
  estrelas DECIMAL(2,1) DEFAULT 5.0,
  criado_em TIMESTAMP DEFAULT NOW()
);

-- ═══════ PRODUTOS ═══════
CREATE TABLE IF NOT EXISTS produtos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  usuario_id UUID NOT NULL REFERENCES usuarios(id),
  titulo VARCHAR(200) NOT NULL,
  descricao TEXT,
  preco DECIMAL(10,2) NOT NULL,
  categoria VARCHAR(50) DEFAULT 'Outros',
  cidade VARCHAR(50) NOT NULL,
  whatsapp VARCHAR(20),
  imagens TEXT[] DEFAULT '{}',
  condicao VARCHAR(20) DEFAULT 'Usado',
  destaque BOOLEAN DEFAULT FALSE,
  status VARCHAR(20) DEFAULT 'ativo',
  visualizacoes INTEGER DEFAULT 0,
  criado_em TIMESTAMP DEFAULT NOW()
);

-- ═══════ FAVORITOS ═══════
CREATE TABLE IF NOT EXISTS favoritos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  usuario_id UUID NOT NULL REFERENCES usuarios(id),
  produto_id UUID NOT NULL REFERENCES produtos(id),
  criado_em TIMESTAMP DEFAULT NOW(),
  UNIQUE(usuario_id, produto_id)
);

-- ═══════ ÍNDICES ═══════
CREATE INDEX IF NOT EXISTS idx_produtos_categoria ON produtos(categoria);
CREATE INDEX IF NOT EXISTS idx_produtos_cidade ON produtos(cidade);
CREATE INDEX IF NOT EXISTS idx_produtos_status ON produtos(status);
CREATE INDEX IF NOT EXISTS idx_produtos_usuario ON produtos(usuario_id);
CREATE INDEX IF NOT EXISTS idx_favoritos_usuario ON favoritos(usuario_id);
