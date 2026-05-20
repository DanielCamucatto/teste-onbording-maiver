# Desafio Vibe Coding — Desenvolvedor

**Versão 1.0 | Maio 2025**

> Maiver © 2025 — Documento Confidencial

---

## 1. O que é Vibe Coding?

Vibe coding é a prática de desenvolver software usando IA como co-piloto principal — ferramentas como Cursor, Windsurf, GitHub Copilot ou o próprio Claude. O desenvolvedor direciona, valida e toma decisões; a IA executa.

Neste desafio, avaliamos não só o que você entregou, mas como você trabalhou com a IA: a qualidade dos seus prompts, como você validou o código gerado e as escolhas que fez sobre o que construir e o que deixar de fora.

---

## 2. Contexto do Desafio

A Maiver está crescendo e o time de operações precisa de uma ferramenta interna para gerenciar o onboarding de novos clientes. Hoje esse processo é feito manualmente por planilha e e-mail — o que gera retrabalho, esquecimentos e falta de visibilidade.

Seu desafio é construir um MVP funcional dessa ferramenta usando vibe coding. O produto precisa resolver o problema real, mesmo que de forma simples.

---

## 3. O Produto: Central de Onboarding Maiver

Você deve construir uma aplicação web interna com as seguintes funcionalidades:

### Etapa 1 — Cadastro de Clientes *(20 pontos)*

Formulário para cadastrar um novo cliente com:

- Nome da empresa e responsável de contato
- E-mail e telefone
- Plano contratado (ex.: Básico, Pro, Enterprise)
- Data de início do onboarding
- Consultor responsável da Maiver (campo de seleção ou texto livre)

### Etapa 2 — Checklist de Onboarding *(30 pontos)*

Cada cliente deve ter um checklist de etapas de onboarding. O MVP deve ter etapas fixas predefinidas (não precisa ser configurável). Sugestão de etapas:

- Reunião de kickoff realizada
- Acesso à plataforma configurado
- Integração de SMS ativada
- Primeiro fluxo de recuperação criado
- Treinamento do time do cliente concluído
- Go-live aprovado

O consultor responsável deve conseguir marcar cada etapa como concluída e registrar uma nota opcional por etapa.

### Etapa 3 — Painel de Acompanhamento *(30 pontos)*

Uma tela principal (dashboard) que mostra:

- Lista de todos os clientes em onboarding
- Progresso de cada cliente (ex.: barra ou indicador '4/6 etapas concluídas')
- Status visual: **Em andamento** / **Concluído** / **Atrasado** (considere atrasado se o onboarding ultrapassar 30 dias sem conclusão)
- Filtro por consultor responsável

Não é necessário gráficos complexos — clareza e usabilidade importam mais.

### Etapa 4 — Diário de Uso da IA *(20 pontos)*

Este é o diferencial deste desafio. Junto com o código, entregue um documento (pode ser no próprio README) respondendo:

1. Quais ferramentas de IA você usou e por quê?
2. Mostre 2 ou 3 prompts que você usou e o que a IA gerou — funcionou de primeira? O que você precisou corrigir ou redirecionar?
3. Qual parte do MVP foi mais difícil de construir com IA? Como você resolveu?
4. O que você escolheu não construir (ou simplificar) para entregar no prazo? Por quê?
5. O que você faria diferente se tivesse mais tempo?

---

## 4. Stack, Ferramentas e Restrições

### Ferramentas de IA sugeridas para Vibe Coding

| Ferramenta | Como usar no desafio |
|---|---|
| **Cursor** | Editor com IA integrada — o mais recomendado para vibe coding. Free tier disponível. |
| **Windsurf** | Alternativa ao Cursor, muito capaz. Free tier disponível. |
| **GitHub Copilot** | Integra com VS Code. Free tier disponível. |
| **Claude.ai** | Use no browser para gerar, revisar e depurar código. Free tier disponível. |
| **ChatGPT** | Pode ser usado para geração de código e resolução de problemas. Free tier disponível. |

### Frameworks sugeridos (não obrigatórios)

| Framework | Comando para iniciar |
|---|---|
| **React + Vite** | Setup rápido, amplo suporte de IA — `npm create vite@latest` |
| **Next.js** | Ideal se quiser facilitar o deploy no Vercel — `npx create-next-app@latest` |
| **Vue + Vite** | Alternativa mais simples ao React — `npm create vue@latest` |

### Restrições

- O MVP deve rodar com no máximo um comando (ex.: `npm run dev`)
- Não é necessário autenticação/login
- Não use templates prontos de dashboard comprados — o código deve ser gerado no processo com IA

---

## 5. Ambiente Recomendado (tudo gratuito)

Você não precisa pagar nada para completar este desafio. Abaixo estão as opções gratuitas recomendadas para cada parte:

### Ferramentas de IA para Vibe Coding

| Ferramenta | Como acessar (gratuito) |
|---|---|
| **Cursor** | Free tier — editor com IA integrada, ideal para vibe coding. [cursor.com](https://cursor.com) |
| **Windsurf** | Free tier — alternativa ao Cursor, muito capaz. [codeium.com/windsurf](https://codeium.com/windsurf) |
| **GitHub Copilot** | Free tier — integra com VS Code. [github.com/features/copilot](https://github.com/features/copilot) |
| **Claude.ai** | Free tier — pode usar no browser para gerar e revisar código. [claude.ai](https://claude.ai) |

### Ambiente de desenvolvimento

| Ferramenta | Como usar |
|---|---|
| **Node.js** | Instale em nodejs.org — rode o projeto com `npm run dev` |
| **VS Code** | Editor gratuito em code.visualstudio.com |
| **Git + GitHub** | Controle de versão e entrega do repositório. github.com |

### Persistência de dados (escolha um)

| Opção | Quando usar |
|---|---|
| **localStorage / JSON local** | Zero configuração — ideal para MVP rápido |
| **SQLite** | Banco de dados em arquivo único, sem servidor. Instale via npm (better-sqlite3) |
| **Supabase** | PostgreSQL na nuvem, free tier generoso. [supabase.com](https://supabase.com) |

### Dica de configuração mínima

- Instale Node.js e VS Code
- Instale o Cursor (ou use o Copilot no VS Code)
- Crie um repositório no GitHub antes de começar
- Use localStorage para persistência — simples e suficiente para o MVP

> Com essa configuração você consegue começar em menos de 15 minutos.

---

## 6. Critérios de Avaliação

| Critério | Peso |
|---|---|
| MVP funcional e entregável | 30% |
| Qualidade do uso da IA (prompts, iterações, decisões) | 25% |
| UI/UX — clareza e usabilidade da interface | 20% |
| Qualidade do código gerado (estrutura, organização) | 15% |
| Documentação e reflexão crítica | 10% |
| **Total** | **100%** |

---

## 7. Instruções de Entrega

**Prazo:** 3 dias corridos a partir do recebimento deste documento

### O que entregar

- Link do repositório GitHub com o código do MVP
- Link da ferramenta publicada e acessível para teste *(obrigatório — veja opções de deploy gratuito abaixo)*
- README com instruções de acesso + o Diário de Uso da IA (Etapa 4)
- Capturas de tela das telas principais (pode incluir no README)

### Deploy gratuito sugerido

| Plataforma | Como usar |
|---|---|
| **Vercel** | Recomendado para React e Next.js — [vercel.com](https://vercel.com). Deploy com um clique a partir do GitHub. |
| **Netlify** | Funciona com qualquer framework — [netlify.com](https://netlify.com). Arraste a pasta de build ou conecte ao GitHub. |
| **GitHub Pages** | Para projetos estáticos simples — gratuito, integrado ao repositório. |

**E-mail para entrega:** jeferson.dev@maiver.us

Envie os links do repositório e da ferramenta publicada no mesmo e-mail. Dúvidas? Entre em contato pelo mesmo endereço.

---

## 8. Observações Finais

- Não esperamos um produto perfeito — esperamos um produto que funciona e decisões bem justificadas.
- O Diário de Uso da IA vale 20 pontos: um MVP mediano com reflexão honesta pode superar um MVP elaborado sem documentação.
- Você não precisa esconder que usou IA — pelo contrário, queremos ver como você a usa bem.
- Boa sorte! Estamos curiosos para ver o que você vai construir. 💙