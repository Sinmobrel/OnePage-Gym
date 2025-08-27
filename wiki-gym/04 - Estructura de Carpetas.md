# 04 - Estructura de Carpetas

```
app/
  layout.tsx
  page.tsx
  globals.css
components/
  header.tsx
  hero-section.tsx
  how-to-use-section.tsx
  exercise-catalog.tsx
  exercise-card.tsx
  exercise-filters.tsx
  exercise-modal.tsx
  plan-management.tsx
  ui/...(botones, inputs, etc. de shadcn/ui)
lib/
  mock-data.ts      (datos y funciones de búsqueda/filtrado)
  pdf-generator.tsx (plantilla y flujo para exportar PDF)
public/
  ... imágenes de ejercicios y placeholders
styles/
  globals.css (si aplica)
```

## Puntos clave
- **`mock-data.ts`** define el modelo `Exercise` y listas predefinidas (p. ej. `filterOptions`), además de `searchExercises` y `filterExercises`.
- **`pdf-generator.tsx`** genera una ventana de impresión con HTML + CSS embebido para exportar el plan en PDF.
