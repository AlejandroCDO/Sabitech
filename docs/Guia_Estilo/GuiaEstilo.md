# Guía de estilo de SABITECH WEB

Documento de referencia visual de la aplicación. Recoge los valores que se usan realmente en el código del frontend (`frontend/src`) y las decisiones de diseño que se han seguido.

## 1. Identidad

- **SABITECH** es la marca de las jornadas tecnológicas. **SABITECH WEB** es la aplicación que gestiona sus reservas.
- Logotipo: `frontend/src/assets/logo-sabitech.png`. Icono del navegador y de la barra de navegación: `frontend/src/assets/icons/banner.ico`.
- Tono: cercano, claro y directo, siempre en español. Mensajes cortos, sin tecnicismos ("Tu plaza ha quedado libre", "Debes registrarte o iniciar sesión primero").
- Estilo general: interfaz limpia sobre fondo claro, tarjetas blancas con esquinas redondeadas y un único color de acción (turquesa).

## 2. Color

| Token | Valor | Uso |
|---|---|---|
| `--azul` | `#263444` | Texto principal y títulos |
| `--azul-oscuro` | `#0b183d` | Fondos oscuros, cabeceras y pie de página |
| `--turquesa` | `#00bfa5` | Color de acción: botones principales, foco y estados correctos |
| `--turquesa-oscuro` | `#00a990` | Estado `hover` del botón principal |
| `--fondo` | `#f4f6f9` | Fondo de las páginas |
| `--blanco` | `#ffffff` | Tarjetas y superficies |
| `--borde` | `#dbe2ea` | Bordes de tarjetas, campos y botones de contorno |
| `--texto-suave` | `#5b6673` | Texto secundario y descripciones |
| `--texto-medio` | `#3f4c5c` | Texto de párrafos largos (detalle de charla) |
| `--error` | `#d64545` | Errores, cancelaciones y acciones destructivas |

Colores de apoyo usados en estados:

| Uso | Fondo | Texto |
|---|---|---|
| Botón deshabilitado | `#e3e8ee` | `#7b8694` |
| "Plaza reservada" y avisos de éxito | `#e6f7f4` | `#006b5b` |
| Mensaje de error en un modal | `#fdecec` | `#b42323` |

Reglas de uso:

- El texto sobre turquesa es siempre azul oscuro (`--azul`). No se usa texto blanco sobre turquesa.
- El rojo (`--error`) solo se usa para errores y para acciones que cancelan o eliminan.
- Los contrastes indicados son estimaciones a partir de los valores de color. Hay que comprobarlos con Lighthouse o axe antes de darlos por válidos (ver el apartado 7).

## 3. Tipografía

Las fuentes se cargan desde Google Fonts en `frontend/src/index.css`.

| Familia | Pesos | Uso |
|---|---|---|
| **Montserrat** | 600, 700 | Títulos, botones, etiquetas y números destacados |
| **Inter** | 400, 500, 600 | Texto de párrafo, formularios y navegación |

Escala utilizada:

| Elemento | Tamaño |
|---|---|
| Título principal (hero) | `clamp(42px, 4.6vw, 64px)` |
| Título de sección | `clamp(28px, 2.8vw, 40px)` |
| Título de tarjeta | 20–25 px |
| Texto de párrafo | 15–16 px |
| Botones y campos | 14 px |
| Texto de apoyo (fechas, ubicaciones) | 12–13 px |
| Etiquetas y badges | 9–12 px, mayúsculas con espaciado entre letras |

## 4. Espaciado, radios y sombras

- **Radios:** 8 px en botones y campos, 12 px en tarjetas, 999 px en etiquetas de estado, 50 % en avatares y fechas circulares.
- **Sombra de tarjeta:** `0 8px 24px rgba(38, 52, 68, 0.04)`. En `hover` la tarjeta se eleva ligeramente (`translateY`) y la sombra aumenta.
- **Espaciado:** múltiplos de 4 u 8 px. Hueco habitual entre tarjetas: 24–32 px. Relleno interior de las tarjetas: 18–30 px.
- **Transiciones:** 0,2–0,25 s con `ease`, en `hover` y en la aparición de elementos.

## 5. Componentes

### Botones

| Tipo | Clase | Aspecto | Cuándo usarlo |
|---|---|---|---|
| Principal | `home-boton home-boton--principal` | Fondo turquesa, texto azul, 48 px de alto, Montserrat 14/700 | Acción principal de la pantalla (Reservar plaza) |
| Contorno | `home-boton home-boton--contorno` | Fondo translúcido, borde `--borde` | Acción secundaria (Limpiar filtros, Reintentar) |
| Reserva en tarjeta | `home-boton-reserva` | Variante compacta de 38 px de alto | Botón de reserva dentro de una tarjeta de charla |
| Deshabilitado | `:disabled` | Fondo `#e3e8ee`, texto `#7b8694`, cursor no permitido | Sin plazas, finalizada, cancelada o cargando |
| Plaza reservada | `home-boton-reservada` | Fondo `#e6f7f4`, borde turquesa, texto `#006b5b` | La persona ya tiene plaza en esa charla |
| Cancelar reserva | `reserva-boton-cancelar` | Contorno rojo; se rellena de rojo en `hover` | Cancelar una reserva (siempre con confirmación) |
| Secundario de página | `reservas-boton-secundario` | Fondo blanco, borde `--borde` | Reintentar y Explorar charlas |

### Campos de formulario

- Alto 52 px, radio 8 px, borde `--borde`, fondo `--fondo` y texto de 14 px (`.campo input`).
- Cada campo lleva una etiqueta asociada con `htmlFor` y su mensaje de error enlazado con `aria-describedby` (`FormField.jsx`).
- Estados: foco con borde azul y contorno turquesa visible (`:focus-visible`), error con borde rojo (`.campo.error`) y correcto con borde turquesa (`.campo.exito`).
- Los formularios usan validación propia (`noValidate`) y muestran el mensaje debajo del campo.

### Tarjetas

- **Tarjeta de charla** (`home-tarjeta`, `agenda-tarjeta`): imagen arriba con la fecha en un círculo, temática, título, descripción, ponente, horario, ubicación y dos acciones (Ver detalles y Reservar plaza).
- **Tarjeta de reserva** (`reserva-tarjeta`): imagen, estado, título, ponente, fecha, ubicación y, a la derecha, los botones Ver QR y Cancelar reserva. Toda la tarjeta es clicable y abre el detalle (se puede usar con teclado).
- **Caja de detalle** (`detalle-tarjeta`): fecha, hora, ubicación, plazas y botón de reservar. No se mueve al hacer scroll.

### Etiquetas de estado

| Estado | Clase | Dónde |
|---|---|---|
| Próxima | `agenda-estado--proxima` | Agenda de charlas |
| Plazas agotadas | `agenda-estado--agotada` | Agenda de charlas |
| Finalizada | `agenda-estado--finalizada` | Agenda de charlas |
| Cancelada | `agenda-estado--cancelada` | Agenda de charlas |
| Confirmada | `reserva-badge--confirmada` | Mis reservas |
| Pendiente | `reserva-badge--pendiente` | Mis reservas |
| Charla cancelada | `reserva-badge--cancelada` | Mis reservas |

### Navegación

- **Barra superior** (`Navbar`): logotipo, enlaces (Inicio, Charlas, Ponentes, La comunidad) y a la derecha "Acceder" (con desplegable de Iniciar sesión y Registrarse) o "Mis reservas" con la foto de perfil si hay sesión.
- **Menú móvil:** botón de tres rayas (`menu-toggle`) con `aria-expanded`.
- **Migas de pan:** en el detalle de charla y en Mis reservas (`aria-label="Migas de pan"`).
- **Pie de página** (`Footer`): logotipo, enlaces de agenda y reservas, y datos legales.

### Modal de confirmación

`ModalConfirmacion` se usa para acciones que no se pueden deshacer (por ejemplo cancelar una reserva). Tiene un título, un mensaje con el nombre de la charla y dos botones: "Volver" (secundario, con el foco inicial) y la acción en rojo. Se cierra con Escape o pulsando el fondo, salvo mientras carga. Es un `alertdialog` con `aria-modal`.

### Estados de la interfaz

| Estado | Cómo se muestra |
|---|---|
| Cargando | Spinner y texto con `role="status"` (`home-estado`, `reservas-estado`) |
| Vacío | Icono, título y botón de salida ("No tienes reservas", "No se han encontrado charlas") |
| Error | Mensaje con `role="alert"` y botón "Reintentar" |
| Éxito | Aviso verde suave (`reservas-aviso`) que desaparece a los 6 segundos |

## 6. Diseño adaptable (responsive)

El diseño se adapta a móvil, tableta y escritorio con `@media (max-width)`. Puntos de corte usados: 1100, 1000, 768/760, 650, 520/480 y 420 px.

| Pantalla | Escritorio | Móvil |
|---|---|---|
| Inicio y agenda | Rejilla de tarjetas de varias columnas | Una columna |
| Barra superior | Enlaces visibles | Menú de tres rayas |
| Detalle de charla | Dos columnas (contenido y caja de datos) | Una columna |
| Mis reservas | Tarjeta en fila (imagen, datos y botones) | Tarjeta en columna con botones a ancho completo |
| Modal | Botones a la derecha | Botones apilados |

Se incluye `<meta name="viewport">` en `index.html` y no hay desplazamiento horizontal en los tamaños habituales.

## 7. Accesibilidad

Aplicado en la aplicación:

- Idioma de la página `lang="es-ES"`.
- Formularios con etiquetas, `aria-invalid` y `aria-describedby`.
- `alt` descriptivo en imágenes informativas y `aria-hidden` en iconos decorativos.
- Foco visible con `:focus-visible` en botones y campos.
- Roles `status` y `alert` para cargas, errores y avisos.
- Tarjetas de reserva operables con teclado (Enter y Espacio).
- Animaciones con `prefers-reduced-motion` en inicio, detalle y modal.

Pendientes conocidos (a revisar y registrar con Lighthouse o axe):

- Medir el contraste real del turquesa y de los textos pequeños de 9–11 px.
- Añadir `<main>` en las vistas que no lo tienen (inicio, detalle, plaza confirmada y Mis reservas).
- Completar `prefers-reduced-motion` en autenticación, barra superior y reservas.
- Añadir un enlace "saltar al contenido".

## 8. Recursos gráficos

| Recurso | Ubicación | Notas |
|---|---|---|
| Imagen principal | `assets/hero-sabitech.jpg` | Unos 81 KB |
| Imagen de comunidad | `assets/comunidad-sabitech.jpg` | Unos 87 KB |
| Logotipo | `assets/logo-sabitech.png` | Pesa 1,1 MB: conviene pasarlo a SVG o WebP |
| Icono | `assets/icons/banner.ico` | Barra de navegación y pie |
| Imagen por defecto | `assets/images/default.png` | Foto de perfil y charlas sin imagen |

- Las imágenes de las tarjetas usan `loading="lazy"` y una imagen de respaldo (`onError`) si la URL falla.
- Los iconos son SVG en línea (calendario, ubicación, reloj, entrada, usuario).
- Pendiente: registrar la autoría y la licencia de cada imagen.

## 9. Mejoras recomendadas

1. Mover las variables de color a un único `:root` en `frontend/src/index.css`. Ahora cada vista las redeclara y algunos valores ya difieren:
   - `--borde`: `#dbe2ea`, `#c6cbd1` y `#d3d6d9`.
   - `--texto-suave`: `#5b6673` y `#5b6878`.
2. Crear un componente de botón común en lugar de varios con prefijos distintos (`home-boton`, `reserva-boton-qr`, `modal-boton`).
3. Reutilizar las tarjetas de charla de inicio y agenda, que hoy están duplicadas.
4. Optimizar el logotipo y registrar las licencias de las imágenes.
