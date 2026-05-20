# Central de Onboarding Maiver - Requisitos do Sistema

## 1. Requisitos Funcionais

### RF01 - Cadastro de Clientes
- Formulário com campos: nome da empresa, responsável, e-mail, telefone
- Seleção de plano: Básico, Pro, Enterprise
- Data de início do onboarding
- Consultor responsável (campo de texto livre)
- Validação de campos obrigatórios
- Máscara para telefone

### RF02 - Checklist de Onboarding
- Checklist fixo com 6 etapas predefinidas:
  1. Reunião de kickoff realizada
  2. Acesso à plataforma configurado
  3. Integração de SMS ativada
  4. Primeiro fluxo de recuperação criado
  5. Treinamento do time do cliente concluído
  6. Go-live aprovado
- Marcar/desmarcar etapa como concluída
- Registrar nota opcional por etapa
- Data/hora de conclusão registrada automaticamente

### RF03 - Painel de Acompanhamento (Dashboard)
- Lista de todos os clientes em processo de onboarding
- Barra de progresso individual (ex: "4/6 etapas concluídas")
- Status visual colorido:
  - 🟢 **Em andamento** (dentro do prazo)
  - ✅ **Concluído** (todas etapas finalizadas)
  - 🔴 **Atrasado** (>30 dias sem conclusão)
- Filtro por consultor responsável
- Ordenação por data de início (mais recentes primeiro)

### RF04 - Regras de Negócio (Backend)
- Status 'Atrasado' calculado: onboarding com mais de 30 dias e etapas pendentes
- Status 'Concluído': todas as 6 etapas marcadas como concluídas
- Status 'Em andamento': nenhuma das condições acima
- Data de início considerada para cálculo de dias

## 2. Requisitos Não Funcionais

### RNF01 - Performance
- API deve responder em menos de 500ms para consultas de dashboard
- Frontend deve carregar em menos de 3 segundos

### RNF02 - Usabilidade
- Interface responsiva (mobile first)
- Cores seguindo paleta definida (60/30/20)
- Feedback visual para ações (loading, erro, sucesso)
- Navegação intuitiva entre telas

### RNF03 - Código
- Clean Code: nomes descritivos, funções pequenas, semântica clara
- MVC: Models (interfaces), Controllers (API), Views (React) / Services (NestJS)
- TypeScript estrito em todo o código
- Testes unitários para regras de negócio

### RNF04 - Infraestrutura
- Supabase como banco de dados relacional
- NestJS como API backend no Render
- React + Vite como frontend no Netlify
- Comunicação via REST com JSON
- CORS configurado para domínios do Netlify

### RNF05 - Restrições do Desafio
- Não usar templates prontos de dashboard comprados
- Código gerado com IA, mas revisado pelo desenvolvedor
- Sem autenticação/autorização
- MVP funcional com no máximo `npm run dev` para rodar localmente

## 3. Modelo de Dados

### Tabela: clients
| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | UUID (PK) | Identificador único |
| company_name | TEXT | Nome da empresa |
| contact_name | TEXT | Nome do responsável |
| email | TEXT | Email de contato |
| phone | TEXT | Telefone |
| plan | TEXT | 'Básico', 'Pro', 'Enterprise' |
| start_date | DATE | Data de início do onboarding |
| consultant_name | TEXT | Consultor Maiver responsável |
| created_at | TIMESTAMPTZ | Data de criação do registro |

### Tabela: onboarding_steps
| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | UUID (PK) | Identificador único |
| client_id | UUID (FK) | Referência ao cliente |
| step_name | TEXT | Nome da etapa |
| completed | BOOLEAN | Status de conclusão |
| completed_at | TIMESTAMPTZ | Data/hora da conclusão |
| note | TEXT | Nota opcional sobre a etapa |
| created_at | TIMESTAMPTZ | Data de criação |

## 4. API Endpoints

### Clientes
| Método | Rota | Descrição |
|--------|------|-----------|
| POST | /api/clients | Criar novo cliente |
| GET | /api/clients | Listar todos os clientes |
| GET | /api/clients/:id | Obter detalhes do cliente |

### Onboarding
| Método | Rota | Descrição |
|--------|------|-----------|
| POST | /api/onboarding/:clientId/steps | Iniciar onboarding (criar 6 steps) |
| GET | /api/onboarding/:clientId | Listar steps do cliente |
| PATCH | /api/onboarding/:clientId/steps/:stepId | Atualizar step (concluir/nota) |

### Dashboard
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | /api/dashboard | Listar clientes com progresso e status |
| GET | /api/dashboard?consultant=xxx | Filtrar por consultor |

