# Pendientes del proyecto

Tareas posteriores al primer checkpoint. Los responsables son una **propuesta** según el trabajo realizado hasta ahora. Las fechas se alinean con el plan de continuación de [Entrega del checkpoint](Entrega_Checkpoint.md).

Responsables: **A** Alejandro, **M** Marc, **B** Alberto.

## 1. Funcionalidad

| Tarea | Módulo | Resp. | Depende de | Fecha | Estado |
|---|---|---|---|---|---|
| Servicio Mailpit en `docker-compose.yml` y configuración de correo | Despliegue | A | — | 1–7 diciembre | Pendiente |
| Mailable y plantilla del correo de confirmación | Servidor | A | Mailpit | 1–7 diciembre | Pendiente |
| Cola de envío y cambio de estado `pendiente` a `confirmada` | Servidor | A | Mailable | 8–14 diciembre | Pendiente |
| Endpoint de reenvío con límites (`email_intentos`, 60 s) | Servidor | A | Cola de envío | 8–14 diciembre | Pendiente |
| Mostrar el estado real del correo y el botón de reenvío | Cliente | M | Endpoint de reenvío | 15–31 diciembre | Pendiente |
| Rol `Validador` y su permiso en `RolesSeeder` y rutas | Servidor | A | — | 1–14 diciembre | Pendiente |
| `GET /api/reservas/{id}/qr` con token HMAC de 30 s | Servidor | A | — | 1–14 diciembre | Pendiente |
| `POST /api/asistencias/validar` con tolerancia acotada | Servidor | A | Endpoint de QR, rol Validador | 15–31 diciembre | Pendiente |
| Pantalla de acreditación con QR y cuenta atrás | Cliente | M | Endpoint de QR | 15–31 diciembre | Pendiente |
| Pantalla de escaneo para el personal de acceso | Cliente | B | Endpoint de validación | 1–31 enero | Pendiente |
| Registro manual de asistencia | Servidor y cliente | B | Endpoint de validación | 1–31 enero | Pendiente |
| Área de gestión de charlas e inscripciones | Servidor y cliente | B | Permisos | 15–31 diciembre | Pendiente |
| `GET /api/charlas/{id}` para el detalle desde la API | Servidor | A | — | 1–14 diciembre | Pendiente |

## 2. Calidad y pruebas

| Tarea | Módulo | Resp. | Depende de | Fecha | Estado |
|---|---|---|---|---|---|
| Tests de reserva (válida, repetida, sin plazas, cancelada, empezada) | Servidor | A | — | 1–31 enero | Pendiente |
| Tests de permisos (401, 403, 200 por rol) | Servidor | A | — | 1–31 enero | Pendiente |
| Documentar la API (listado de rutas con ejemplos) | Servidor | A | — | Noviembre | Hecho (ver [Backend](Backend.md)) |
| Registro de pruebas con capturas | Cliente | M | — | 23–30 noviembre | En curso |
| Pruebas en varios navegadores y tamaños de pantalla | Cliente | M | — | 1–31 enero | Pendiente |
| Comprobación de accesibilidad (Lighthouse o axe) y correcciones | Interfaces | M | — | 1–31 enero | Pendiente |

## 3. Despliegue

| Tarea | Módulo | Resp. | Depende de | Fecha | Estado |
|---|---|---|---|---|---|
| Entorno de demostración: compilación de producción y `APP_DEBUG=false` | Despliegue | A | — | 1–15 febrero | Pendiente |
| HTTPS en el entorno de demostración (necesario para la cámara) | Despliegue | A | Entorno de demo | 1–15 febrero | Pendiente |
| Integración continua en GitHub Actions (build y tests) | Despliegue | A | Tests | 1–15 febrero | Pendiente |
| Adaptar `backend/.env.example` a MySQL y a Docker | Despliegue | A | — | 1–14 diciembre | Pendiente |
| Healthcheck de MySQL y orden de arranque | Despliegue | A | — | 1–14 diciembre | Pendiente |
| Documentar la resolución de nombres y el acceso desde otro equipo | Despliegue | B | — | Noviembre | Hecho (ver [Despliegue](Despliegue.md)) |

## 4. Diseño y documentación

| Tarea | Módulo | Resp. | Depende de | Fecha | Estado |
|---|---|---|---|---|---|
| Actualizar `Modelo_Datos_Sabitech_Web.png` (`foto_perfil_url`, `api_token`, `foto_url`) | Servidor | B | — | 1–14 diciembre | Pendiente |
| Recorridos de usuario | Interfaces | B | — | Noviembre | Hecho (ver [Recorridos](Recorridos_Usuario.md)) |
| Variables CSS en un único `:root` global | Interfaces | M | — | 1–31 enero | Pendiente |
| Optimizar el logotipo y registrar las licencias de las imágenes | Interfaces | M | — | 1–31 enero | Pendiente |
| Requisitos, perfiles y reglas de negocio | Intermodular | M | — | Noviembre | Hecho (ver [Requisitos](Requisitos.md)) |
| Planificación propia y tablero de tareas en GitHub | Intermodular | B | — | Noviembre | Hecho (ver [Planificación](Planificacion.md)) |
| Memoria parcial en PDF y presentación | Intermodular | Todos | Resto de documentos | 23–30 noviembre | Pendiente |
| Merge a `main` y etiqueta de versión del checkpoint | Intermodular | A | Todo lo anterior | 23–30 noviembre | Pendiente |

## 5. Ya hecho en este checkpoint

- Guía de estilo y arquitectura documentadas.
- Permisos por perfil definidos y fallos del middleware corregidos (`GET /usuarios` y `GET /asistencias` restringidos).
- Diseño del correo de confirmación y del QR temporal.
- Cancelación de reservas en la interfaz y aviso “Plaza reservada”.
- Índice de documentación, modelo de datos, recorridos, frontend, backend, despliegue y empresa.
- Registro del uso real de IA y guía de entrega del checkpoint.
