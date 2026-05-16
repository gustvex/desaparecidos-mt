# ADR 002 — Sistema de tokens tipográficos

**Status:** Accepted  
**Data:** 2026-05-16

## Contexto

Os estilos de texto estavam espalhados como utilitários Tailwind avulsos por todos os componentes:

```tsx
<h3 className="text-xl font-bold text-foreground mb-4">
<span className="text-sm font-bold text-foreground flex-shrink-0">
<p className="text-sm text-muted-foreground">
<p className="text-xs text-muted-foreground mt-1">
```

Sem nenhuma convenção de nomenclatura, cada componente tomava suas próprias decisões de tamanho e peso. Mudar a escala tipográfica significava caçar cada ocorrência manualmente. O projeto já tinha um sistema de cores robusto via CSS custom properties — mas nada equivalente para tipografia.

## Opções consideradas

| Opção | Problema |
|---|---|
| Tailwind puro com documentação | Não há nada que force consistência; cada dev faz diferente |
| CSS vars no `:root` sem registro no Tailwind | Disponível em CSS, mas não gera classes utilitárias — exige `style={{}}` ou `@apply` |
| **CSS vars + `@theme inline` + componente CVA** | Type-safe, gera utilidades Tailwind, composável, segue o padrão já existente de cores |

## Decisão

Sistema em três camadas que separa **definição**, **registro** e **uso**.

### Camada 1 — Fonte da verdade (`src/index.css`)

CSS custom properties em `:root`, seguindo o mesmo padrão de indireção já usado pelas cores:

```css
:root {
  /* tamanhos */
  --fs-display:   2.25rem;   /* 36px */
  --fs-heading-1: 1.875rem;  /* 30px */
  --fs-heading-2: 1.5rem;    /* 24px */
  --fs-heading-3: 1.25rem;   /* 20px */
  --fs-body-lg:   1rem;      /* 16px */
  --fs-body:      0.875rem;  /* 14px */
  --fs-label:     0.875rem;  /* 14px */
  --fs-small:     0.75rem;   /* 12px */
  --fs-caption:   0.625rem;  /* 10px */

  /* pesos */
  --fw-regular:   400;
  --fw-medium:    500;
  --fw-semibold:  600;
  --fw-bold:      700;

  /* alturas de linha */
  --lh-tight:    1.25;
  --lh-snug:     1.375;
  --lh-normal:   1.5;
  --lh-relaxed:  1.625;
}
```

### Camada 2 — Registro no Tailwind (`src/index.css`, bloco `@theme inline`)

```css
@theme inline {
  --font-size-display:   var(--fs-display);
  --font-size-heading-1: var(--fs-heading-1);
  /* ... */
  --font-weight-semibold: var(--fw-semibold);
  --line-height-snug:     var(--lh-snug);
  /* ... */
}
```

O Tailwind v4 lê as variáveis `--font-size-*`, `--font-weight-*` e `--line-height-*` do `@theme inline` e gera as classes utilitárias correspondentes: `text-heading-1`, `font-semibold`, `leading-snug`. Isso significa que os tokens são usáveis tanto via componente quanto diretamente em qualquer `className`.

### Camada 3 — Componente (`src/components/ui/typography.tsx`)

Construído com `class-variance-authority` (CVA). Cada variante empacota a combinação correta de tokens para um papel semântico:

```tsx
const typographyVariants = cva("", {
    variants: {
        variant: {
            display:   "text-display font-bold leading-tight",
            h1:        "text-heading-1 font-bold leading-tight",
            h2:        "text-heading-2 font-semibold leading-snug",
            h3:        "text-heading-3 font-semibold leading-snug",
            "body-lg": "text-body-lg leading-relaxed",
            body:      "text-body leading-normal",
            label:     "text-label font-semibold leading-normal",
            small:     "text-small leading-normal",
            caption:   "text-caption leading-normal text-muted-foreground",
        },
        color: {
            default: "text-foreground",
            muted:   "text-muted-foreground",
            primary: "text-primary",
            inherit: "",
        },
    },
});
```

A tag HTML padrão por variante (`h1` → `<h1>`, `body` → `<p>`, `label` → `<span>`) é sobrescrita pelo prop `as` quando necessário.

## Como usar

**Caso padrão — papel semântico:**
```tsx
<Typography variant="h2">Detalhes da Ocorrência</Typography>
<Typography variant="label" color="muted">Idade</Typography>
<Typography variant="body">{person.nome}</Typography>
```

**Trocar a tag mantendo o estilo:**
```tsx
// Estilo de h3, mas renderiza como h4 no DOM
<Typography variant="h3" as="h4">Seção</Typography>
```

**Adicionar classes extras:**
```tsx
<Typography variant="body" color="muted" as="span" className="truncate min-w-0">
    {valor}
</Typography>
```

**Uso direto das classes (fora do componente):**
```tsx
// Quando Typography não for prático (ex: dentro de CardTitle do shadcn)
<span className="text-heading-2 font-semibold">Texto</span>
```

## Consequências

- **Novos elementos de texto** devem usar `<Typography>` em vez de classes avulsas
- **Alterar a escala global:** modificar o valor em `:root` — todos os usos refletem automaticamente
- **Adicionar um nível novo:** definir `--fs-*` em `:root`, registrar em `@theme inline`, opcionalmente adicionar variante no componente
- **`label` e `body` têm o mesmo tamanho de fonte** (`0.875rem`) — a diferença é intencional: `label` é `font-semibold` por padrão, `body` é peso normal. São papéis distintos.
