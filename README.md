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

- Solicitud por pasos para celebración, boda/XV años y Candy Bar; carga y vista previa de imagen.
- Precio estimado calculado en el navegador. `Q375 desde 10 porciones` es la única referencia indicada en los requisitos. **Todos los demás importes son provisionales** y están centralizados en `src/data.ts` bajo `pricingConfig.provisionalDemo`.
- Cotizaciones, cambios de estado, notas, historial y avisos simulados se guardan en `localStorage` **del navegador y dispositivo actual**. No existe base de datos compartida, correo enviado ni sincronización entre usuarios.
- El panel `/admin` carece de autenticación real. El botón de WhatsApp abre un mensaje para envío manual solo si la solicitud contiene un teléfono ingresado en la demo; los registros ficticios no tienen un destino real. El canal WhatsApp de Awake & Bake sigue pendiente de confirmar.
- La aprobación de producción y los estados de pago se registran manualmente en la demo. No se procesan pagos ni se confirma un pedido de forma automática.
- Fotografías de producto provisionales guardadas como WebP locales; no se reutilizan imágenes de Instagram. Las fuentes y el reemplazo están documentados en `public/images/awake-bake/SOURCES.md`, y los metadatos están centralizados en `src/visuals.ts`.
- La galería permite ampliar fotografías, navegar con botones o teclado y cerrar con Escape. Las apariciones al desplazarse respetan `prefers-reduced-motion`.
- La portada usa una secuencia de cinco escenas en `src/ScrollCakeExperience.tsx`, con estilos acotados en `src/scroll-cake.css`. CSS sticky mantiene el escenario bajo el header, sin bloquear el scroll; la página continúa al terminar. Los controles numerados y «Saltar presentación» permiten recorrerla con teclado.

## Presentación controlada por scroll

La sección mide `500svh` en escritorio y `460svh` en móvil. El progreso es `clamp((alturaHeader - section.getBoundingClientRect().top) / (alturaSección - alturaEscenario), 0, 1)`. Un listener pasivo solicita como máximo un `requestAnimationFrame` pendiente; actualiza transformaciones y opacidad directamente, sin re-renderizar React en cada frame. `IntersectionObserver` suspende las actualizaciones fuera de pantalla y todos los listeners, observers y frames se limpian al desmontar. No se añadieron librerías.

En móvil se apilan fotografía y texto, se elimina el desplazamiento lateral y se limita el zoom. Con `prefers-reduced-motion: reduce` o una pantalla de hasta 560 px de alto se presenta la narrativa completa en flujo normal: cinco textos visibles, tres fotos y CTAs accesibles, sin sección alta ni sticky. Las consultas de viewport y el acceso a `window` ocurren en efectos o eventos del cliente; el primer render del componente es estable.

`experienceImages` en `src/visuals.ts` asigna `xv.webp`, `design-help.webp` y `hero.webp` a las escenas. Son fotografías provisionales de terceros ya documentadas, no trabajos acreditados de Awake & Bake. Se sustituyen en el manifiesto sin modificar la animación. La referencia externa de Adidas solo se intentó consultar por su interacción; permaneció en carga y no se copiaron código, imágenes ni composición.

## Antes de producción

Validar logo oficial, fotografías autorizadas, precios definitivos, productos exactos de Candy Bar, horarios, correo real del equipo, confirmación de WhatsApp, métodos de pago autorizados y reglas finales de entrega y recolección. Sustituir `localStorage` por base de datos y almacenamiento de archivos, añadir autenticación y controles de acceso, y definir privacidad y consentimiento antes de usar datos reales.

## Verificación

`node qa/run.mjs` ejecuta el recorrido funcional (requiere Chrome instalado): categorías, cálculo, carga de imagen, guardado, panel, filtros, WhatsApp manual, estados y producción. `node qa/visual.mjs` comprueba las siete rutas en 360, 390, 768, 1024 y 1440 px, fotografías, galería, navegación por teclado y movimiento reducido. Las capturas nuevas se guardan en `qa/visual-2026-09-25/`.

`node qa/scroll.mjs` verifica el build servido en `http://localhost:4173` (o `QA_URL`): cinco escenas en los cinco anchos, sticky y liberación, progreso, zoom, encuadres, teclado, salto de la presentación, CTA al cotizador, movimiento reducido y pantallas bajas. Las capturas por escena y los resultados están en `qa/scroll-experience/`. Una captura de página completa no representa todos los estados de una sección sticky; consultar las capturas por escena.
