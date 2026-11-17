# Plan y registro de pruebas

Este documento recoge las pruebas de la primera versión funcional (punto 3 del checkpoint): identificar a un usuario, consultar el catálogo y el detalle de las charlas desde la API y hacer una reserva que se mantenga al volver a entrar. Incluye los tres casos que pide el checkpoint (reserva válida, reserva repetida y charla sin plazas) y otros complementarios.

**Cómo usarlo:** la columna "Resultado esperado" está contrastada con el código del backend. Las columnas **Resultado**, **Captura** y **Fecha y quién** están vacías: hay que ejecutar cada prueba, anotar `OK` o `FALLA` y adjuntar la captura. No se debe dar un caso por superado sin haberlo ejecutado.

Los identificadores `RF-xx` y `RN-xx` remiten a [Requisitos](Requisitos.md).

## 1. Preparación del entorno

1. Arranca el entorno siguiendo el [README](../README.md).
2. Parte de datos conocidos:

   ```bash
   docker compose exec web php artisan migrate:fresh --seed
   ```

3. Las fechas de las charlas del seeder son relativas al día en que se ejecuta. Una charla "ya celebrada" lo es porque su fecha cae unos días en el pasado.

### Usuarios y charlas de prueba

| Usuario | Email | Contraseña |
|---|---|---|
| Asistente | `asistente1@sabitech.test` a `asistente25@sabitech.test` | `password` |
| Organizador | `organizador@sabitech.test` | `password` |
| Administrador | `admin@sabitech.test` | `password` |

| Charla | Aforo | Ocupadas | Para qué sirve |
|---|---|---|---|
| Introducción a Laravel | 40 | 12 (de `asistente1` a `asistente12`) | Reserva válida y reserva repetida |
| Última plaza disponible | 1 | 0 | Aforo y concurrencia |
| Charla completa | 20 | 20 | Charla sin plazas |
| Charla cancelada | 30 | 0 | Charla cancelada |
| Charla ya celebrada | 30 | 22 | Charla que ya ha empezado |

### Cómo probar por la API

Todas las rutas están bajo `http://localhost:8080/api`.

1. Obtener el token:

   ```bash
   curl -s -X POST http://localhost:8080/api/login \
     -H "Content-Type: application/json" -H "Accept: application/json" \
     -d '{"email":"asistente20@sabitech.test","password":"password"}'
   ```

   La respuesta incluye `token`.

2. Consultar las charlas y anotar el `id` de cada una:

   ```bash
   curl -s http://localhost:8080/api/charlas -H "Accept: application/json"
   ```

3. Reservar (sustituye `TOKEN` y `ID_CHARLA`):

   ```bash
   curl -s -X POST http://localhost:8080/api/reservas \
     -H "Content-Type: application/json" -H "Accept: application/json" \
     -H "Authorization: Bearer TOKEN" \
     -d '{"charla_id": ID_CHARLA}'
   ```

## 2. Casos obligatorios del checkpoint

| ID | Caso | Pasos | Resultado esperado | Req. | Resultado | Captura | Fecha y quién |
|---|---|---|---|---|---|---|---|
| PR-01 | Reserva válida | 1. Iniciar sesión con `asistente20`. 2. En "Introducción a Laravel" pulsar "Reservar plaza". 3. Abrir "Mis reservas". 4. Cerrar sesión, volver a entrar y abrir "Mis reservas". | **API:** `201` "Reserva creada correctamente". **Interfaz:** pantalla de plaza confirmada; la tarjeta de la charla pasa a "Plaza reservada" (deshabilitada); las plazas ocupadas suben de 12 a 13; la reserva sigue en "Mis reservas" tras volver a entrar (persistente). | RF-07, RN-01, RN-03 | | | |
| PR-02 | Reserva repetida | 1. Iniciar sesión con `asistente1` (ya tiene plaza). 2. Intentar reservar de nuevo "Introducción a Laravel" (por API, porque la interfaz ya la marca como reservada). | `409` "Ya tienes una reserva para esta charla". Las plazas ocupadas no cambian. En la interfaz el botón aparece como "Plaza reservada" y no se puede pulsar. | RF-07, RN-02 | | | |
| PR-03 | Charla sin plazas | 1. Iniciar sesión con `asistente20`. 2. Abrir "Charla completa". 3. Intentar reservar por API. | **Interfaz:** botón deshabilitado con el texto "Sin plazas". **API:** `409` "No quedan plazas libres". Las plazas ocupadas no cambian. | RF-07, RN-03 | | | |

## 3. Casos complementarios de reserva

| ID | Caso | Pasos | Resultado esperado | Req. | Resultado | Captura | Fecha y quién |
|---|---|---|---|---|---|---|---|
| PR-04 | Reserva sin sesión | Sin iniciar sesión, pulsar "Reservar plaza" en una charla. | La interfaz muestra "Debes registrarte o iniciar sesión primero." **API:** `401`. No se crea ninguna reserva. | RF-07, RN-01 | | | |
| PR-05 | Token no válido | Llamar a `POST /reservas` con `Authorization: Bearer abc`. | `401` "Token no válido". | RN-01 | | | |
| PR-06 | Charla cancelada | Intentar reservar "Charla cancelada" (por API, con su `id`). | `409` "La charla está cancelada". En la agenda aparece con el estado "Cancelada" y el botón deshabilitado. | RF-07, RN-04 | | | |
| PR-07 | Charla ya celebrada | Intentar reservar "Charla ya celebrada" (por API). | `409` "La charla ya ha empezado". En la agenda aparece como "Finalizada" y el botón deshabilitado. | RF-07, RN-04 | | | |
| PR-08 | Charla inexistente | `POST /reservas` con un `charla_id` que no existe (por ejemplo 99999). | `404` "La charla no existe". | RF-07 | | | |
| PR-09 | Última plaza | 1. Reservar "Última plaza disponible" con `asistente20`. 2. Intentar reservarla con `asistente21`. | La primera devuelve `201`; la segunda `409` "No quedan plazas libres". La charla pasa a "Plazas agotadas". | RN-03 | | | |
| PR-10 | Concurrencia | Con la charla "Última plaza disponible" libre, lanzar a la vez dos reservas de dos usuarios distintos (ver el apartado 5). | Exactamente una respuesta `201` y otra `409`. `plazas_ocupadas` no supera el aforo. | RN-03 | | | |

## 4. Cancelación, cuenta y permisos

| ID | Caso | Pasos | Resultado esperado | Req. | Resultado | Captura | Fecha y quién |
|---|---|---|---|---|---|---|---|
| PR-11 | Cancelar mi reserva | 1. Con `asistente20` reservar una charla futura. 2. En "Mis reservas" pulsar "Cancelar reserva". 3. Confirmar en el cuadro. | Aparece el cuadro de confirmación; al confirmar, la tarjeta desaparece y se muestra "Reserva cancelada. Tu plaza ha quedado libre." **API:** `200` "Reserva cancelada correctamente". Las plazas ocupadas bajan en 1 y la charla vuelve a mostrar "Reservar plaza". | RF-08, RN-05 | | | |
| PR-12 | Cancelar y no confirmar | Pulsar "Cancelar reserva" y luego "Volver" (o Escape). | El cuadro se cierra y la reserva sigue activa. | RF-08 | | | |
| PR-13 | Cancelar una reserva ajena | Con `asistente20`, llamar a `PATCH /reservas/{id}/cancelar` con el `id` de una reserva de `asistente1`. | `404` "La reserva no existe". La reserva de `asistente1` sigue activa. | RN-05 | | | |
| PR-14 | Cancelar dos veces | Repetir el `PATCH` sobre una reserva ya cancelada. | `409` "La reserva ya está cancelada". | RN-05 | | | |
| PR-15 | Cancelar una charla ya empezada | Intentar cancelar una reserva de "Charla ya celebrada". | `409` "La charla ya ha empezado". En la interfaz no aparece el botón "Cancelar reserva". | RN-05 | | | |
| PR-16 | Registro válido | Registrar un usuario nuevo (mayor de 16 años, contraseña de 8 o más caracteres). | `201` "Usuario creado correctamente"; el rol asignado es el de asistente. | RF-01, RN-09 | | | |
| PR-17 | Registro con email repetido | Registrar otra vez `asistente1@sabitech.test`. | `422` con error en el campo `email`; la interfaz lo muestra bajo el campo. | RF-01 | | | |
| PR-18 | Registro de menor de 16 años | Registrar un usuario con fecha de nacimiento que dé menos de 16 años. | `422` "Debes tener al menos 16 años para registrarte." | RF-01, RN-08 | | | |
| PR-19 | Login incorrecto | Iniciar sesión con una contraseña errónea. | `401` "Email o contraseña incorrectos". | RF-02 | | | |
| PR-20 | Login correcto y logout | Iniciar sesión y cerrar sesión. Repetir una llamada con el mismo token. | Tras cerrar sesión, el token deja de valer (`401`). | RF-02 | | | |
| PR-21 | Permisos de gestión | Llamar a `GET /usuarios`: sin token, con `asistente1`, con `organizador`. | Sin token `401`; con asistente `403` "No tienes permiso para esta acción"; con organizador `200` con el listado. | RF-14 | | | |

## 5. Prueba de concurrencia (PR-10)

Con la charla "Última plaza disponible" sin reservas, obtén un token de `asistente20` y otro de `asistente21` (apartado 1) y lanza las dos peticiones a la vez:

```bash
curl -s -X POST http://localhost:8080/api/reservas \
  -H "Content-Type: application/json" -H "Accept: application/json" \
  -H "Authorization: Bearer TOKEN_20" -d '{"charla_id": ID_CHARLA}' &
curl -s -X POST http://localhost:8080/api/reservas \
  -H "Content-Type: application/json" -H "Accept: application/json" \
  -H "Authorization: Bearer TOKEN_21" -d '{"charla_id": ID_CHARLA}' &
wait
```

Resultado esperado: una respuesta `201` y la otra `409`. Esto se debe al bloqueo de la fila de la charla dentro de una transacción (`lockForUpdate`). Tras la prueba, reinicia los datos con `migrate:fresh --seed`.

## 6. Comprobaciones de interfaz

| ID | Caso | Pasos | Resultado esperado | Req. | Resultado | Captura | Fecha y quién |
|---|---|---|---|---|---|---|---|
| PR-22 | Estados de carga y error | Parar el contenedor `web` y abrir "Mis reservas" y la agenda. | Se muestra el error con el botón "Reintentar"; al arrancar de nuevo y reintentar, se cargan los datos. | RNF-05 | | | |
| PR-23 | Catálogo y detalle | Abrir la agenda, buscar por título, filtrar por "Próximas" y abrir el detalle de una charla. | El listado se filtra; el detalle muestra título, ponente, fecha, hora, ubicación y plazas. | RF-04, RF-05 | | | |
| PR-24 | Adaptación a móvil | Repetir PR-23 y PR-11 a 360 px de ancho (herramientas de desarrollo del navegador). | Sin desplazamiento horizontal; menú de tres rayas; botones a ancho completo. | RNF-01 | | | |
| PR-25 | Volver al inicio desde el detalle | Abrir el detalle de una charla y pulsar el logotipo o "Inicio". | Vuelve al inicio; la URL cambia de `#detalle-charla` a `#inicio`. | RF-04 | | | |

## 7. Resumen de resultados

| Bloque | Casos | Superados | Fallidos | Sin ejecutar |
|---|---|---|---|---|
| Obligatorios del checkpoint (PR-01 a PR-03) | 3 | | | 3 |
| Reserva complementarios (PR-04 a PR-10) | 7 | | | 7 |
| Cancelación, cuenta y permisos (PR-11 a PR-21) | 11 | | | 11 |
| Interfaz (PR-22 a PR-25) | 4 | | | 4 |
| **Total** | **25** | | | **25** |

## 8. Incidencias detectadas

Anota aquí cada fallo encontrado y regístralo también como issue en GitHub con la etiqueta `bug`.

| N.º | Caso | Descripción | Gravedad | Estado | Enlace a la issue |
|---|---|---|---|---|---|
| | | | | | |

## 9. Pruebas automáticas

Hoy el backend solo tiene los tests de ejemplo de Laravel. Las pruebas de este documento son manuales. Escribir tests automáticos de reserva, cancelación y permisos figura en [Pendientes](Pendientes.md).
