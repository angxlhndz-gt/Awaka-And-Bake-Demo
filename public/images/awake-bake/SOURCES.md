# Fotografías provisionales de la demo

Estas imágenes son **referencias visuales de terceros**, no fotografías atribuidas a Awake & Bake. Se descargaron localmente en WebP desde las páginas de Unsplash indicadas abajo, publicadas como gratuitas bajo la [licencia de Unsplash](https://unsplash.com/license). Su uso en esta demo es provisional; la selección visual y cualquier uso de marca deben validarse con Awake & Bake antes de presentar el sitio como oficial. No se descargaron imágenes de Instagram ni se depende de su CDN.

El hero utiliza `xv.webp`. En el cotizador, `src/visuals.ts` asigna las imágenes por tipo de solicitud y las vistas de 10, 15, 20 y 25 porciones. **Estas fotos ilustran estilos diferentes; no muestran un producto de Awake & Bake ni verifican las dimensiones indicadas para cada tamaño.** Las medidas son referencias textuales separadas de la fotografía.

| Archivo local | Autor | Fuente |
| --- | --- | --- |
| `hero.webp` | Lucas T Photography | [Pasteles blancos con rosas](https://unsplash.com/photos/three-tiered-white-cakes-decorated-with-pink-roses-and-greenery-Dfm_QyLkIlw) |
| `welcome.webp` | Julia Blumberg | [Pastel rosado](https://unsplash.com/photos/a-pink-cake-sitting-on-top-of-a-table-3b3IxXxnK1A) |
| `celebration.webp` | leyli sadeqian | [Pastel con flores rosadas](https://unsplash.com/photos/a-white-cake-with-pink-flowers-on-top-of-it-CWburPtXtHM) |
| `wedding.webp` | Alexander Mass | [Pastel de boda floral](https://unsplash.com/photos/a-tiered-white-wedding-cake-with-floral-decoration-lD4ei_NHCVI) |
| `candy-bar.webp` | Jonathan Borba | [Mesa de postres](https://unsplash.com/photos/elegant-dessert-table-with-a-white-cake-and-various-pastries-HKes9_amYnE) |
| `custom-design.webp` | David Holifield | [Pastel con flores lilas](https://unsplash.com/photos/white-cake-with-pink-flower-on-top-fpSOMQj2A6I) |
| `xv.webp` | Karie Sconyers | [Pastel blanco de varios niveles](https://unsplash.com/photos/elegant-white-tiered-wedding-cake-with-calla-lilies-3olsktlzxNw) |
| `design-help.webp` | Jonathan Borba | [Pastel con flores rosadas](https://unsplash.com/photos/beautiful-three-tiered-wedding-cake-with-pink-flowers-and-desserts-AnUQUCQelww) |
| `gallery-floral-cake.webp` | David Holifield | [Pastel colorido](https://unsplash.com/photos/pink-and-white-floral-cake-g5bgYkKa8y0) |
| `gallery-wedding-white.webp` | Brooke Balentine | [Pastel blanco floral](https://unsplash.com/photos/a-tiered-wedding-cake-decorated-with-white-flowers-BpnJmu37a2o) |
| `gallery-dessert-table.webp` | Alexander Mass | [Mesa dulce de evento](https://unsplash.com/photos/dessert-table-with-cake-pastries-and-floral-decorations-lZ9ecj4BjHk) |
| `gallery-fruit-cake.webp` | Jeff Chang | [Pastel con fruta](https://unsplash.com/photos/birthday-cake-with-fresh-fruits-and-frosting-dGvCTk9urTg) |
| `gallery-macarons.webp` | Karlis Dambrans | [Macarons rosados](https://unsplash.com/photos/macarons-in-white-ball-selective-focus-photography-oLHk_WLupSc) |
| `gallery-cupcakes.webp` | Jeremy Liew | [Cupcakes](https://unsplash.com/photos/cupcakes-h2Nh6OMFG9U) |
| `closing.webp` | Lucas T Photography | [Pastel de boda blanco](https://unsplash.com/photos/elegant-white-tiered-wedding-cake-with-topper-a4AXm3Kteug) |

## Sustitución

1. Obtener fotografías originales y permiso de uso de Awake & Bake, sin rostros identificables salvo autorización específica.
2. Reemplazar los archivos WebP conservando los nombres anteriores. Si cambian las dimensiones, actualizar `width` y `height` en `src/visuals.ts`.
3. Actualizar `alt`, autor/fuente y la bandera `provisionalDemo` en `src/visuals.ts`; retirar los avisos de demostración solo cuando todas las imágenes visibles estén autorizadas y correspondan a la marca.
4. Ejecutar `npm run build`, `node qa/run.mjs` y `node qa/visual.mjs` y revisar móvil/escritorio.
