# Permisos por perfil

Los permisos se comprueban **en el servidor** (middleware `ComprobarToken`, alias `token`). El frontend solo oculta opciones para guiar al usuario; no es una medida de seguridad.

## 1. Perfiles

| Perfil | Quién es | Estado |
|---|---|---|
| Visitante | Persona sin sesión | Implementado |
| Asistente | Persona registrada que reserva plaza | Implementado (rol `Asistente`) |
| Organizador | Equipo de la organización de las jornadas | Rol creado; sus funciones de gestión están pendientes |
| Admin | Administración de la plataforma | Rol creado; sus funciones de gestión están pendientes |
| Validador de acceso | Personal que comprueba el QR en la puerta | **Propuesto**: hoy no existe como rol |

Al registrarse, el servidor asigna siempre el rol `Asistente`. El cliente no puede elegir su rol.

## 2. Matriz de permisos actual

Leyenda: ✔ permitido, ✘ no permitido, — no aplica.

| Acción | Ruta | Visitante | Asistente | Organizador | Admin |
|---|---|:-:|:-:|:-:|:-:|
| Ver charlas | `GET /api/charlas` | ✔ | ✔ | ✔ | ✔ |
| Registrarse | `POST /api/register` | ✔ | — | — | — |
| Iniciar sesión | `POST /api/login` | ✔ | — | — | — |
| Ver mis datos | `GET /api/usuario` | ✘ | ✔ | ✔ | ✔ |
| Cambiar mi foto de perfil | `PATCH /api/usuario/foto-perfil` | ✘ | ✔ | ✔ | ✔ |
| Cerrar sesión | `POST /api/logout` | ✘ | ✔ | ✔ | ✔ |
| Ver mis reservas | `GET /api/reservas` | ✘ | ✔ | ✔ | ✔ |
| Reservar una plaza | `POST /api/reservas` | ✘ | ✔ | ✔ | ✔ |
| Cancelar mi reserva | `PATCH /api/reservas/{id}/cancelar` | ✘ | ✔ | ✔ | ✔ |
| Listar todos los usuarios | `GET /api/usuarios` | ✘ | ✘ | ✔ | ✔ |
| Listar las asistencias | `GET /api/asistencias` | ✘ | ✘ | ✔ | ✔ |
| Crear una charla | `POST /api/charlas` | ✘ | ✘ | ✘ | ✔ |

## 3. Reglas de propiedad

- El usuario sale del token (`$request->attributes->get('usuario')`), nunca del cuerpo de la petición.
- Una persona solo ve sus reservas: `GET /api/reservas` filtra por `usuario_id`.
- Cancelar una reserva ajena devuelve `404 La reserva no existe`: la consulta filtra por reserva **y** por usuario.
- Un asistente no puede acceder a las rutas de administración: recibe `403 No tienes permiso para esta acción`.

## 4. Códigos de respuesta

| Código | Cuándo |
|---|---|
| 401 | No se envía token o el token no es válido |
| 403 | El token es válido, pero el rol no tiene permiso |
| 404 | La charla o la reserva no existe (o no es del usuario) |
| 409 | Conflicto con una regla de negocio (sin plazas, duplicada, charla empezada o cancelada) |
| 422 | Datos no válidos |

## 5. Cómo funciona el middleware de roles

`token` sin parámetros solo exige sesión. `token:admin,organizador` exige además que el rol del usuario sea uno de los indicados. La comparación no distingue mayúsculas de minúsculas, porque los roles se guardan como `Admin`, `Organizador` y `Asistente`.

## 6. Cambios realizados en este checkpoint

- El middleware aceptaba un solo rol y comparaba mayúsculas: `token:admin` habría devuelto siempre 403 porque el rol real es `Admin`. Ahora acepta varios roles sin distinguir mayúsculas.
- `GET /api/asistencias` era público y exponía el nombre de cada persona y la charla a la que asistió. Ahora exige administrador u organizador.
- `GET /api/usuarios` podía llamarlo cualquier usuario con sesión y devolvía email, teléfono y fecha de nacimiento de todos. Ahora exige administrador u organizador.

## 7. Permisos previstos (pendientes)

| Acción | Ruta prevista | Quién |
|---|---|---|
| Ver mi acreditación QR | `GET /api/reservas/{id}/qr` | Propietario de la reserva |
| Validar la asistencia con un QR | `POST /api/asistencias/validar` | Validador, organizador o admin |
| Editar o cancelar una charla | `PUT /api/charlas/{id}`, `PATCH /api/charlas/{id}/cancelar` | Organizador o admin |
| Consultar las inscripciones de una charla | `GET /api/charlas/{id}/reservas` | Organizador o admin |
| Reenviar el correo de confirmación | `POST /api/reservas/{id}/reenviar-correo` | Propietario de la reserva |

**Validador de acceso:** la persona que valida en la puerta solo necesita validar asistencias, no gestionar charlas ni ver datos personales. Se propone crear un rol `Validador` (en `RolesSeeder`) con permiso únicamente para `POST /api/asistencias/validar`. Hasta que exista, la validación podría hacerla un organizador, con más permisos de los necesarios.

## 8. Cómo comprobarlo a mano

1. Inicia sesión con un asistente (`asistente1@sabitech.test`) y copia el token de la respuesta.
2. `GET /api/usuarios` con ese token devuelve `403`; sin token, `401`.
3. Inicia sesión con `organizador@sabitech.test` y repite la llamada: devuelve `200` con el listado.
4. Intenta cancelar una reserva de otra persona: devuelve `404`.
