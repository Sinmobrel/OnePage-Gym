# 09 - Pruebas (No Funcionalidad)

## Rendimiento (básico)
- Tiempo de render inicial de catálogo con N tarjetas (ej. N=8, 20, 50).
- Respuesta de búsqueda/filtrado < 200 ms para dataset mock.
- Generación de PDF < 3 s en dispositivos estándar.

## Usabilidad/Accesibilidad
- Navegación por teclado en filtros y tarjetas.
- `alt` en imágenes, contraste de colores (tokens en `globals.css`).
- Focus visible en botones e inputs.

## Compatibilidad
- Desktop: Chrome/Edge/Firefox.
- Mobile: iOS/Android navegadores modernos.

## Seguridad (front)
- Validación básica de entradas (longitud y caracteres).
- No exponer secretos (no existen en mock).
