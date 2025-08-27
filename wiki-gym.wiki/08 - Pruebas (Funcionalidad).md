# 08 - Pruebas (Funcionalidad)

**Atributo de Calidad:** *Funcionalidad* (correctitud y adecuación a requisitos).  
**Técnicas:** *Clases de Equivalencia (CE)* y *Valores Límite (VL)*.

## 1) Búsqueda
- **CE**:
  - CE1: Cadena vacía → devuelve lista por defecto (todos o sin filtro).
  - CE2: Texto válido (alfanumérico) → devuelve subset coincidente.
  - CE3: Texto con símbolos/acentos → debe tolerarse y normalizar.
  - CE4: Texto inexistente → lista vacía con estado “sin resultados”.
- **VL**:
  - VL1: Longitud 0.
  - VL2: Longitud 1.
  - VL3: Longitud máxima permitida (p.ej., 100 chars) y 101.
- **Casos**:
  - Q vacío → resultados iniciales.
  - `"Press"` → incluye *Press Banca*, *Press Militar*.
  - `"peso muerto"` → encuentra *Deadlift* (alias).
  - `"@@@@@"` → 0 resultados y mensaje amable.

## 2) Filtros
- **CE**:
  - CE1: Sin filtros → lista completa.
  - CE2: Un filtro por categoría → subset correcto.
  - CE3: Múltiples filtros (AND) → intersección correcta.
  - CE4: Valores no contemplados → ignorar o validar entrada.
- **VL**:
  - VL1: 0 filtros.
  - VL2: 1 valor por categoría.
  - VL3: Número máximo de valores por categoría (p.ej., 5) y 6.
- **Casos**:
  - Grupo=Pecho → solo ejercicios de pecho.
  - Tipo=Compuesto + Equipo=Barra → intersecta correctamente.
  - Nivel=Principiante + Objetivo=Fuerza → coherencia de resultados.

## 3) Gestión de Plan
- **CE**:
  - CE1: Agregar ejercicio no presente → se añade.
  - CE2: Agregar repetido → no duplica / alterna a “ya en plan”.
  - CE3: Quitar existente → se remueve de la lista.
  - CE4: Vaciar → lista queda en 0 y UI muestra estado vacío.
- **VL**:
  - VL1: Plan vacío (0).
  - VL2: 1 ejercicio.
  - VL3: Máximo recomendado (p.ej., 20) y 21.
- **Casos**:
  - Descargar PDF con plan vacío → bloquear y alertar.
  - Descargar PDF con 1..N ejercicios → genera archivo.

## 4) Modal de Detalle
- **CE**:
  - CE1: Abrir modal con ejercicio válido → render correcto.
  - CE2: Cerrar modal → estado retorna.
  - CE3: Agregar desde modal → refleja en plan.
- **VL**:
  - VL1: Técnica con 0, 1 y N pasos.
  - VL2: Músculos/errores con 0 y N elementos.
