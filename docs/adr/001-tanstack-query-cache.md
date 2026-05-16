# ADR 001 — Client-side cache com TanStack Query

**Status:** Accepted  
**Data:** 2026-05-16

## Contexto

A API externa (`abitus-api.geia.vip`) tem latência na ordem de **minutos** por requisição. Com o hook `useFetchData` original — que não tinha nenhuma camada de cache — cada navegação disparava um novo round-trip completo: trocar de página na listagem, abrir um perfil já visitado, ou simplesmente dar refresh recomeçava a espera do zero.

O problema se manifesta de duas formas:
1. **Dentro da sessão** — navegar para um perfil já visitado espera o mesmo tempo da primeira vez.
2. **Entre sessões** — fechar e reabrir o browser descarta tudo; o usuário espera de novo.

## Opções consideradas

| Opção | Problema |
|---|---|
| Cache manual em `localStorage` | Exige implementar TTL, serialização, invalidação e revalidação em background — tudo na mão |
| SWR | Funcionalidades equivalentes ao React Query, ecossistema menor, persistência não nativa |
| TanStack Query (sem persistência) | Resolve o caso intra-sessão, mas o cache some no refresh |
| **TanStack Query + persistência** | Resolve ambos os casos com zero código de infraestrutura custom |

## Decisão

TanStack Query v5 com `@tanstack/query-sync-storage-persister` salvando o cache no `localStorage`.

### Configuração (`src/lib/queryClient.ts`)

```ts
new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 30 * 60 * 1000,   // 30 minutos — sem nenhuma request durante esse período (ver ADR 005)
            gcTime:    24 * 60 * 60 * 1000, // 24 horas — entrada permanece no cache mesmo sem uso
            retry: 2,
            refetchOnWindowFocus: false,  // API lenta: evita request desnecessária ao trocar aba
        },
    },
});
```

**Por que `refetchOnWindowFocus: false`?** O padrão do React Query é revalidar sempre que a janela ganha foco. Com uma API que demora minutos, isso geraria requests custosas sem benefício perceptível.

**Por que `staleTime` de 30 minutos?** Dados de pessoas desaparecidas são atualizados com baixa frequência. 30 minutos é tempo suficiente para múltiplas navegações dentro da mesma sessão sem nenhuma request — o valor foi ajustado de 10 para 30 min na ADR 005 após análise de uso real.

### Persistência (`src/App.tsx`)

```ts
const persister = createSyncStoragePersister({
    storage: window.localStorage,
    key: 'desaparecidos-mt-cache',
});

<PersistQueryClientProvider
    client={queryClient}
    persistOptions={{ persister, maxAge: 24 * 60 * 60 * 1000, buster: '1' }}
>
```

**`buster`** é a versão do cache persistido. Ao mudar a estrutura dos dados (ex: adicionar campos ao DTO), incrementar esse valor descarta o cache de todos os usuários na próxima abertura. Não fazer isso pode causar erros de runtime se o código novo tentar acessar um campo que o cache antigo não possui.

### Query keys

```ts
// Listagem — cada combinação de filtros + página tem cache próprio
queryKey: ['pessoas', filters, pagina]

// Detalhes — cada perfil é cacheado individualmente
queryKey: ['pessoa', id]
```

`placeholderData: keepPreviousData` na listagem garante que os cards da página atual continuem visíveis enquanto a próxima página carrega, sem flash de tela vazia durante a paginação.

## Consequências

**Comportamento resultante:**

| Situação | Antes | Depois |
|---|---|---|
| 1ª visita | Espera a API | Espera a API |
| 2ª visita ao mesmo resultado (< 10 min) | Espera a API | **Instantâneo** |
| Refresh do browser | Espera a API | **Instantâneo** (cache < 24h) |
| Visita após 10 min | Espera a API | Cache exibido + revalidação silenciosa |
| Após 24h ou mudança de `buster` | — | Espera a API (cache expirado/descartado) |

**Para forçar invalidação total do cache persistido:** incrementar `buster` em `src/App.tsx`.

**Para invalidar programaticamente um subset:**
```ts
queryClient.invalidateQueries({ queryKey: ['pessoas'] });
queryClient.invalidateQueries({ queryKey: ['pessoa', 42] });
```
