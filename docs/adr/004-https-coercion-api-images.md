# ADR 004 — Coerção de HTTP → HTTPS nas URLs de imagem da API

**Status:** Accepted  
**Data:** 2026-05-16

## Contexto

A API retorna URLs de foto no campo `urlFoto` usando o esquema `http://`. Quando a aplicação é servida por `https://`, o browser bloqueia silenciosamente requisições de imagem via `http://` como **mixed content** — a imagem simplesmente não carrega, sem erro visível no console do usuário final.

O problema não é da API (pode não ter controle sobre isso) nem do código de exibição — é uma incompatibilidade estrutural entre o protocolo da aplicação e o da origem das imagens.

## Decisão

Conversão em runtime antes de qualquer uso da URL, centralizada em `src/lib/utils.ts`:

```ts
export const toSecureUrl = (url?: string): string | undefined => {
    if (!url) return undefined;
    return url.replace(/^http:\/\//i, "https://");
};
```

Aplicada em `PersonPhoto.tsx` antes de passar a URL para a tag `<img>`:

```tsx
<img src={toSecureUrl(urlFoto)} ... />
```

**Por que regex com `/i`?** A flag case-insensitive cobre eventuais variações como `HTTP://` que algumas APIs retornam, sem precisar de normalização adicional.

**Por que não corrigir na camada de API (`src/services/api.ts`)?** Seria igualmente válido. A opção de fazer no componente de exibição mantém `api.ts` como espelho fiel da resposta da API, sem transformações de dados — o que facilita depuração quando a resposta muda.

## Consequências

- Imagens carregam corretamente em produção (HTTPS)
- Em desenvolvimento local (HTTP), a coerção é um no-op inofensivo
- **Não remover `toSecureUrl`** achando que é redundante — sem ela as imagens não carregam em produção
- Se a API migrar para HTTPS nativamente, a função vira no-op e pode ser removida junto com seu uso em `PersonPhoto`
