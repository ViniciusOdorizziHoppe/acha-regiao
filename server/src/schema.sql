-- Acha Região — Schema PostgreSQL
-- Executar no Neon SQL Editor ou via migrate

-- ═══ USUÁRIOS ═══
CREATE TABLE IF NOT EXISTS usuarios (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome        VARCHAR(100) NOT NULL,
    email       VARCHAR(255) UNIQUE NOT NULL,
    senha_hash  VARCHAR(255) NOT NULL,
    cidade      VARCHAR(100) DEFAULT 'Presidente Getúlio',
    avatar_url  VARCHAR(500),
    estrelas    DECIMAL(3,2) DEFAULT 0,
    criado_em   TIMESTAMP DEFAULT NOW()
);

-- ═══ PRODUTOS ═══
CREATE TABLE IF NOT EXISTS produtos (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id  UUID NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    titulo      VARCHAR(120) NOT NULL,
    descricao   TEXT NOT NULL,
    preco       DECIMAL(10,2) NOT NULL,
    categoria   VARCHAR(50) DEFAULT 'Outros',
    cidade      VARCHAR(100) NOT NULL,
    whatsapp    VARCHAR(20),
    imagens     TEXT[] DEFAULT '{}',
    destaque    BOOLEAN DEFAULT false,
    status      VARCHAR(20) DEFAULT 'ativo',
    criado_em   TIMESTAMP DEFAULT NOW()
);

-- ═══ FAVORITOS ═══
CREATE TABLE IF NOT EXISTS favoritos (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id  UUID NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    produto_id  UUID NOT NULL REFERENCES produtos(id) ON DELETE CASCADE,
    criado_em   TIMESTAMP DEFAULT NOW(),
    UNIQUE(usuario_id, produto_id)
);

-- ═══ ÍNDICES ═══
CREATE INDEX IF NOT EXISTS idx_produtos_categoria ON produtos(categoria);
CREATE INDEX IF NOT EXISTS idx_produtos_cidade ON produtos(cidade);
CREATE INDEX IF NOT EXISTS idx_produtos_criado_em ON produtos(criado_em DESC);
CREATE INDEX IF NOT EXISTS idx_produtos_usuario ON produtos(usuario_id);
CREATE INDEX IF NOT EXISTS idx_favoritos_usuario ON favoritos(usuario_id);
