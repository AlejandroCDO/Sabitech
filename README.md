# SABITECH WEB

Aplicación web para gestionar las reservas y la asistencia a las jornadas de charlas tecnológicas SABITECH. Trabajo de Fin de Ciclo de Desarrollo de Aplicaciones Web, curso 2026/27.

## Integrantes

Alberto Bellanato, Alejandro Company y Marc Penadés.

## Funcionalidades

**Implementado**

- Registro e inicio de sesión con token (opción de recordar la sesión).
- Catálogo de charlas con búsqueda y filtros (todas, próximas, finalizadas, canceladas) y detalle de cada charla.
- Reserva de plaza con control de aforo, de reservas duplicadas y de charlas canceladas o ya empezadas.
- Mis reservas, detalle de la reserva y cancelación con confirmación (la plaza queda libre).
- Aviso "Plaza reservada" en las charlas que la persona ya ha reservado.
- Perfil de usuario con foto de perfil (URL).

**Pendiente**

- Correo de confirmación de la reserva.
- QR temporal que se renueva cada 30 segundos y validación de asistencia.
- Área de gestión de charlas e inscripciones para la organización.

## Tecnologías

| Capa | Tecnología |
| --- | --- |
| Frontend | React 19, Vite 8, JavaScript y CSS |
| Backend | PHP 8.4, Laravel 13 (API REST) |
| Base de datos | MySQL 8.4 |
| Entorno | Docker y Docker Compose |

## Arquitectura

```
Navegador ──► Frontend (React + Vite) ──► API Laravel (PHP + Apache) ──► MySQL
              http://localhost:5173        http://localhost:8080/api       (red interna)
```

El navegador carga la aplicación del contenedor `frontend` y esta consume la API del contenedor `web` desde el propio navegador. La API se autentica con un token en la cabecera `Authorization: Bearer`.

| Servicio | Contenedor | URL | Descripción |
| --- | --- | --- | --- |
| `frontend` | Node 24 + Vite | http://localhost:5173 | Interfaz React con recarga en caliente |
| `web` | PHP 8.4 + Apache | http://localhost:8080 | API Laravel |
| `db` | MySQL 8.4 | Red interna de Docker | Base de datos |

El código de `frontend/` y `backend/` se monta como volumen, por lo que los cambios se aplican sin reconstruir las imágenes. Los puertos solo se publican en `127.0.0.1`.

## Requisitos

- Docker Desktop (Windows y macOS) o Docker Engine con el plugin Compose (Linux).
- Git.

## Puesta en marcha

1. Clona el repositorio y entra en la carpeta.

2. Crea los ficheros `.env` (no se versionan).

   Windows (PowerShell):

   ```powershell
   Copy-Item .env.example .env
   Copy-Item backend/.env.example backend/.env
   ```

   Linux y macOS:

   ```bash
   cp .env.example .env
   cp backend/.env.example backend/.env
   ```

3. Configura las credenciales de MySQL en el `.env` de la raíz (`MYSQL_DATABASE`, `MYSQL_USER`, `MYSQL_PASSWORD` y `MYSQL_ROOT_PASSWORD`).

4. En `backend/.env`, usa los mismos valores:

   ```
   APP_URL=http://localhost:8080
   DB_CONNECTION=mysql
   DB_HOST=db
   DB_PORT=3306
   DB_DATABASE=<MYSQL_DATABASE>
   DB_USERNAME=<MYSQL_USER>
   DB_PASSWORD=<MYSQL_PASSWORD>
   ```

5. Arranca los contenedores:

   ```bash
   docker compose up -d --build
   ```

6. Instala las dependencias del backend y genera la clave de la aplicación:

   ```bash
   docker compose exec web composer install
   docker compose exec web php artisan key:generate
   ```

7. Espera unos segundos a que MySQL termine de iniciarse y crea las tablas con los datos de prueba:

   ```bash
   docker compose exec web php artisan migrate --seed
   ```

   Si falla por no poder conectar con la base de datos, espera un poco y repite el comando.

8. Abre la aplicación.

   - Frontend: http://localhost:5173
   - API: http://localhost:8080/api
   - Comprobación de salud del backend: http://localhost:8080/up

## Usuarios de prueba

Los crea el seeder. Solo son para desarrollo.

| Perfil | Email | Contraseña |
| --- | --- | --- |
| Administrador | `admin@sabitech.test` | `password` |
| Organizador | `organizador@sabitech.test` | `password` |
| Asistente | `asistente1@sabitech.test` (hasta `asistente25`) | `password` |

## Estructura del repositorio

```
backend/    API Laravel (controladores, middleware, migraciones y seeders)
frontend/   Aplicación React (views, components, api, hooks, models y utils)
docker/     Configuración de Apache
database/   Esquema SQL de referencia
docs/       Documentación: guía de estilo, modelo de datos, bocetos y planificación
```

Documentación del proyecto:

- [Guía de estilo](docs/Guia_Estilo/GuiaEstilo.md)
- [Requisitos, perfiles y reglas](docs/Requisitos.md)
- [Plan y registro de pruebas](docs/Pruebas.md)
- [Arquitectura](docs/Arquitectura.md)
- [Permisos por perfil](docs/Permisos.md)
- [Correo de confirmación](docs/Correo_Confirmacion.md)
- [QR temporal y asistencia](docs/QR_Temporal.md)
- [Pendientes](docs/Pendientes.md)
- Modelo de datos: `docs/Imagenes/ModeloDeDatos.png`
- Bocetos, planificación y enunciado: `docs/PDF/`

## API

Prefijo `/api`. Las rutas con token necesitan la cabecera `Authorization: Bearer <token>`, que se obtiene en `POST /login`.

| Método y ruta | Acceso | Descripción |
| --- | --- | --- |
| `GET /charlas` | Público | Listado de charlas con ponente, ubicación y plazas |
| `POST /register` | Público | Registro de un usuario (rol asistente) |
| `POST /login` | Público | Devuelve el token y los datos del usuario |
| `GET /usuario` | Token | Datos del usuario autenticado |
| `GET /usuarios` | Token de administrador u organizador | Listado de usuarios |
| `GET /asistencias` | Token de administrador u organizador | Listado de asistencias |
| `PATCH /usuario/foto-perfil` | Token | Cambia o quita la foto de perfil |
| `POST /logout` | Token | Invalida el token |
| `GET /reservas` | Token | Reservas activas del usuario |
| `POST /reservas` | Token | Crea una reserva (`charla_id`) |
| `PATCH /reservas/{id}/cancelar` | Token | Cancela una reserva propia y libera la plaza |
| `POST /charlas` | Token de administrador | Crea una charla |

## Reglas de reserva y cancelación

Las decisiones las toma siempre el backend, dentro de una transacción con bloqueo de la charla para no superar el aforo con peticiones simultáneas.

| Situación | Respuesta |
| --- | --- |
| Sin token o token no válido | 401 |
| Datos no válidos (por ejemplo, un email repetido al registrarse) | 422 |
| La charla o la reserva no existe | 404 |
| Charla cancelada o ya empezada | 409 |
| Sin plazas libres | 409 |
| Ya existe una reserva activa de esa persona para esa charla | 409 |
| Cancelar una reserva ya cancelada o de una charla que ya empezó | 409 |

Una reserva solo puede cancelarla su propietario. Al cancelar se libera la plaza.

## Comandos habituales

Arrancar o reconstruir los contenedores:

```bash
docker compose up -d --build
```

Reconstruir solo el frontend:

```bash
docker compose up -d --build frontend
```

Ver el estado y los registros:

```bash
docker compose ps
docker compose logs -f frontend
docker compose logs -f web
```

Parar los contenedores sin borrar la base de datos:

```bash
docker compose down
```

Actualizar las dependencias del frontend tras cambiar `package.json`:

```bash
docker compose exec frontend npm install
```

Reiniciar el volumen de dependencias del frontend si queda corrupto:

```bash
docker compose rm -sf frontend
docker volume rm sabitech_frontend_node_modules
docker compose up -d --build frontend
```

Reiniciar la base de datos con los datos de prueba:

```bash
docker compose exec web php artisan migrate:fresh --seed
```

Borrar también los datos de MySQL (acción destructiva):

```bash
docker compose down -v
```

## Copia de seguridad y recuperación

Copia de la base de datos:

```bash
docker compose exec db sh -c 'mysqldump -u root -p"$MYSQL_ROOT_PASSWORD" "$MYSQL_DATABASE"' > copia.sql
```

Restauración desde la copia:

```bash
docker compose exec -T db sh -c 'mysql -u root -p"$MYSQL_ROOT_PASSWORD" "$MYSQL_DATABASE"' < copia.sql
```

## Trabajo en equipo

- Ramas: `main` para versiones estables, `develop` para la integración y `feature/*` para cada funcionalidad.
- Los cambios entran en `develop` mediante pull request, revisado por otra persona del equipo.
- Las tareas y las incidencias se registran como issues en GitHub.

## Pendiente

- Correo de confirmación y QR temporal con validación de asistencia.
- Área de gestión para la organización y rol de validador de asistencia.
- Pruebas automáticas del backend y de la integración continua.
- Entorno de demostración con HTTPS.
