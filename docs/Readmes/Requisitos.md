# Requisitos, perfiles y reglas de SABITECH WEB

## 1. Introducción

**Objetivo.** SABITECH WEB permite consultar las charlas de las jornadas SABITECH, reservar una plaza, gestionar las reservas y, en el evento, registrar la asistencia con un código QR temporal. Sustituye a los listados dispersos para saber quién tiene plaza y quién ha asistido.

**Alcance común.** Se distingue entre:

- **Imprescindible:** lo necesario para aceptar la aplicación (consultar, reservar con control de aforo, cancelar, permisos por perfil, correo y QR de asistencia).
- **Mejora:** lo que se aborda cuando lo imprescindible está comprobado.

**Estado.** Cada requisito indica si está *hecho*, *parcial* o *pendiente* en la versión del checkpoint.

### Glosario

| Término | Significado |
|---|---|
| Charla | Actividad de las jornadas, con título, ponente, fecha, horario, ubicación y aforo |
| Reserva | Plaza que una persona tiene en una charla. Estados: pendiente, confirmada y cancelada |
| Asistencia | Registro de que la persona ha acudido a la charla. **Tener reserva no significa haber asistido** |
| Acreditación | Pantalla con el QR temporal de una reserva |
| Aforo | Número máximo de plazas de una charla |

## 2. Perfiles de usuario

| Perfil | Descripción | Necesita |
|---|---|---|
| Visitante | Persona sin sesión | Ver el programa y el detalle de las charlas, y saber si quedan plazas; registrarse o iniciar sesión |
| Asistente | Persona registrada | Reservar y cancelar plazas, consultar sus reservas, ver su acreditación QR y recibir el correo de confirmación |
| Organizador | Equipo de la organización | Mantener las charlas y consultar las inscripciones y asistencias |
| Admin | Administración de la plataforma | Lo del organizador, además de crear charlas y gestionar la plataforma |
| Validador de acceso (propuesto) | Personal en la puerta | Escanear el QR y registrar la asistencia, sin otros permisos. Hoy no existe como rol: lo haría un organizador |

Los permisos detallados por ruta están en [Permisos](Permisos.md).

## 3. Requisitos funcionales

Prioridad: **I** imprescindible, **M** mejora.

| ID | Requisito | Prior. | Estado | Módulos |
|---|---|:-:|---|---|
| RF-01 | **Registro.** Una persona puede crear una cuenta con nombre, email único, teléfono, fecha de nacimiento y contraseña | I | Hecho | Cliente, Servidor |
| RF-02 | **Inicio y cierre de sesión.** Acceso con email y contraseña, con opción de recordar la sesión; el cierre invalida el token | I | Hecho | Cliente, Servidor |
| RF-03 | **Perfil con foto.** El usuario ve su perfil y puede cambiar o quitar su foto (URL) | M | Hecho | Cliente, Servidor |
| RF-04 | **Catálogo de charlas.** Listado con búsqueda y filtros (todas, próximas, finalizadas, canceladas) y disponibilidad de plazas | I | Hecho | Cliente, Servidor |
| RF-05 | **Detalle de charla.** Título, descripción, ponente, fecha, horario, ubicación y plazas | I | Hecho | Cliente, Interfaces |
| RF-06 | **Mis reservas.** Listado de las reservas activas con su estado y acceso al detalle de cada una | I | Hecho | Cliente, Servidor |
| RF-07 | **Reservar plaza.** Un usuario con sesión reserva una plaza, con confirmación en pantalla y mensajes claros ante cada error | I | Hecho | Cliente, Servidor |
| RF-08 | **Cancelar reserva.** El usuario cancela su reserva tras confirmarlo y la plaza queda libre | I | Hecho | Cliente, Servidor |
| RF-09 | **Indicador "Plaza reservada".** Las charlas ya reservadas lo muestran en el inicio, la agenda y el detalle | M | Hecho | Cliente |
| RF-10 | **Correo de confirmación.** Al reservar se envía un correo con la información de la charla y una referencia; se puede reenviar sin duplicar la reserva | I | Pendiente (diseñado) | Servidor |
| RF-11 | **QR temporal.** La acreditación muestra un QR que cambia cada 30 segundos | I | Pendiente (diseñado) | Servidor, Cliente |
| RF-12 | **Validar asistencia.** El personal autorizado escanea el QR y el servidor registra la asistencia una sola vez | I | Pendiente (diseñado) | Servidor, Cliente |
| RF-13 | **Gestión de charlas.** La organización crea, edita y cancela charlas | I | Parcial: solo existe la creación por API para el administrador | Servidor, Cliente |
| RF-14 | **Consulta de inscripciones y asistencias.** La organización consulta quién se ha inscrito y quién ha asistido | I | Parcial: existen los listados de usuarios y asistencias por API, restringidos a organizador y administrador | Servidor, Cliente |

## 4. Requisitos no funcionales

| ID | Requisito | Estado |
|---|---|---|
| RNF-01 | **Adaptación a dispositivos.** La web se usa desde móvil, tableta y ordenador, con la información y los controles reorganizados en cada tamaño | Hecho en las pantallas actuales |
| RNF-02 | **Accesibilidad.** Etiquetas en formularios, texto alternativo, foco visible, contraste suficiente, navegación por teclado y mensajes de error comprensibles | Parcial: hay una base; faltan la comprobación con una herramienta y varias correcciones (ver la [guía de estilo](GuiaEstilo.md)) |
| RNF-03 | **Seguridad.** Contraseñas con hash, token guardado solo como hash, permisos comprobados en el servidor y consultas con parámetros | Hecho en lo implementado |
| RNF-04 | **Integridad de datos.** Claves foráneas, claves únicas y restricciones en la base de datos, y reservas dentro de transacciones | Hecho |
| RNF-05 | **Usabilidad.** Cada acción informa del resultado: carga en curso, operación aceptada, falta de plazas o problema de conexión, con opción de reintentar | Hecho en las pantallas actuales |
| RNF-06 | **Reproducibilidad.** Otro equipo puede poner en marcha la aplicación con las instrucciones del README | Hecho (ver el [README](../../README.md)) |
| RNF-07 | **Identidad visual coherente.** Paleta, tipografías y componentes consistentes en todas las pantallas | Parcial (ver la guía de estilo) |
| RNF-08 | **Documentación.** Arquitectura, permisos, pruebas y pendientes documentados | En curso |

## 5. Reglas de negocio

Las reglas marcadas como **propuesta** las deja abiertas el enunciado y deben acordarse en el equipo.

### Reserva

| ID | Regla | Dónde se aplica |
|---|---|---|
| RN-01 | Solo se puede reservar con la sesión iniciada | Servidor (401) y cliente |
| RN-02 | Una persona no puede tener dos reservas activas (pendiente o confirmada) para la misma charla | Servidor (409) y clave única en la base de datos |
| RN-03 | No se puede superar el aforo, tampoco con peticiones simultáneas por la última plaza | Servidor: transacción con bloqueo de la charla (409) |
| RN-04 | No se puede reservar una charla cancelada ni una que ya ha empezado | Servidor (409) |

### Cancelación

| ID | Regla | Dónde se aplica |
|---|---|---|
| RN-05 | Solo el propietario puede cancelar su reserva, solo si la charla no ha empezado y si no estaba ya cancelada; al cancelar se libera la plaza | Servidor (404 y 409) |

### Estados y asistencia

| ID | Regla | Dónde se aplica |
|---|---|---|
| RN-06 | Una reserva pasa de `pendiente` a `confirmada` cuando se envía el correo de confirmación, y a `cancelada` al cancelarla. Reserva confirmada no equivale a asistencia | Servidor (el paso a `confirmada` está pendiente) |
| RN-07 | Solo hay una asistencia por reserva. El QR cambia cada 30 segundos y caduca de verdad en el servidor, con una tolerancia máxima de una ventana (propuesta). Un código caducado, manipulado o de una reserva no válida se rechaza | Servidor, clave única `uq_asistencias_reserva_id` (pendiente de implementar) |

### Cuenta y permisos

| ID | Regla | Dónde se aplica |
|---|---|---|
| RN-08 | Para registrarse hay que tener al menos 16 años | Servidor (422) y cliente |
| RN-09 | El rol lo asigna siempre el servidor (asistente al registrarse); el cliente no lo elige | Servidor |
| RN-10 | El usuario se obtiene del token; un asistente no puede ver ni modificar datos de otras personas ni acceder a la administración | Servidor (403 y 404) |

### Correo (propuestas)

| ID | Regla | Dónde se aplica |
|---|---|---|
| RN-11 | El reenvío del correo usa la misma reserva y nunca crea otra; como máximo 3 intentos y 60 segundos entre ellos (propuesta) | Servidor (pendiente) |
| RN-12 | El acceso a la charla con QR se admite desde 30 minutos antes del inicio hasta el fin de la charla (propuesta) | Servidor (pendiente) |

## 6. Casos de uso principales

### CU-01 Consultar el programa
1. El visitante abre la aplicación y ve las próximas charlas.
2. Busca o filtra en la agenda.
3. Abre el detalle de una charla y ve si quedan plazas.

### CU-02 Reservar una plaza
1. El asistente inicia sesión.
2. Elige una charla con plazas y pulsa "Reservar plaza".
3. El servidor valida la charla, el aforo y que no esté duplicada, y crea la reserva.
4. La aplicación muestra la confirmación. La charla pasa a "Plaza reservada" y la reserva aparece en "Mis reservas".
- **Alternativas:** sin sesión se pide registrarse o iniciar sesión; si no quedan plazas, está cancelada o ya empezó, se muestra el motivo.

### CU-03 Cancelar una reserva
1. En "Mis reservas", el asistente pulsa "Cancelar reserva".
2. Confirma en el cuadro de diálogo.
3. El servidor cancela la reserva y libera la plaza. La reserva desaparece del listado.

### CU-04 Registrar la asistencia (pendiente)
1. El asistente abre su acreditación y muestra el QR.
2. El personal de acceso lo escanea.
3. El servidor valida el código y registra la asistencia una sola vez.
- **Alternativas:** código caducado o manipulado, asistencia ya registrada, o registro manual si no se puede usar el QR.

## 7. Trazabilidad

| Requisito | Pantalla o ruta | Pruebas | Estado |
|---|---|---|---|
| RF-01 | Registro, `POST /api/register` | PR-16, PR-17, PR-18 | Hecho |
| RF-02 | Login, `POST /api/login`, `POST /api/logout` | PR-19, PR-20 | Hecho |
| RF-03 | Perfil, `PATCH /api/usuario/foto-perfil` | | Hecho |
| RF-04 | Inicio y agenda de charlas, `GET /api/charlas` | PR-23, PR-25 | Hecho |
| RF-05 | Detalle de charla | PR-23 | Hecho |
| RF-06 | Mis reservas, `GET /api/reservas` | PR-01 | Hecho |
| RF-07 | Reservar, `POST /api/reservas` | PR-01 a PR-10 | Hecho |
| RF-08 | Mis reservas, `PATCH /api/reservas/{id}/cancelar` | PR-11 a PR-15 | Hecho |
| RF-09 | Inicio, agenda y detalle | PR-01, PR-02 | Hecho |
| RF-10 | Correo de confirmación | | Pendiente |
| RF-11 | Acreditación con QR | | Pendiente |
| RF-12 | Validación de asistencia | | Pendiente |
| RF-13 | Gestión de charlas, `POST /api/charlas` | | Parcial |
| RF-14 | `GET /api/usuarios`, `GET /api/asistencias` | PR-21 | Parcial |

## 8. Fuera de alcance y mejoras futuras

- Subida de imágenes: la foto de perfil y las imágenes de las charlas se indican por URL, no se suben archivos.
- Pagos: la entrada es gratuita con reserva previa.
- Aplicación móvil nativa: se usa la web adaptable.
- Estadísticas e informes de asistencia para la organización.
- Lista de espera cuando una charla está completa.
