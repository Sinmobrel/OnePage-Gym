# 07 - API - Datos Simulados

El proyecto no consume una API real; usa **mock data** en `lib/mock-data.ts`:

- **Modelo** `Exercise` con campos: `id`, `name`, `alias`, `group`, `type`, `equipment`, `level`, `objective`, `image`, `technique[]`, `muscles[]`, `commonErrors[]`, `description`.
- **Funciones**:
  - `searchExercises(query: string)` – filtro por coincidencia en nombre/alias/descripcion.
  - `filterExercises(filters)` – aplica filtros por múltiples categorías.
  - `filterOptions` – catálogo de opciones disponibles para filtros.

> Para un backend futuro: exponer endpoints REST/GraphQL equivalentes y reemplazar `mock-data.ts` por servicios.
