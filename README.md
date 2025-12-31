# Y AHORA QUÉ — GitHub Starter (Tigre Beta)

Este repo es un **starter** para ejecutar YAQ como producto real con:
- **MVP de 3 cartas** (Gastronomía / Escapadas / Objetos)
- **Sets por ciudad** (arrancamos con Tigre, Buenos Aires)
- **Web app** (Next.js) + **API** (Express) + **data seeds**
- Documentación en `/docs` para no perder el ADN del producto

> Objetivo del MVP: que el usuario **decida en 30–60s** con 3 cartas y cierre (o 1 re-tirada máximo).

## Estructura
- `apps/web` — Front (Next.js, App Router)
- `apps/api` — API (Express)
- `packages/shared` — Tipos, utilidades, tokens (design system)
- `data/cards` — Sets de cartas (JSON) por ciudad/etapa
- `docs` — Producto, operación, métricas, roadmap
- `scripts` — utilidades (validación de cartas, etc)

## Quickstart (local)
Requisitos: Node 18+

### 1) API
```bash
cd apps/api
npm install
npm run dev
```
API queda en `http://localhost:4000`

### 2) Web
En otra terminal:
```bash
cd apps/web
npm install
npm run dev
```
Web queda en `http://localhost:3000`

## Qué vas a ver
- Onboarding mínimo
- Selección: Tema → Subcategoría → **3 cartas**
- Botón de **Re-tirar** (solo 1 vez)
- Botón de **Cerrar** (simulado por ahora)

## Próximos pasos recomendados
1. Reemplazar cartas plantilla por **partners reales de Tigre**
2. Activar tracking (UTM/afiliado) en `closeUrl`
3. Implementar eventos (tiempo a decisión, pick-rate, click-to-close)
4. Soporte + Garantía YAQ (Plan B obligatorio)

## Licencia
MIT — ver `LICENSE`
