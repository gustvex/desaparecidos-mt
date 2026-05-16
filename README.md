# desaparecidos-mt

Projeto pessoal desenvolvido como modelo de implementação — uma SPA simples, bem estruturada e com boas práticas aplicadas. Consome a [API pública da Polícia Judiciária Civil de Mato Grosso](https://abitus-api.geia.vip) para exibir e gerenciar registros de pessoas desaparecidas.

> Usado para praticar componentização, tipagem, testes unitários e organização de projeto React em escala real.

---

## Stack

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white&style=flat-square)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white&style=flat-square)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white&style=flat-square)
![TailwindCSS](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss&logoColor=white&style=flat-square)
![Vitest](https://img.shields.io/badge/Vitest-4-6E9F18?logo=vitest&logoColor=white&style=flat-square)

**React 19 · TypeScript · Vite · Tailwind CSS v4 · shadcn/ui · React Router v7 · Axios · Vitest**

---

## Funcionalidades

- Listagem de pessoas desaparecidas com paginação
- Filtros por nome, status, sexo e faixa etária
- Página de detalhes com status visual (`Desaparecida`, `Localizada Viva`, `Localizada Morta`)
- Formulário para envio de informações com upload de fotos
- Tema claro / escuro / sistema

---

## Como rodar

**Pré-requisito:** Node.js 20+

```bash
git clone https://github.com/gustvex/desaparecidos-mt.git
cd desaparecidos-mt
cp .env.example .env
npm install
npm run start
```

Acesse `http://localhost:5173`

### Com Docker

```bash
docker build -t desaparecidos-mt .
docker run -p 8080:80 desaparecidos-mt
```

Acesse `http://localhost:8080`

### Testes

```bash
npm run test:run
```

---

## Estrutura

```
src/
├── components/
│   ├── missing/      # listagem e busca
│   ├── details/      # página de detalhes
│   ├── shared/       # StatusBadge, EmptyState, LoadingOverlay
│   └── ui/           # shadcn/ui
├── services/         # chamadas à API
├── types/            # interfaces TypeScript
├── lib/
│   ├── hooks/        # useFetchData
│   └── utils.ts      # formatDate, getFieldValue, calculateDaysMissing
└── pages/
```
