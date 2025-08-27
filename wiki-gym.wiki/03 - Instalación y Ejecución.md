# 03 - Instalación y Ejecución

## Requisitos
- Node.js 20+
- pnpm 9+ (recomendado)
- Navegador moderno

## Pasos
```bash
# 1) Instalar dependencias
pnpm install

# 2) Entorno de desarrollo
pnpm dev
# abre http://localhost:3000

# 3) Build de producción
pnpm build

# 4) Iniciar en modo producción
pnpm start
```

> **Nota**: `next.config.mjs` ignora errores de ESLint y TypeScript durante build para facilitar la demo. Ajustar para entornos productivos.
