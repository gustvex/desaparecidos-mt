# ADR 003 — Parsing manual de datas para evitar deslocamento de timezone

**Status:** Accepted  
**Data:** 2026-05-16

## Contexto

A API retorna datas no formato `"2024-03-20"` (ISO 8601, só a parte de data, sem horário). O comportamento padrão de `new Date("2024-03-20")` é interpretar essa string como **UTC midnight** — o que é correto pela especificação, mas produz o dia errado em fusos negativos.

O Brasil usa UTC-3 (ou UTC-4 no horário de Brasília padrão). Quando `new Date("2024-03-20")` cria `2024-03-20T00:00:00Z`, ao converter para horário local o resultado é `2024-03-19T21:00:00-03:00` — ou seja, **o dia anterior**.

Esse bug foi descoberto nos testes unitários de `formatDate`: o teste esperava `"20/03/2024"` para o input `"2024-03-20"`, mas recebia `"19/03/2024"`.

## Decisão

Construção manual da data, extraindo ano, mês e dia como inteiros e passando ao construtor local de `Date`:

```ts
// src/lib/utils.ts — formatDate()
const parts = dateInput.split("T")[0].split("-").map(Number);
date = parts.length === 3
    ? new Date(parts[0], parts[1] - 1, parts[2])  // construtor local, sem UTC
    : new Date(dateInput);
```

`new Date(year, month, day)` — com argumentos numéricos, não uma string — cria a data em **horário local**. O `split("T")[0]` garante que o código funcione tanto para `"2024-03-20"` quanto para `"2024-03-20T00:00:00"`.

## Consequências

- `formatDate` sempre exibe o dia correto independente do fuso do usuário
- **Não simplificar para `new Date(dateString)`** — parece mais limpo, mas re-introduz o bug em qualquer fuso negativo (Brasil, Argentina, Estados Unidos, etc.)
- O teste unitário em `src/lib/utils.test.ts` cobre esse caso explicitamente e serve de guardrail
