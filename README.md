# Awake & Bake — demo conceptual

Sitio público y panel administrativo demostrativo para explorar solicitudes de cotización de pasteles. **No es un sistema final ni emite cotizaciones oficiales.**

## Ejecutar

```bash
npm install
npm run dev
```

Abrir `http://localhost:5173`. Para compilar: `npm run build`. Para servir la compilación: `npm run start`.

## Desplegar en Vercel

Importar este directorio como proyecto Vite. Vercel detecta `npm run build` y publica `dist/`. `vercel.json` dirige las rutas internas al frontend. No se requieren variables de entorno ni claves API.

## Funciones de demostración

- Solicitud progresiva para celebración, boda/XV años y Candy Bar; carga y vista previa de imagen.
- Precio estimado calculado en el navegador. `Q375 desde 10 porciones` es la única referencia indicada en los requisitos. **Todos los demás importes son provisionales** y están centralizados en `src/data.ts` bajo `pricingConfig.provisionalDemo`.
- Cotizaciones, cambios de estado, notas, historial y avisos simulados se guardan en `localStorage` **del navegador y dispositivo actual**. No existe base de datos compartida, correo enviado ni sincronización entre usuarios.
- El panel `/admin` carece de autenticación real. El botón de WhatsApp abre un mensaje para envío manual solo si la solicitud contiene un teléfono ingresado en la demo; los registros ficticios no tienen un destino real. El canal WhatsApp de Awake & Bake sigue pendiente de confirmar.
- La aprobación de producción y los estados de pago se registran manualmente en la demo. No se procesan pagos ni se confirma un pedido de forma automática.
- Fotografías de producto provisionales guardadas como WebP locales; no se reutilizan imágenes de Instagram. Las fuentes y el reemplazo están documentados en `public/images/awake-bake/SOURCES.md`, y los metadatos están centralizados en `src/visuals.ts`.
- La galería permite ampliar fotografías, navegar con botones o teclado y cerrar con Escape. Las apariciones al desplazarse respetan `prefers-reduced-motion`.
- La portada usa un hero de dos columnas en `src/PublicHero.tsx` y `src/public-hero.css`. Ocupa el flujo normal de la página y desvanece ligeramente texto e imagen al desplazarse. En móvil, el texto precede a la imagen. Con movimiento reducido no se aplican desplazamientos ni opacidad.

## Cotizador progresivo

`QuoteFlow` mantiene el modelo y cálculo existentes en `src/data.ts` y el guardado en `localStorage` con la clave `awake-bake-demo-v1`. Ocho secciones desplegables muestran tipo de producto, contacto, porciones o productos, diseño, fecha, modalidad, estimación y revisión. La selección del producto, porciones y modalidad abre la siguiente sección; los grupos de datos avanzan al completarse. Los encabezados anteriores permiten editar sin perder lo capturado. El envío sigue requiriendo una revisión y aceptación explícita.

`quoteTypeImages` y `portionPreviewMap` en `src/visuals.ts` centralizan las fotografías locales WebP y la información de referencia para 10, 15, 20 y 25 porciones. **Las fotografías no acreditan medidas exactas ni trabajos de Awake & Bake.** Las medidas son las referencias recogidas del cliente; la imagen de cada opción es solo ilustrativa y deberá sustituirse por una original autorizada. En móvil el resumen aparece como tarjeta normal al final del formulario. `prefers-reduced-motion` quita las transiciones y el desplazamiento automático.

El hero usa `xv.webp`. Las tarjetas del cotizador usan `celebration.webp`, `wedding.webp` y `candy-bar.webp`; las vistas de porciones usan `celebration.webp`, `custom-design.webp`, `design-help.webp` y `closing.webp`. Todas son referencias provisionales de terceros documentadas en `public/images/awake-bake/SOURCES.md`.

## Antes de producción

Validar logo oficial, fotografías autorizadas, precios definitivos, productos exactos de Candy Bar, horarios, correo real del equipo, confirmación de WhatsApp, métodos de pago autorizados y reglas finales de entrega y recolección. Sustituir `localStorage` por base de datos y almacenamiento de archivos, añadir autenticación y controles de acceso, y definir privacidad y consentimiento antes de usar datos reales.

## Verificación

`node qa/run.mjs` ejecuta el recorrido funcional sobre `http://localhost:4173` (o `QA_URL`): hero y fade, imágenes por tipo, cuatro porciones, edición de elecciones, carga de imagen, envío, panel, filtros, WhatsApp manual, estados, Candy Bar y producción. Las capturas están en `qa/progressive-2026-09-25/`.

`node qa/visual.mjs` comprueba las siete rutas en 360, 390, 768, 1024 y 1440 px, fotografías, galería, navegación por teclado y movimiento reducido. Sus capturas están en `qa/visual-2026-09-25/`.
