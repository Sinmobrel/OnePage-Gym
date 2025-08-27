# 11 - CI-CD y Despliegue

## CI (sugerido)
- Workflow que ejecute:
  - `pnpm install`
  - `pnpm build` (con ESLint/TS habilitados si procede)
- Publicar artefactos o preview.

## Despliegue
- **Vercel** (recomendado para Next.js) o contenedor Docker.
- Variables (no usadas en mock).

### Docker (sugerido)
```Dockerfile
# Etapa de build
FROM node:20-alpine AS build
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN corepack enable && pnpm install --frozen-lockfile
COPY . .
RUN pnpm build

# Etapa de runtime
FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app .
EXPOSE 3000
CMD ["pnpm","start"]
```
