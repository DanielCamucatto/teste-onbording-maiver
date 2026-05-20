# Central de Onboarding Maiver

> **Versão:** 1.0.0
> **Status:** ✅ MVP Completo

Sistema interno para gerenciamento de onboarding de novos clientes da Maiver.

---

## 📋 Sumário

- [Sobre](#-sobre-o-projeto)
- [Stack Tecnológica](#-stack-tecnológica)
- [Funcionalidades](#-funcionalidades)
- [Arquitetura](#-arquitetura)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação](#-instalação)
- [Configuração](#-configuração)
- [Uso](#-uso)
- [API](#-api)
- [Testes](#-testes)
- [Deploy](#-deploy)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Diário de Uso da IA](#-diário-de-uso-da-ia)

---

## 📋 Sobre o Projeto

A **Central de Onboarding Maiver** é um MVP que permite aos consultores da Maiver:

- 📝 **Cadastrar** novos clientes com dados de contato e plano contratado
- 📋 **Gerenciar** um checklist de 6 etapas de onboarding para cada cliente
- 📊 **Acompanhar** o progresso dos clientes em um dashboard visual
- 🔍 **Filtrar** clientes por nome da empresa, consultor responsável ou contato
- ⏰ **Identificar** atrasos automaticamente (clientes com mais de 30 dias sem conclusão)

## 🛠️ Stack Tecnológica

| Camada | Tecnologia | Versão |
|--------|-----------|--------|
| **Frontend** | React + Vite + TypeScript | ^18 / ^5 |
| **Backend** | NestJS + TypeScript | ^10 |
| **Banco de Dados** | Supabase (PostgreSQL) | - |
| **Testes (Backend)** | Jest | ^29 |
| **Testes (Frontend)** | Vitest + Testing Library | - |

## ✨ Funcionalidades

### Dashboard
- Cards com progresso individual de cada cliente (ex: `4/6`)
- Status automático: **Em andamento**, **Concluído** ou **Atrasado**
- Estatísticas: Total, Em andamento, Concluídos, Atrasados
- Filtro dinâmico por nome da empresa, consultor ou contato
- Loading skeleton com efeito shimmer

### Cadastro de Clientes
- Formulário com validação de campos obrigatórios
- Planos disponíveis: Básico, Pro, Enterprise
- Data de início do onboarding

### Checklist de Onboarding
- 6 etapas predefinidas:
  1. Reunião de kickoff realizada
  2. Acesso à plataforma configurado
  3. Integração de SMS ativada
  4. Primeiro fluxo de recuperação criado
  5. Treinamento do time do cliente concluído
  6. Go-live aprovado
- Marcar/desmarcar etapas como concluídas
- Adicionar notas a cada etapa
- Cálculo automático de progresso e status

## 🏗️ Arquitetura

```mermaid
flowchart LR
    A[Frontend React] -->|HTTP /api| B[NestJS Backend]
    B -->|SQL Queries| C[Supabase PostgreSQL]
    B -->|JWT Auth| C
```

**Fluxo de dados:**
1. Frontend faz requisições HTTP para o backend
2. Backend (NestJS) processa e consulta o Supabase
3. Supabase retorna os dados, backend calcula status e progresso
4. Frontend exibe no dashboard com filtros dinâmicos

## 📋 Pré-requisitos

- Node.js >= 18
- npm >= 9
- Conta no [Supabase](https://supabase.com) (gratuita)

## 📦 Instalação

```bash
# Clone o repositório
git clone https://github.com/DanielCamucatto/teste-onbording-maiver.git
cd teste-onbording-maiver

# Instalar dependências do backend
cd backend
npm install

# Instalar dependências do frontend
cd ../frontend
npm install
```

## ⚙️ Configuração

### 1. Supabase

1. Crie um projeto no [Supabase](https://supabase.com/dashboard)
2. No **SQL Editor**, execute o conteúdo do arquivo `supabase/schema.sql`
3. Vá em **Project Settings > API** e copie:
   - `Project URL`
   - `anon public` key

### 2. Backend

Crie o arquivo `backend/.env`:

```env
PORT=3001
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_ANON_KEY=sua-chave-anon-publica
```

### 3. Frontend

O frontend usa proxy do Vite. Verifique `frontend/vite.config.ts`:

```ts
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:3001',
      changeOrigin: true,
    },
  },
},
```

## 🚀 Uso

```bash
# Terminal 1 - Backend
cd backend
npm run start:dev
# Rodando em http://localhost:3001

# Terminal 2 - Frontend
cd frontend
npm run dev
# Rodando em http://localhost:5173
```

Acesse **http://localhost:5173** no navegador.

## 📡 API

### Clientes

| Método | Rota | Descrição |
|--------|------|-----------|
| `GET` | `/api/clients` | Lista todos os clientes |
| `POST` | `/api/clients` | Cria um novo cliente |
| `GET` | `/api/clients/:id` | Busca cliente por ID |

**POST /api/clients** — Exemplo de body:
```json
{
  "company_name": "TechSolutions Ltda",
  "contact_name": "Carlos Silva",
  "email": "carlos@techsolutions.com",
  "phone": "(11) 99999-8888",
  "plan": "Pro",
  "start_date": "2025-05-15",
  "consultant_name": "Jeferson Oliveira"
}
```

### Onboarding

| Método | Rota | Descrição |
|--------|------|-----------|
| `POST` | `/api/onboarding/:clientId/steps` | Cria as 6 etapas para o cliente |
| `GET` | `/api/onboarding/:clientId` | Lista etapas de um cliente |
| `PATCH` | `/api/onboarding/:clientId/steps/:stepId` | Atualiza etapa (completar/nota) |

**PATCH /api/onboarding/:clientId/steps/:stepId**:
```json
{
  "completed": true,
  "note": "Kickoff realizado com sucesso!"
}
```

### Dashboard

| Método | Rota | Descrição |
|--------|------|-----------|
| `GET` | `/api/dashboard` | Lista clientes com progresso e status |
| `GET` | `/api/dashboard?consultor=Nome` | Filtra por consultor |

## 🧪 Testes

```bash
# Backend (25 testes unitários)
cd backend && npm test

# Com cobertura
cd backend && npm run test:cov

# Frontend
cd frontend && npm test
```

**Suites de teste:**
| Serviço | Testes | Cobertura |
|---------|--------|-----------|
| `DashboardService` | 7 | Cálculo de status (ativo/concluído/atrasado), filtro, erros |
| `ClientsService` | 8 | CRUD, busca por ID, filtro por consultor, erros |
| `OnboardingService` | 10 | Criação de etapas, listagem, conclusão, notas, erros |

**Status dos testes:** `25 passed, 25 total` ✅

## 🚀 Deploy

### Frontend (Vercel)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Conecte o repositório na Vercel
2. Diretório: `frontend`
3. Build command: `npm run build`
4. Output directory: `dist`
5. Adicione variável de ambiente (se necessário)

### Backend (Render)

1. Crie um **Web Service** no [Render](https://render.com)
2. Root directory: `backend`
3. Build command: `npm install && npm run build`
4. Start command: `node dist/main.js`
5. Adicione as variáveis de ambiente do `.env`

## 📁 Estrutura do Projeto

```
teste-onbording-maiver/
├── backend/
│   ├── src/
│   │   ├── clients/         # Módulo de clientes (CRUD)
│   │   ├── dashboard/       # Módulo de dashboard (status/progresso)
│   │   ├── onboarding/      # Módulo de onboarding (etapas)
│   │   ├── common/          # Constantes, interfaces, DTOs
│   │   ├── database/        # Conexão Supabase
│   │   └── main.ts          # Entry point
│   ├── dist/                # Build (gerado)
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── components/      # Componentes reutilizáveis
│   │   ├── controllers/     # Hooks personalizados
│   │   ├── views/           # Páginas/Views
│   │   ├── api/             # Chamadas HTTP
│   │   └── styles/          # Estilos globais
│   ├── public/
│   ├── package.json
│   └── vite.config.ts
├── supabase/
│   └── schema.sql           # Script SQL do banco
└── README.md
```

## 📝 Diário de Uso da IA

### 1. Quais ferramentas de IA você usou e por quê?

*Resposta em desenvolvimento...*

### 2. Mostre 2 ou 3 prompts que você usou

*Resposta em desenvolvimento...*

### 3. Qual parte do MVP foi mais difícil de construir com IA?

*Resposta em desenvolvimento...*

### 4. O que você escolheu não construir?

*Resposta em desenvolvimento...*

### 5. O que você faria diferente?

*Resposta em desenvolvimento...*

---

## 📄 Licença

Projeto interno Maiver © 2025
