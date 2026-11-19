# Frontend

El frontend es una aplicación React creada con Vite. Su función es mostrar el catálogo de charlas, permitir el registro y el login y gestionar las reservas del asistente. No guarda reglas de negocio propias: **la API es la que decide** si una reserva es válida.

## 1. Tecnologías

| Tecnología | Uso |
|---|---|
| React 19 | Componentes y estado de la interfaz |
| Vite 8 | Servidor de desarrollo y compilación |
| JavaScript moderno | Módulos, clases y funciones |
| CSS | Estilos por vista y componentes |
| Fetch API | Comunicación con el backend |
| Google Fonts | Tipografías Inter y Montserrat |

## 2. Estructura

```text
frontend/src/
├── api/                 Llamadas a la API y error común
│   ├── ApiError.js
│   ├── authApi.js
│   ├── charlasApi.js
│   ├── reservasApi.js
│   └── usersApi.js
├── assets/              Logos, imágenes y avatar por defecto
├── components/          Navbar, footer, formularios y modal
├── hooks/               useCharlasReservadas
├── models/              Charla y User
├── utils/               Gestión del token
├── views/               Pantallas de la aplicación
├── App.jsx              Estado global y navegación
├── App.css
├── index.css            Estilos base y variables
└── main.jsx             Punto de entrada
```

## 3. Vistas y componentes

| Elemento | Responsabilidad |
|---|---|
| `App.jsx` | Decide qué vista se muestra, mantiene usuario y sesión y actualiza el hash |
| `Navbar` | Navegación, acceso a login/registro, reservas y perfil |
| `Footer` | Información común de SABITECH |
| `MainView` | Página de inicio, charlas destacadas y llamada a la acción |
| `CharlasView` | Agenda completa, búsqueda, filtros y reserva desde tarjeta |
| `CharlaDetalleView` | Detalle de una charla y botón de reserva |
| `PlazaConfirmadaView` | Confirmación visual después de reservar |
| `LoginView` | Formulario de acceso y opción “Recordarme” |
| `RegisterView` | Formulario de alta con validaciones |
| `MisReservasView` | Listado de reservas, modal de cancelación y avisos |
| `ReservaDetalleView` | Detalle de una charla desde una reserva |
| `PerfilView` | Datos de la cuenta y cierre de sesión |
| `ModalConfirmacion` | Diálogo accesible para confirmar la cancelación |
| `FormField` | Campo reutilizable con error, éxito y mostrar/ocultar contraseña |
| `useCharlasReservadas` | Consulta las reservas y devuelve un `Set` con los IDs reservados |

## 4. Estado y navegación

`App.jsx` mantiene:

- `logeado`: si hay una sesión válida.
- `usuario`: datos del usuario autenticado.
- `vista`: pantalla actual (`inicio`, `charlas`, `login`, `registro`, `reservas`, `detalleReserva`, `perfil`).
- `charlaIdDetalle`: charla abierta desde una reserva.
- `detalleAbierto`: indica si hay un detalle abierto para cambiar el hash.
- `mensajeRegistro`: mensaje de éxito que se muestra en el login.

La navegación se hace con estado y `window.history.replaceState`. No se usa React Router para no añadir una dependencia en este primer prototipo. La contrapartida es que las URLs no son enlaces profundos completos y que recargar una vista interna vuelve al inicio.

## 5. Sesión

1. `LoginView` llama a `POST /api/login`.
2. Si el usuario marca “Recordarme”, el token se guarda en `localStorage`; si no, en `sessionStorage`.
3. `getToken()` busca primero en `localStorage` y después en `sessionStorage`.
4. Al arrancar, `App.jsx` comprueba el token con `GET /api/usuario`.
5. Si la API devuelve `401`, se borra la sesión y se vuelve al login.
6. Al cerrar sesión se llama a `POST /api/logout` y se limpian ambos almacenamientos.

El token se envía en la cabecera `Authorization: Bearer <token>`.

## 6. Capa de API

| Módulo | Funciones | Endpoints |
|---|---|---|
| `authApi.js` | `login`, `register`, `logout` | `POST /login`, `POST /register`, `POST /logout` |
| `charlasApi.js` | `list` | `GET /charlas` |
| `reservasApi.js` | `listarMisReservas`, `crearReserva`, `cancelarReserva` | `GET /reservas`, `POST /reservas`, `PATCH /reservas/{id}/cancelar` |
| `usersApi.js` | `getUser` | `GET /usuario` |

La URL base se toma de `VITE_API_URL`. Si no está definida, usa `http://localhost:8080/api`.

`ApiError` guarda el código HTTP, el mensaje y el cuerpo de la respuesta. Además ofrece:

- `isUnauthorized`: `true` si el código es 401.
- `isNotFound`: `true` si el código es 404.
- `erroresPorCampo`: convierte los errores de Laravel en un objeto `{ campo: primerMensaje }`.

Así los formularios pueden pintar el error debajo del campo correspondiente.

## 7. Validaciones en el cliente

- **Login:** correo con formato válido y contraseña no vacía.
- **Registro:** nombre obligatorio, correo válido, teléfono obligatorio, fecha de nacimiento obligatoria y al menos 16 años, contraseña de 8 caracteres como mínimo y confirmación igual.
- **Reserva:** el botón se deshabilita si la charla está cancelada, completa, ya empezada o ya reservada.
- **Cancelación:** solo se ofrece si la charla no está cancelada y todavía no ha empezado.

El cliente valida para dar respuesta rápida, pero **no sustituye** la validación del servidor.

## 8. Experiencia de uso

- Buscador por título, descripción, ponente, especialidad, ubicación y municipio.
- Filtros: todas, próximas, finalizadas y canceladas.
- Orden por fecha de inicio.
- Contador de resultados.
- Estados de carga, error con reintento y lista vacía.
- Avisos temporales de error o de cancelación correcta.
- Imagen de respaldo si falla la foto de una charla.
- Confirmación de reserva con resumen de la charla.
- Modal de cancelación con foco inicial, cierre con `Escape` y clic en el fondo.

## 9. Accesibilidad aplicada

- Formularios con `label`, `aria-invalid` y `aria-describedby`.
- Mensajes de error con `role="alert"` cuando corresponde.
- Modal con `role="alertdialog"` y `aria-modal="true"`.
- Botones con texto claro; los iconos usan `aria-hidden`.
- Foco visible y navegación por teclado en las tarjetas de reserva.
- Respeto de `prefers-reduced-motion`.
- Imágenes con `alt` y `loading="lazy"`.

## 10. Limitaciones conocidas

- No hay router: el hash no reconstruye la vista al recargar.
- “He olvidado mi contraseña” es un enlace de maqueta.
- “Ver mi QR” en la confirmación solo muestra un aviso; “Ver QR” en Mis reservas y “Editar perfil” están deshabilitados.
- No hay área visual de administración.
- La lista de reservas se descarga completa para marcar las charlas reservadas; con muchos datos habría que optimizarlo.
- Faltan pruebas automatizadas de componentes.

## 11. Arranque

```bash
cd frontend
npm install
npm run dev
```

Con Docker, el servicio `frontend` se levanta desde la raíz con `docker compose up -d`.

## 12. Enlaces relacionados

- [Despliegue](Despliegue.md)
- [Backend](Backend.md)
- [Recorridos de usuario](Recorridos_Usuario.md)
- [Guía de estilo](GuiaEstilo.md)
