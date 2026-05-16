# ADR 005 — Prefetch antecipado e aumento de página para reduzir espera percebida

**Status:** Accepted
**Data:** 2026-05-16

## Contexto

Issue rastreada no **Redmine** do projeto. Mesmo com o cache do TanStack Query já em produção (ADR 001), os usuários continuavam reclamando de espera longa ao navegar pela listagem de pessoas desaparecidas.

O diagnóstico identificou duas lacunas:

1. **O cache só ajudava em páginas já visitadas.** A primeira navegação para qualquer página ainda pagava o custo da API (~minutos por requisição). O usuário típico percorre várias páginas em sequência e era penalizado em cada salto.
2. **`porPagina = 10` exigia muitas requisições para cobrir o dataset.** Para um dataset com 200 registros, eram necessárias 20 requisições — multiplicando o tempo total acumulado de espera.

A persistência em `localStorage` (ADR 001) já cobre o caso de refresh e reabertura do browser, mas não resolvia o cenário primário: **navegar para a próxima página pela primeira vez na sessão**.

## Problema resolvido

> "A API demora a responder e o usuário fica esperando a cada troca de página. Queremos algo em massa para minimizar o tempo de espera percebido."
> — _solicitação registrada no Redmine_

Tradução técnica: precisamos **antecipar** o custo da API antes do usuário pedir, ao invés de reagir ao clique.

## Opções consideradas

| Opção | Análise | Decisão |
|---|---|---|
| Buscar tudo (`porPagina=999`) | Trava no carregamento inicial, estoura limite do `localStorage` (~5 MB), quebra a UX da paginação | Rejeitado |
| `useInfiniteQuery` (scroll infinito) | Mudaria o paradigma de UI; muito invasivo para o ganho | Rejeitado |
| Service Worker offline-first | Complexidade desproporcional ao ganho marginal | Rejeitado |
| **Prefetch de N páginas adjacentes + página maior + `staleTime` agressivo** | Resolve o cenário primário sem mudar a UI, custo de implementação baixo, complementar ao cache já existente | **Aceito** |

## Decisão

Combinar três ajustes complementares:

### 1. `PAGE_SIZE: 10 → 20`

Em `src/services/api.ts`:

```ts
export const PAGE_SIZE = 20;
```

Constante exportada para o resto da aplicação consumir (skeletons, testes). Dobrar o tamanho da página corta pela metade o número de requisições necessárias para percorrer o dataset inteiro. O custo extra na primeira requisição é amortizado pela redução drástica do número total de round-trips.

### 2. Prefetch das próximas N páginas em background

Em `src/pages/MissingList.tsx`:

```ts
const PREFETCH_AHEAD = 2;

useEffect(() => {
    if (!data || isError) return;

    for (let offset = 1; offset <= PREFETCH_AHEAD; offset++) {
        const nextPage = apiPage + offset;
        if (nextPage >= totalPages) break;

        queryClient.prefetchQuery({
            queryKey: ["pessoas", filters, nextPage],
            queryFn: () => fetchPessoas(filters, nextPage),
        });
    }
}, [data, isError, apiPage, totalPages, filtersKey, queryClient, filters]);
```

Quando a página `N` termina de carregar, dispara em background as requisições para `N+1` e `N+2`. Quando o usuário clica em "Próxima", o React Query já tem o resultado em cache → resposta instantânea.

A `queryKey` é idêntica à do `useQuery` principal — o prefetch popula exatamente a mesma entrada que o componente vai consumir, sem duplicação.

### 3. `staleTime: 10 → 30 minutos`

Em `src/lib/queryClient.ts`:

```ts
staleTime: 30 * 60 * 1000,
```

Dados de pessoas desaparecidas não mudam minuto a minuto. Estender a janela de "fresh" evita refetches em background dentro de uma mesma sessão de uso. Combinado com o prefetch, o usuário só paga o custo da API uma vez por trio de páginas adjacentes.

## Tecnologias e por quê

| Tecnologia | Função | Por que essa escolha |
|---|---|---|
| **TanStack Query v5** (`useQuery`, `useQueryClient`, `prefetchQuery`) | Cache em memória, deduplicação de requests, prefetch declarativo | API de prefetch de primeira classe; mesma `queryKey` para fetch e prefetch evita lógica custom de sincronização |
| **`@tanstack/query-sync-storage-persister`** | Persiste o cache em `localStorage` | Mantém o ganho do prefetch entre reloads — uma página prefetchada continua disponível após F5 |
| **`PersistQueryClientProvider`** (App.tsx) | Hidrata o cache do `localStorage` no boot | Já configurado na ADR 001; o prefetch se integra sem código adicional de persistência |
| **`URLSearchParams` + React Router** | Estado da paginação na URL | Permite que cada combinação `{filtros, página}` seja uma `queryKey` distinta e cacheável |

## Arquitetura resultante

```
┌─────────────────────────────────────────────────────────────┐
│  Usuário entra na página N                                  │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
        ┌────────────────────────┐
        │ useQuery(['pessoas',   │
        │  filters, N])          │
        └────────┬───────────────┘
                 │
        ┌────────┴────────┐
        │                 │
        ▼                 ▼
   Cache hit?         Cache miss
   → instantâneo      → fetch (lento)
        │                 │
        └────────┬────────┘
                 │
                 ▼
        ┌──────────────────────────────┐
        │ useEffect: dispara em paralelo│
        │   prefetchQuery(N+1)         │
        │   prefetchQuery(N+2)         │
        └────────────┬─────────────────┘
                     │
                     ▼
        ┌──────────────────────────────┐
        │ Cache popula em background   │
        │ + persiste em localStorage   │
        └──────────────────────────────┘
                     │
                     ▼
        Usuário clica em "Próxima" → cache hit instantâneo
```

## Consequências

| Cenário | Antes (ADR 001) | Depois (ADR 005) |
|---|---|---|
| 1ª visita à página 1 | Espera a API | Espera a API |
| 1ª visita à página 2 | Espera a API | **Instantâneo** (prefetch) |
| 1ª visita à página 3 | Espera a API | **Instantâneo** (prefetch) |
| 1ª visita à página 4 | Espera a API | Espera a API (fora do `PREFETCH_AHEAD=2`) |
| Refresh do browser | Páginas visitadas em cache | Páginas **visitadas + prefetchadas** em cache |
| Sessão longa, mesma página | Refetch a cada 10 min | Refetch a cada 30 min |

**Trade-offs aceitos:**

- A API recebe **3× mais requisições** por sessão de navegação (a atual + duas prefetched). Em background e sem bloquear o usuário, mas é uma carga real adicional no servidor.
- `PREFETCH_AHEAD = 2` é uma escolha arbitrária. Aumentar para 3–4 cobriria mais cenários mas multiplicaria a carga. O valor pode ser ajustado conforme observação de métricas reais.
- Mudar `PAGE_SIZE` invalida o cache persistido implicitamente (queries antigas com `porPagina=10` ficam órfãs no `localStorage` até expirarem por `gcTime`). Aceitável dado que o `gcTime` é de 24 h.

**Pontos de invalidação manual:**

- Se um novo limite de página for testado, ajustar `PAGE_SIZE` em `src/services/api.ts`.
- Para forçar invalidação total do cache persistido (ex: mudança de schema), incrementar `buster` em `src/App.tsx` (ver ADR 001).
