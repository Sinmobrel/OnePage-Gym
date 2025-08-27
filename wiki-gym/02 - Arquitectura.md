# 02 - Arquitectura

## Stack
- **Next.js 15** (App Router) + **React 19** + **TypeScript**.
- **Tailwind CSS v4**, tokens de color en `app/globals.css`.
- **shadcn/ui** (Radix UI) para componentes de interfaz.
- Gestión de estilos: `@tailwindcss/postcss` y `tw-animate-css`.
- Empaquetador Next, configuración en `next.config.mjs` (sin optimización de imágenes, tolerante a errores de lint/ts para build).

## Estructura lógica (alto nivel)
- **Páginas**: `app/page.tsx` (Home y Catálogo con estado condicional).
- **Componentes principales**:
  - `components/header.tsx`: navegación + búsqueda.
  - `components/hero-section.tsx`: hero inicial.
  - `components/how-to-use-section.tsx`: guía rápida de uso.
  - `components/exercise-catalog.tsx`: listado, filtros, grid.
  - `components/exercise-filters.tsx`: panel de filtros (con estado).
  - `components/exercise-card.tsx`: tarjeta con info y acciones.
  - `components/exercise-modal.tsx`: detalle del ejercicio.
  - `components/plan-management.tsx`: gestión del plan y descarga.
- **Datos y utilidades**:
  - `lib/mock-data.ts`: **datos simulados** y funciones `searchExercises`, `filterExercises`, `filterOptions`.
  - `lib/pdf-generator.tsx`: generación de **PDF** vía `window.print()` con HTML estilado.

## Decisiones relevantes
- **Datos en memoria** (mock): velocidad de iteración y demo sin backend.
- **Generación de PDF en cliente**: evita dependencia de servicios externos.
- **Tailwind + shadcn/ui**: desarrollo rápido con diseño consistente.

## Diagrama simple
```
[UI/Next.js] --(eventos de usuario)--> [Estado en page.tsx]
    |                                      |
    +---> [ExerciseCatalog] ----> [mock-data.ts] (search/filter)
    |                                      |
    +---> [PlanManagement] ----> [pdf-generator.tsx]
```
