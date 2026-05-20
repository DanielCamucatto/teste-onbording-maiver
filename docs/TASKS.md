# Central de Onboarding Maiver - Lista de Tarefas

## FASE 1: Entendimento da Demanda ✅ (Concluída)
- [x] Analisar documento do desafio
- [x] Definir stack tecnológica (React + NestJS + Supabase)
- [x] Definir arquitetura MVC
- [x] Definir paleta de cores (60/30/20)
- [x] Definir modelo de dados
- [x] Escolher plataformas de deploy (Netlify + Render)

## FASE 2: Planejamento ✅ (Concluída)
- [x] Criar estrutura de pastas do projeto
- [x] Definir endpoints da API REST
- [x] Definir regras de negócio (status, cálculo de atraso)
- [x] Definir cronograma de 3 dias
- [x] Criar documentação inicial (PLANEJAMENTO.md, REQUISITOS.md, TASKS.md, AGENTE.md)
- [x] Configurar repositório Git

## FASE 3: Setup do Projeto
- [ ] Criar projeto NestJS no backend/
  - [ ] Instalar dependências (class-validator, @supabase/supabase-js, dayjs)
  - [ ] Configurar módulo database (Supabase client)
  - [ ] Configurar CORS para domínio do Netlify
  - [ ] Configurar variáveis de ambiente (.env)
- [ ] Criar projeto React + Vite no frontend/
  - [ ] Instalar dependências (axios, react-router-dom, dayjs)
  - [ ] Configurar Vite proxy para API local
  - [ ] Configurar tema global com paleta de cores
- [ ] Configurar Supabase
  - [ ] Criar projeto no Supabase
  - [ ] Executar schema.sql (tabelas clients e onboarding_steps)
  - [ ] Configurar RLS (Row Level Security) para acesso anônimo
  - [ ] Obter URL e anon key

## FASE 4: Escrita dos Testes (TDD)
### Backend (NestJS)
- [ ] Teste: Criar cliente com dados válidos
- [ ] Teste: Criar cliente com dados inválidos (validação)
- [ ] Teste: Listar todos os clientes
- [ ] Teste: Iniciar onboarding (criar 6 steps automaticamente)
- [ ] Teste: Concluir etapa do onboarding
- [ ] Teste: Adicionar nota a uma etapa
- [ ] Teste: Calcular status 'Em andamento' (dias <= 30)
- [ ] Teste: Calcular status 'Concluído' (6/6 etapas)
- [ ] Teste: Calcular status 'Atrasado' (dias > 30)
- [ ] Teste: Dashboard listar clientes com progresso

### Frontend (React)
- [ ] Teste: Renderizar formulário de cadastro
- [ ] Teste: Validar campos obrigatórios no formulário
- [ ] Teste: Renderizar checklist com 6 etapas
- [ ] Teste: Marcar etapa como concluída
- [ ] Teste: Renderizar dashboard com lista de clientes
- [ ] Teste: Filtro por consultor funcionando
- [ ] Teste: Status visual correto (cores)
- [ ] Teste: Barra de progresso calculada corretamente

## FASE 5: Desenvolvimento do Backend
- [ ] Implementar ClientsModule
  - [ ] ClientsController (POST, GET)
  - [ ] ClientsService (CRUD no Supabase)
  - [ ] DTOs de validação (CreateClientDto)
- [ ] Implementar OnboardingModule
  - [ ] OnboardingController (POST, GET, PATCH)
  - [ ] OnboardingService (criar steps, concluir, atualizar nota)
  - [ ] DTOs de validação (UpdateStepDto)
- [ ] Implementar DashboardModule
  - [ ] DashboardController (GET com filtro)
  - [ ] DashboardService (listar + calcular status + progresso)
- [ ] Implementar constantes (steps fixos, enums de status e planos)
- [ ] Implementar módulo database (Supabase client singleton)

## FASE 6: Desenvolvimento do Frontend
- [ ] Implementar Views
  - [ ] DashboardView (lista de clientes com progresso)
  - [ ] ClientFormView (cadastro de novo cliente)
  - [ ] OnboardingChecklistView (checklist + notas)
- [ ] Implementar Componentes
  - [ ] Header (navegação e logo)
  - [ ] ClientCard (card do cliente no dashboard)
  - [ ] ProgressBar (barra de progresso visual)
  - [ ] StatusBadge (badge de status colorido)
  - [ ] StepItem (item do checklist)
  - [ ] FilterBar (filtro por consultor)
  - [ ] LoadingSpinner
  - [ ] ErrorMessage
  - [ ] ConfirmDialog (confirmação de ações)
- [ ] Implementar Controllers/Hooks
  - [ ] useClients (CRUD de clientes)
  - [ ] useOnboarding (checklist e steps)
  - [ ] useDashboard (dados do dashboard)
  - [ ] useFilters (estado dos filtros)
- [ ] Implementar Services
  - [ ] api.ts (axios instance com base URL)
  - [ ] clients.api.ts
  - [ ] onboarding.api.ts
  - [ ] dashboard.api.ts
- [ ] Implementar Estilos (CSS Modules)
  - [ ] Tema global (paleta 60/30/20)
  - [ ] Estilos responsivos
  - [ ] Animações de transição

## FASE 7: Configuração de Deploy
### Backend (Render)
- [ ] Configurar variáveis de ambiente no Render
  - [ ] SUPABASE_URL
  - [ ] SUPABASE_ANON_KEY
  - [ ] PORT
  - [ ] FRONTEND_URL (Netlify)
- [ ] Configurar health check endpoint
- [ ] Configurar build automático a partir do GitHub
- [ ] Testar API publicada

### Frontend (Netlify)
- [ ] Configurar variáveis de ambiente no Netlify
  - [ ] VITE_API_URL (URL do backend no Render)
- [ ] Configurar redirects para SPA (evitar 404 em rotas)
- [ ] Conectar repositório GitHub
- [ ] Configurar build automático
- [ ] Testar aplicação publicada

## FASE 8: Testes Finais e QA
- [ ] Rodar testes do backend (Jest)
- [ ] Rodar testes do frontend (Vitest)
- [ ] Testar fluxo completo manualmente
  1. Cadastrar cliente
  2. Verificar criação do onboarding
  3. Concluir etapas com notas
  4. Verificar status no dashboard
  5. Testar filtro por consultor
- [ ] Validar responsividade (mobile, tablet, desktop)
- [ ] Validar cores e identidade visual
- [ ] Testar cenário de atraso (>= 30 dias)

## FASE 9: Documentação e Entrega
- [ ] Escrever README.md completo
  - [ ] Descrição do projeto
  - [ ] Instruções de instalação
  - [ ] Links para aplicações publicadas
  - [ ] Capturas de tela
  - [ ] Diário de Uso da IA
- [ ] Revisar e complementar AGENTE.md
- [ ] Fazer commit final e push
- [ ] Enviar links por e-mail

