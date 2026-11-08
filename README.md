# DMD · Estudio Canva Pro — proyecto aparte

Proyecto estático independiente con el Estudio Canva DMD Pro v3.0, extraído
del sitio oficial (repo DMD-BC/DMD) para mantenerlo en su propio proyecto,
igual que el creador de páginas con IA (dmd-paginas-web-ia) y el login
(dmd-login).

- `/` e `/canva.html` — Estudio Canva DMD Pro v3.0 (entrada principal)

## Cómo funciona el estudio (estático, sin backend)

Todo corre **en el navegador, sin servidor ni API**: no hay llamadas a
ningún backend, ni claves, ni Groq/OpenAI. El estudio es un editor de
diseño con Fabric.js sobre un lienzo (`#dmdDesignCanvas`):

- Generador de gráficos por IA local (`canva-ia.js`): arma diseños
  (emblemas, portadas, tarjetas) con plantillas y los envía al lienzo
  editable de Fabric.js.
- Lienzo editable con Fabric.js: el usuario mueve, edita y exporta su
  diseño en el navegador.
- Los enlaces a las demás páginas de DMD (inicio, servicios, posts,
  publicidad, punto de venta, portafolio) apuntan a
  `https://www.dmdmx.dev`, porque esas páginas no viven en este
  proyecto. El enlace "Crear páginas con IA" apunta a
  `https://dmd-paginas-web-ia.vercel.app` y el botón "Acceder" a
  `https://dmd-login.vercel.app`.

## Archivos

- `index.html` (copia de canva.html, es la raíz), `canva.html`
- `canva-ia.js` — motor del estudio (generador + envío al lienzo Fabric)
- `dmd-ai-registry.js` — registro de herramientas IA que carga la página
- `dmd-patch.js` — reescribe a www.dmdmx.dev los enlaces relativos que
  el script oficial genera en el menú móvil y la barra inferior
- `assets/logo-dmd.svg`, `assets/tracker.js`, favicons locales

## Límites honestos

- `style.css` (172 KB), `script.js` (244 KB) y `assets/fabric.min.js`
  (312 KB) se cargan desde `www.dmdmx.dev`, no están copiados aquí:
  son archivos grandes que no caben en una sola llamada de subida y el
  `script.js` es un solo bloque que no se puede partir sin romper su
  lógica (además, ahí vive la inicialización del lienzo Fabric,
  `new fabric.Canvas('dmdDesignCanvas')`, y funciones que usa la página
  como `openPremiumModal`, `addToCart` y el menú móvil). Cargarlos desde
  la oficial mantiene el mismo aspecto y la misma lógica. Si algún día se
  quiere un paquete 100% autocontenido, habría que refactorizar
  `script.js` en módulos y servir Fabric.js desde un CDN.
- El estudio no usa backend ni claves: nada que autorizar en Google
  Cloud ni en ningún servicio.
- No está conectado a Git (la GitHub App no tiene permiso para crear
  repositorios, 403 en el proyecto del login), así que las
  actualizaciones requieren repetir la subida a Vercel o crear el repo
  a mano.
- No se probó el flujo del editor en un navegador real (solo
  verificación HTTP, títulos y presencia de los scripts).
