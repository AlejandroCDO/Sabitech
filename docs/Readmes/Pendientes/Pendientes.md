# Pendientes del proyecto

Tareas que quedan después del checkpoint. Los responsables son una **propuesta** según lo que cada persona ha trabajado hasta ahora; las fechas se completan al cerrar la planificación.

Responsables: **A** Alejandro, **M** Marc, **B** Alberto.

## 1. Funcionalidad

| Tarea | Módulo | Resp. | Depende de | Fecha | Estado |
|---|---|---|---|---|---|
| Servicio Mailpit en `docker-compose.yml` y configuración de correo | Despliegue | A | — | A definir | Pendiente |
| Mailable y plantilla del correo de confirmación | Servidor | A | Mailpit | A definir | Pendiente |
| Cola de envío y cambio de estado `pendiente` a `confirmada` | Servidor | A | Mailable | A definir | Pendiente |
| Endpoint de reenvío con límites (`email_intentos`, 60 s) | Servidor | A | Cola de envío | A definir | Pendiente |
| Mostrar el estado real del correo y el botón de reenvío | Cliente | M | Endpoint de reenvío | A definir | Pendiente |
| Rol `Validador` y su permiso en `RolesSeeder` y rutas | Servidor | A | — | A definir | Pendiente |
| `GET /api/reservas/{id}/qr` con token HMAC de 30 s | Servidor | A | — | A definir | Pendiente |
| `POST /api/asistencias/validar` con tolerancia acotada | Servidor | A | Endpoint de QR, rol Validador | A definir | Pendiente |
| Pantalla de acreditación con QR y cuenta atrás | Cliente | M | Endpoint de QR | A definir | Pendiente |
| Pantalla de escaneo para el personal de acceso | Cliente | B | Endpoint de validación | A definir | Pendiente |
| Registro manual de asistencia | Servidor y Cliente | B | Endpoint de validación | A definir | Pendiente |
| Área de gestión de charlas e inscripciones | Servidor y Cliente | B | Permisos | A definir | Pendiente |
| `GET /api/charlas/{id}` para el detalle desde la API | Servidor | A | — | A definir | Pendiente |

## 2. Calidad y pruebas

| Tarea | Módulo | Resp. | Depende de | Fecha | Estado |
|---|---|---|---|---|---|
| Tests de reserva (válida, repetida, sin plazas, cancelada, empezada) | Servidor | A | — | A definir | Pendiente |
| Tests de permisos (401, 403, 200 por rol) | Servidor | A | — | A definir | Pendiente |
| Documentar la API (listado de rutas con ejemplos) | Servidor | A | — | A definir | Pendiente |
| Registro de pruebas con capturas (`docs/Pruebas.md`) | Cliente | M | — | A definir | Pendiente |
| Pruebas en varios navegadores y tamaños de pantalla | Cliente | M | — | A definir | Pendiente |
| Comprobación de accesibilidad (Lighthouse o axe) y correcciones | Interfaces | M | — | A definir | Pendiente |

## 3. Despliegue

| Tarea | Módulo | Resp. | Depende de | Fecha | Estado |
|---|---|---|---|---|---|
| Entorno de demostración: compilación de producción y `APP_DEBUG=false` | Despliegue | A | — | A definir | Pendiente |
| HTTPS en el entorno de demostración (necesario para la cámara) | Despliegue | A | Entorno de demo | A definir | Pendiente |
| Integración continua en GitHub Actions (build y tests) | Despliegue | A | Tests | A definir | Pendiente |
| Adaptar `backend/.env.example` a MySQL y a Docker | Despliegue | A | — | A definir | Pendiente |
| Healthcheck de MySQL y orden de arranque | Despliegue | A | — | A definir | Pendiente |
| Documentar la resolución de nombres y el acceso desde otro equipo | Despliegue | B | — | A definir | Pendiente |

## 4. Diseño y documentación

| Tarea | Módulo | Resp. | Depende de | Fecha | Estado |
|---|---|---|---|---|---|
| Actualizar `ModeloDeDatos.png` (`foto_perfil_url`, `api_token`, `foto_url`) | Servidor | B | — | A definir | Pendiente |
| Recorridos de usuario | Interfaces | B | — | A definir | Pendiente |
| Variables CSS en un único `:root` global | Interfaces | M | — | A definir | Pendiente |
| Optimizar el logotipo y registrar las licencias de las imágenes | Interfaces | M | — | A definir | Pendiente |
| Requisitos, perfiles y reglas de negocio (`docs/Requisitos.md`) | Intermodular | M | — | A definir | Pendiente |
| Planificación propia y tablero de tareas en GitHub | Intermodular | B | — | A definir | Pendiente |
| Memoria parcial en PDF y presentación | Intermodular | Todos | Resto de documentos | A definir | Pendiente |
| Merge a `main` y etiqueta de versión del checkpoint | Intermodular | A | Todo lo anterior | A definir | Pendiente |

## 5. Ya hecho en este checkpoint

- Guía de estilo y arquitectura documentadas.
- Permisos por perfil definidos y fallos del middleware corregidos (`GET /usuarios` y `GET /asistencias` restringidos).
- Diseño del correo de confirmación y del QR temporal.
- Cancelación de reservas en la interfaz y aviso "Plaza reservada".
