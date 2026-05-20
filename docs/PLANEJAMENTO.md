# Central de Onboarding Maiver - Planejamento

## Stack Tecnológica

| Camada | Tecnologia | Deploy |
|--------|-----------|--------|
| Frontend | React + Vite + TypeScript | Netlify |
| Backend | NestJS + TypeScript | Render |
| Banco de Dados | Supabase (PostgreSQL) | - |
| Comunicação | API REST | - |

## Arquitetura

```
maiver-onboarding/
├── frontend/                    # React + Vite
│   ├── src/
│   │   ├── components/          # Componentes reutilizáveis
│   │   ├── controllers/         # Hooks + chamadas API
│   │   ├── models/              # Interfaces TypeScript
│   │   ├── views/               # Páginas (Dashboard, Cadastro, Checklist)
│   │   ├── services/            # Axios client config
│   │   └── styles/              # CSS Modules com paleta definida
│   ├── public/
│   ├── package.json
│   └── vite.config.ts
│
├── backend/                     # NestJS
│   ├── src/
│   │   ├── clients/             # Módulo de clientes (CRUD)
│   │   │   ├── clients.controller.ts
│   │   │   ├── clients.service.ts
│   │   │   ├── clients.module.ts
│   │   │   └── dto/             # Data Transfer Objects
│   │   ├── onboarding/          # Módulo de onboarding (checklist)
│   │   │   ├── onboarding.controller.ts
│   │   │   ├── onboarding.service.ts
│   │   │   ├── onboarding.module.ts
│   │   │   └── dto/
│   │   ├── dashboard/           # Módulo do dashboard (agregação)
│   │   │   ├── dashboard.controller.ts
│   │   │   ├── dashboard.service.ts
│   │   │   └── dashboard.module.ts
│   │   ├── common/              # Constantes, interfaces, enums
│   │   └── database/            # Configuração Supabase client
│   ├── test/                    # Testes unitários
│   ├── package.json
│   └── tsconfig.json
│
├── supabase/
│   └── schema.sql               # Script SQL do banco
│
├── docs/
│   ├── PLANEJAMENTO.md          # Este arquivo
│   ├── REQUISITOS.md            # Requisitos funcionais e não funcionais
│   ├── TASKS.md                 # Lista de tarefas por fase
│   └── AGENTE.md                # Contrato para agente de IA
│
├── README.md
└── .gitignore
```

## Paleta de Cores (Regra 60/30/20)

| Função | Cor | Código | Proporção |
|--------|-----|--------|-----------|
| Primária (fundo) | Preto | #000201 | 60% |
| Secundária (cards) | Verde claro | #8CF3CE | 30% |
| Acento (botões/links) | Verde escuro | #285221 | 20% |
| Texto | Branco | #FFFFFF | - |

## Fluxo de Dados

1. Frontend → Axios → API NestJS → Supabase (PostgreSQL)
2. Regras de negócio (status, cálculos) executadas no NestJS
3. Frontend apenas exibe dados recebidos da API

## Cronograma (3 dias)

| Dia | Foco |
|-----|------|
| 1 | Setup, schema Supabase, escrita de testes |
| 2 | Backend NestJS (controllers, services, DTOs) |
| 2/3 | Frontend React (componentes, views, estilos) |
| 3 | Deploys (Netlify + Render) + Documentação + QA |

## Deploys

| Aplicação | Plataforma | Comando de build |
|-----------|-----------|-----------------|
| Frontend | Netlify | `npm run build` (Vite) |
| Backend | Render | `npm run build` (NestJS) |

