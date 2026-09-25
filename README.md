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
- Ilustraciones de pasteles creadas con CSS como referencias; no se reutilizan fotografías de redes sociales.

## Antes de producción

Validar logo oficial, fotografías autorizadas, precios definitivos, productos exactos de Candy Bar, horarios, correo real del equipo, confirmación de WhatsApp, métodos de pago autorizados y reglas finales de entrega y recolección. Sustituir `localStorage` por base de datos y almacenamiento de archivos, añadir autenticación y controles de acceso, y definir privacidad y consentimiento antes de usar datos reales.

## Verificación

`node qa/run.mjs` ejecuta el recorrido de navegador (requiere Chrome instalado), comprueba las tres categorías, el cálculo, la imagen, el guardado, panel, filtros, WhatsApp manual, estados y producción, y genera capturas en `qa/` para 360, 390, 768, 1024 y 1440 px.
