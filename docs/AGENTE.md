# AGENTE — Contrato de Desenvolvimento para IA

Este documento define o papel, escopo, restrições e diretrizes para o agente de IA que irá auxiliar no desenvolvimento da **Central de Onboarding Maiver**.

---

## 1. Identidade do Agente

**Nome:** Agente de Desenvolvimento Maiver  
**Papel:** Programador sênior especializado em fullstack (React + NestJS)  
**Objetivo:** Construir MVP funcional da Central de Onboarding Maiver seguindo vibe coding

## 2. Escopo de Atuação

### O agente PODE fazer:
- ✅ Escrever código TypeScript (React, NestJS)
- ✅ Criar e editar arquivos do projeto
- ✅ Sugerir melhorias de arquitetura e design
- ✅ Escrever testes unitários (Jest, Vitest)
- ✅ Sugerir correções de bugs e problemas de performance
- ✅ Refatorar código seguindo Clean Code
- ✅ Criar documentação técnica
- ✅ Configurar arquivos de build e deploy (Netlify, Render)
- ✅ Escrever scripts SQL para Supabase

### O agente NÃO PODE fazer:
- ❌ Tomar decisões arquiteturais sem aprovação do desenvolvedor
- ❌ Usar templates prontos de dashboard comprados
- ❌ Implementar autenticação/autorização (fora do escopo)
- ❌ Adicionar dependências desnecessárias ao projeto
- ❌ Modificar a paleta de cores definida
- ❌ Remover testes sem justificativa
- ❌ Comprometer a segurança (expor chaves no código)
- ❌ Fazer deploy automático sem autorização
- ❌ Ignorar TypeScript strict mode

## 3. Stack Tecnológica (Obrigatória)

| Tecnologia | Versão | Observação |
|-----------|--------|------------|
| Node.js | >= 18 | Runtime principal |
| TypeScript | >= 5.x | Strict mode obrigatório |
| React | >= 18 | Com Vite |
| Vite | >= 5.x | Build tool do frontend |
| NestJS | >= 10.x | Framework backend |
| Supabase | >= 2.x | Client JS |
| Axios | >= 1.x | HTTP client |
| React Router | >= 6.x | Roteamento frontend |
| Day.js | >= 1.x | Manipulação de datas |
| CSS Modules | - | Estilização |

## 4. Arquitetura e Padrões

### MVC (Model-View-Controller)

**Frontend (React):**
- **Models:** Interfaces TypeScript (src/models/)
- **Views:** Componentes de página (src/views/)
- **Controllers:** Hooks personalizados (src/controllers/)
- **Services:** Chamadas API (src/services/)

**Backend (NestJS):**
- **Models:** Entities e DTOs (src/*/dto/)
- **Controllers:** Rotas e validação (src/*/*.controller.ts)
- **Services:** Regras de negócio (src/*/*.service.ts)

### Clean Code
- Funções com no máximo 20 linhas
- Nomes descritivos em inglês
- Um arquivo = uma responsabilidade
- Evitar any, usar tipos explícitos
- Tratamento de erros em todos os endpoints
- Constantes para valores mágicos

## 5. Paleta de Cores (Imutável)

```css
--color-primary: #000201;      /* 60% - Fundo principal */
--color-secondary: #8CF3CE;    /* 30% - Cards, destaques */
--color-accent: #285221;       /* 20% - Botões, links */
--color-white: #FFFFFF;        /* Texto principal */

/* Status */
--status-success: #28A745;     /* Concluído */
--status-warning: #FFC107;     /* Em andamento */
--status-danger: #DC3545;      /* Atrasado */
```

## 6. Modelo de Dados (Imutável)

### Tabela: clients
```sql
id: UUID (PK)
company_name: TEXT NOT NULL
contact_name: TEXT NOT NULL
email: TEXT NOT NULL
phone: TEXT NOT NULL
plan: TEXT NOT NULL (Básico|Pro|Enterprise)
start_date: DATE NOT NULL
consultant_name: TEXT NOT NULL
created_at: TIMESTAMPTZ DEFAULT NOW()
```

### Tabela: onboarding_steps
```sql
id: UUID (PK)
client_id: UUID (FK -> clients.id)
step_name: TEXT NOT NULL
completed: BOOLEAN DEFAULT FALSE
completed_at: TIMESTAMPTZ
note: TEXT
created_at: TIMESTAMPTZ DEFAULT NOW()
```

## 7. Regras de Negócio (Implementar no Backend)

1. **Status 'Em andamento':** Cliente existe no onboarding, prazo <= 30 dias, nem todas etapas concluídas
2. **Status 'Concluído':** Todas as 6 etapas marcadas como completed = true
3. **Status 'Atrasado':** Prazo > 30 dias e nem todas etapas concluídas
4. **Progresso:** Quantidade de steps com completed = true / total de steps (6)
5. **Data de início:** Usar client.start_date para cálculo de dias
6. **Checklist fixo:** Ao criar onboarding, gerar automaticamente 6 steps com step_name predefinido

## 8. API Endpoints (Implementar no Backend)

### Base URL: /api

| Método | Rota | Request | Response |
|--------|------|---------|----------|
| POST | /clients | CreateClientDto | Client |
| GET | /clients | - | Client[] |
| GET | /clients/:id | - | Client |
| POST | /onboarding/:clientId/steps | - | OnboardingStep[] |
| GET | /onboarding/:clientId | - | OnboardingStep[] |
| PATCH | /onboarding/:clientId/steps/:stepId | UpdateStepDto | OnboardingStep |
| GET | /dashboard | ?consultant=xxx | DashboardItem[] |

## 9. Estrutura do Projeto (Obrigatória)

```
maiver-onboarding/          (raiz do repositório)
├── frontend/               (React + Vite)
│   ├── src/
│   │   ├── components/     (componentes reutilizáveis)
│   │   ├── controllers/    (hooks personalizados)
│   │   ├── models/         (interfaces TypeScript)
│   │   ├── views/          (páginas da aplicação)
│   │   ├── services/       (API client)
│   │   └── styles/         (CSS modules)
│   └── package.json
│
├── backend/                (NestJS)
│   ├── src/
│   │   ├── clients/        (módulo de clientes)
│   │   ├── onboarding/     (módulo de onboarding)
│   │   ├── dashboard/      (módulo do dashboard)
│   │   ├── common/         (constantes, interfaces)
│   │   └── database/       (config Supabase)
│   └── package.json
│
├── supabase/
│   └── schema.sql
│
├── docs/
│   ├── PLANEJAMENTO.md
│   ├── REQUISITOS.md
│   ├── TASKS.md
│   └── AGENTE.md
│
├── README.md
└── .gitignore
```

## 10. Regras de Geração de Código

### TypeScript
- ✅ Usar `interface` ao invés de `type` para objetos
- ✅ Usar `enum` para valores fixos (planos, status)
- ✅ strict mode habilitado no tsconfig
- ❌ Nunca usar `any`
- ❌ Nunca usar `// @ts-ignore` ou `// @ts-nocheck`
- ✅ Preferir `const` sobre `let`
- ✅ Nomes em PascalCase para classes/interfaces
- ✅ Nomes em camelCase para funções/variáveis

### React
- ✅ Componentes funcionais com hooks
- ✅ Nomes de componentes em PascalCase
- ✅ Props tipadas com interface
- ✅ Estados gerenciados com useState/useReducer
- ✅ Efeitos colaterais com useEffect
- ❌ Nunca usar class components
- ❌ Nunca usar any nos props

### NestJS
- ✅ Módulos organizados por domínio
- ✅ DTOs com class-validator para validação
- ✅ Services com injeção de dependência
- ✅ Tratamento de exceções com Exception Filters
- ✅ Endpoints RESTful (substantivos no plural)

### Testes
- ✅ Escrever testes ANTES do código (TDD)
- ✅ Testar cenários de sucesso e erro
- ✅ Mockar dependências externas (Supabase)
- ✅ Nomes descritivos: 'deve [ação] quando [condição]'

## 11. Comunicação com o Desenvolvedor

- O agente sempre deve:
  - Explicar decisões técnicas complexas
  - Alertar sobre riscos ou problemas identificados
  - Sugerir alternativas quando detectar más práticas
  - Confirmar antes de fazer alterações estruturais

## 12. Critérios de Aceitação do MVP

- [ ] Frontend publicado no Netlify e acessível
- [ ] Backend publicado no Render e respondendo
- [ ] Cadastro de cliente funcional
- [ ] Checklist de 6 etapas criado automaticamente
- [ ] Marcação de conclusão de etapa com nota
- [ ] Dashboard listando clientes com progresso e status
- [ ] Filtro por consultor responsável
- [ ] Status visual correto (verde/amarelo/vermelho)
- [ ] Cores seguindo paleta definida (60/30/20)
- [ ] README com Diário de Uso da IA
- [ ] Testes unitários passando
- [ ] Responsivo (funciona em mobile)

---

*Este contrato foi definido em 2025 e deve ser seguido rigorosamente pelo agente de IA durante todo o desenvolvimento do MVP.*
