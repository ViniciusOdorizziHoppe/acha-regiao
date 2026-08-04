# 🟡 Acha Região — Documentação do Sistema

> **URL:** [acha-regiao-qp7x.vercel.app](https://acha-regiao-qp7x.vercel.app)  
> **API:** [acha-regiao-api.onrender.com](https://acha-regiao-api.onrender.com/api/health)  
> **Repo:** [github.com/ViniciusOdorizziHoppe/acha-regiao](https://github.com/ViniciusOdorizziHoppe/acha-regiao)  
> **Stack:** HTML + CSS + JS vanilla (43 KB, 0 dependências, 1 arquivo)

---

## 📐 Arquitetura

```
┌─────────────────────────────────────────────────┐
│              acha-regiao-qp7x.vercel.app         │
│              1 arquivo • 43 KB • 0 dependências  │
└──────────────────────┬──────────────────────────┘
                       │
    ┌──────────────────┼──────────────────┐
    ▼                  ▼                  ▼
┌────────┐    ┌─────────────┐    ┌──────────────┐
│localStorage│  │ Render API  │    │ Notification │
│(persistência)│ │(produtos)  │    │ API (push)   │
└────────┘    └─────────────┘    └──────────────┘
```

| Camada | Tecnologia | Detalhe |
|--------|-----------|---------|
| **Frontend** | HTML + CSS + JS vanilla | Sem build, sem framework |
| **Backend** | Express + TypeScript | `acha-regiao-api.onrender.com` |
| **Persistência** | `localStorage` | Usuários, produtos, favoritos |
| **Push** | Notification API | Navegador |
| **PWA** | Manifest + Service Worker | Instalável como app nativo |

---

## 🗺️ Fluxo Completo do Usuário

```
ABRE O APP
    │
    ▼
┌──────────┐    2.2s    ┌──────────┐
│  SPLASH  │ ────────→  │   AUTH   │
│ Logo +   │            │ Cadastro │
│ spinner  │            │ ou Login │
└──────────┘            └────┬─────┘
                             │
                    ┌────────┴────────┐
                    ▼                 ▼
              Primeiro acesso    Já tem conta
                    │                 │
                    ▼                 ▼
            ┌──────────┐      ┌──────────┐
            │ TUTORIAL │      │   FEED   │
            │ 3 passos │─────→│ (Home)   │
            └──────────┘      └────┬─────┘
                                   │
              ┌────────────────────┼────────────────────┐
              ▼                    ▼                    ▼
        ┌──────────┐       ┌──────────┐        ┌──────────┐
        │  FEED    │       │  CRIAR   │        │  PERFIL  │
        │ (Home)   │       │ Anúncio  │        │ (Meus)   │
        └────┬─────┘       └──────────┘        └──────────┘
             │
             ▼ tap no card
        ┌──────────┐
        │ DETALHE  │
        │ Galeria  │
        │ WhatsApp │
        │ Favoritar│
        │ Compart. │
        └──────────┘
```

---

## 📱 Telas

### 1. 🧊 Splash Screen

| Elemento | Descrição |
|----------|-----------|
| Logo | `assets/logo-text.png` — "acha REGIÃO" |
| Subtítulo | "Alto Vale do Itajaí" |
| Spinner | Anel amarelo girando (CSS animation) |
| Transição | Fade out após 2.2 segundos |

**Lógica:**
- Se `localStorage.acha_user` existe → Feed
- Se não → Auth

---

### 2. 🔐 Auth (Cadastro/Login)

| Modo | Campos | Validações |
|------|--------|------------|
| **Cadastro** | Nome, Email, Senha | Nome obrigatório, email com `@`, senha ≥ 6 caracteres |
| **Login** | Email, Senha | Confere contra `localStorage.acha_users` |

**Toggle:** "Já tem conta? Entrar" ↔ "Não tem conta? Criar conta"

**Pós-cadastro:** Salva em `localStorage.acha_users` (array) + `localStorage.acha_user` (sessão) → Abre Tutorial.

---

### 3. 🎓 Tutorial (Onboarding)

| Passo | Ícone | Título | Conteúdo |
|-------|-------|--------|----------|
| 1/3 | 👤 | Seu Perfil | "Sua identidade no Acha Região. Suas estrelas representam sua reputação." |
| 2/3 | ⭐ | Suas Estrelas | "Ao vender produtos, os compradores te avaliam. Quanto mais ⭐, mais confiança!" |
| 3/3 | 📦 | Seus Anúncios | "Liste tudo o que quer vender. Completo vende mais rápido!" |

**Navegação:** Dots animados + botão "Próximo" → "Entendi" → "Começar!"

**Ao finalizar:** Redireciona para o Perfil.

---

### 4. 🏷️ Feed (Home)

| Componente | Função |
|-----------|--------|
| **Header amarelo** | Logo + badge de notificações 🔔 |
| **Search bar** | Busca por título ou cidade (filtro em tempo real) |
| **Category chips** | 8 categorias: Todos, Eletrônicos, Móveis, Veículos, Roupas, Esportes, Casa, Ferramentas |
| **Raio (km)** | Slider de 5 a 100km — distância real via **Fórmula de Haversine** |
| **Ordenação** | Alterna entre "🕐 Recentes" e "💰 Menor preço" |
| **Grid 2 colunas** | Cards com: imagem, botão ❤️ favorito, título, preço em amarelo, cidade + distância |
| **Tab bar** | Explorar • Anunciar • Perfil |

**Filtros combinados:** Categoria + busca + raio + ordenação — todos simultâneos.

---

### 5. 🔍 Detalhe do Produto

| Seção | Descrição |
|-------|-----------|
| **Carrossel de imagens** | Swipe com o dedo, dots animados, contador "2/4", botões ‹ › |
| **Preço** | Destaque amarelo, 28px, `R$ X.XXX` |
| **Título** | Nome completo do produto |
| **Descrição** | Texto formatado com quebras de linha (`\n` → `<br>`) e emojis |
| **Tags** | Categoria 📦 + Localização 📍 + Distância 📏 |
| **Card do vendedor** | Avatar com inicial, nome, ⭐ estrelas, "Membro desde 2026" |
| **Relacionados** | Até 4 produtos da mesma categoria ou cidade |
| **Ações** | 💬 WhatsApp (mensagem pré-preenchida) · ❤️ Favoritar · 📤 Compartilhar |

**Touch gesture:** Swipe esquerda → direita volta pro Feed.

---

### 6. 📦 Criar Anúncio

| Campo | Tipo | Obrigatório |
|-------|------|:---:|
| Fotos | Upload múltiplo (FileReader → base64) | ❌ |
| Título | Texto (max 100) | ✅ |
| Descrição | Textarea | ✅ |
| Preço | Number | ✅ |
| WhatsApp | Tel | ✅ |
| Categoria | Select (7 opções) | ❌ |
| Localização | Select (6 cidades) | ✅ |

**Preview de fotos:** Miniaturas com botão ✕ para remover.

**Ao publicar:** Salva em `localStorage.acha_products` + array em memória → redireciona para Feed.

---

### 7. 👤 Perfil

| Seção | Conteúdo |
|-------|----------|
| **Capa** | Gradiente amarelo |
| **Avatar** | Inicial do nome em círculo |
| **Nome** | Nome completo do cadastro |
| **Localização** | Cidade do usuário |
| **Estrelas** | ⭐ preenchidas/vazias (nota visual) |
| **Abas** | "Meus anúncios" / "❤️ Favoritos" |
| **Grid** | Cards dos anúncios ou favoritos do usuário |

---

## 🔧 Funcionalidades Transversais

### ❤️ Favoritos
- Botão 🤍 em cada card + tela de detalhe
- Persiste em `localStorage.acha_favs`
- Aba dedicada no Perfil
- Sincroniza em tempo real entre Feed e Perfil

### 📤 Compartilhar
- Abre WhatsApp Web com texto pronto:
  ```
  🟡 [título]
  💰 R$ [preço]
  📍 [cidade]
  Veja no Acha Região: acha-regiao-qp7x.vercel.app
  ```

### 💬 WhatsApp
- Botão verde na tela de detalhe
- Mensagem pré-preenchida com nome do vendedor + título do produto
- Validação: toast se WhatsApp não informado

### 🔔 Push Notifications
- `Notification API` — pede permissão após 5 segundos
- Verifica novos anúncios a cada 60 segundos
- Badge no header: "🔔 N" quando há novos
- Notificação nativa: "🟡 Novo anúncio — [título] — R$ [preço] em [cidade]"

### 📏 Distância em Km
- **Fórmula de Haversine** com coordenadas reais:
  - Presidente Getúlio: `-27.0282, -49.6247`
  - Rio do Sul: `-27.2144, -49.6422`
  - Ibirama: `-27.0569, -49.5189`
  - Laurentino: `-27.2172, -49.7333`
  - Lontras: `-27.1661, -49.5419`
  - Aurora: `-27.3158, -49.6356`
- Slider de raio no Feed (5-100km)
- Distância no card e na tela de detalhe

### 📲 PWA (Progressive Web App)
- `manifest.json` inline — instalável como app nativo
- Service Worker — cache offline
- Banner "📲 Toque para instalar o app"
- Suporte iOS: Safari → Compartilhar → Adicionar à Tela

### 🔄 Navegação
- Transições CSS (`transform: translateX` + `opacity`)
- `syncTabs()` mantém todas as tab bars sincronizadas entre páginas
- Swipe back do detalhe (touchstart/touchend)
- Guarda de autenticação: redireciona para Auth se não logado

---

## 💾 Estrutura de Dados (localStorage)

| Chave | Tipo | Conteúdo |
|-------|------|----------|
| `acha_user` | Object | Sessão do usuário logado |
| `acha_users` | Array | Todos os usuários cadastrados |
| `acha_products` | Array | Produtos criados localmente |
| `acha_favs` | Array | IDs dos produtos favoritados |

---

## 🌐 APIs Externas

| Endpoint | Método | Uso |
|----------|--------|-----|
| `acha-regiao-api.onrender.com/api/products` | GET | Carrega produtos do servidor |
| `acha-regiao-api.onrender.com/api/health` | GET | Health check do backend |
| `wa.me/55...` | Link | Abre conversa no WhatsApp |
| `images.unsplash.com` | CDN | Imagens fallback |

---

## 🎯 Status do Projeto

### ✅ Funcional (90%)

| Feature | Status |
|---------|:---:|
| Splash → Auth → Tutorial → Feed | ✅ |
| Cadastro/Login com persistência | ✅ |
| Busca + Categorias + Raio km + Ordenação | ✅ |
| Detalhe com galeria swipe | ✅ |
| WhatsApp + Compartilhar + Favoritos | ✅ |
| Publicar anúncio com fotos | ✅ |
| Perfil com meus anúncios e favoritos | ✅ |
| Push notifications + Badge | ✅ |
| PWA instalável | ✅ |
| Tab bar sincronizada | ✅ |
| Swipe back gesture | ✅ |

### ❌ Pendente (10%)

| Feature | Esforço |
|---------|---------|
| Banco PostgreSQL real (Neon) | 2 dias |
| Autenticação JWT + hash senha | 2 dias |
| Stripe/PIX — monetização | 3 dias |
| Play Store .aab | 1 dia |
| Domínio próprio (`acharegiao.com.br`) | 1 dia |
| Tela de Profissionais | 3 dias |
| Tela de Aluguéis | 3 dias |

---

## 📁 Estrutura de Arquivos

```
acha-regiao/
├── index.html              ← App completo (43 KB, 1 arquivo)
├── sw.js                   ← Service Worker (PWA)
├── vercel.json             ← Config deploy Vercel
├── render.yaml             ← Config deploy Render
├── preview.html            ← Landing page antiga
├── assets/
│   ├── logo-icon.png       ← Logo ícone (lupa + pin)
│   ├── logo-text.png       ← Logo texto (@acha REGIÃO)
│   └── *.png               ← App icons
├── server/                 ← Backend Express + TypeScript
│   ├── src/index.ts        ← API principal
│   ├── package.json
│   └── tsconfig.json
└── src/                    ← React Native (pausado)
    ├── components/         ← SearchBar, ProductCard, etc
    └── data/mock.ts        ← Mock data
```

---

> **Pipeline:** GPT-4o (arquitetura) → Claude Sonnet 5 (design) → DeepSeek V4 (código)  
> **Custo mensal:** R$ 3,33 (apenas domínio Registro.br)  
> **Deploy:** Vercel (frontend) + Render (backend) — CI/CD automático via GitHub
