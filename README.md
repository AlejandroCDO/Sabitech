# SABITECH WEB

Aplicación web para gestionar las reservas y la asistencia a las jornadas de charlas tecnológicas SABITECH. Trabajo de Fin de Ciclo de Desarrollo de Aplicaciones Web, curso 2026/27.

## Integrantes

Alberto Bellanato, Alejandro Company y Marc Penadés.

## Estado del proyecto

Versión del **primer checkpoint**. La reserva de una plaza funciona de principio a fin. El correo de confirmación y el QR temporal están diseñados, pero todavía no implementados.

**Implementado**

- Registro e inicio de sesión con token y opción de recordar la sesión.
- Catálogo de charlas con búsqueda, filtros y detalle.
- Reserva con control de aforo, reservas duplicadas, charlas canceladas y charlas ya empezadas.
- Mis reservas, detalle y cancelación con confirmación.
- Aviso “Plaza reservada” en las charlas ya reservadas.
- Perfil de usuario con foto mediante URL.

**Pendiente**

- Correo de confirmación de la reserva.
- QR temporal y validación de asistencia.
- Área de gestión visual para la organización.
- Pruebas automáticas y entorno de demostración con HTTPS.

## Tecnologías

| Capa | Tecnología |
|---|---|
| Frontend | React 19, Vite 8, JavaScript y CSS |
| Backend | PHP 8.4, Laravel 13 (API REST) |
| Base de datos | MySQL 8.4 |
| Entorno | Docker y Docker Compose |

## Arquitectura

```text
Navegador --> Frontend React + Vite --> API Laravel + Apache --> MySQL
             http://localhost:5173    http://localhost:8080/api   red interna
```

El navegador carga la aplicación del contenedor `frontend` y consume la API del contenedor `web`. La API se autentica con un token en la cabecera `Authorization: Bearer`.

| Servicio | Contenedor | URL | Descripción |
|---|---|---|---|
| `frontend` | Node 24 + Vite | http://localhost:5173 | Interfaz React con recarga en caliente |
| `web` | PHP 8.4 + Apache | http://localhost:8080 | API Laravel |
| `db` | MySQL 8.4 | Red interna de Docker | Base de datos |

El código de `frontend/` y `backend/` se monta como volumen. Los puertos solo se publican en `127.0.0.1`.

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

   ```env
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

6. Instala las dependencias del backend y genera la clave:

   ```bash
   docker compose exec web composer install
   docker compose exec web php artisan key:generate
   ```

7. Espera unos segundos a que MySQL termine de iniciarse y crea las tablas con datos de prueba:

   ```bash
   docker compose exec web php artisan migrate --seed
   ```

   Si falla por no poder conectar con la base de datos, espera un poco y repite el comando.

8. Abre la aplicación:

   - Frontend: http://localhost:5173
   - API: http://localhost:8080/api
   - Salud del backend: http://localhost:8080/up

## Usuarios de prueba

Los crea el seeder. Solo son para desarrollo.

| Perfil | Email | Contraseña |
|---|---|---|
| Administrador | `admin@sabitech.test` | `password` |
| Organizador | `organizador@sabitech.test` | `password` |
| Asistente | `asistente1@sabitech.test` (hasta `asistente25`) | `password` |

## Estructura del repositorio

```text
backend/    API Laravel (controladores, middleware, migraciones y seeders)
frontend/   Aplicación React (views, components, api, hooks, models y utils)
docker/     Configuración de Apache
database/   Esquema SQL de referencia
docs/       Documentación, PDFs, imágenes y READMEs
```

## Documentación

Índice completo: [docs/Readmes/README.md](docs/Readmes/README.md)

- [Requisitos, perfiles y reglas](docs/Readmes/Requisitos.md)
- [Planificación](docs/Readmes/Planificacion.md)
- [Modelo de datos](docs/Readmes/Modelo_Datos.md)
- [Recorridos de usuario](docs/Readmes/Recorridos_Usuario.md)
- [Frontend](docs/Readmes/Frontend.md)
- [Backend](docs/Readmes/Backend.md)
- [Despliegue](docs/Readmes/Despliegue.md)
- [Arquitectura](docs/Readmes/Arquitectura.md)
- [Guía de estilo](docs/Readmes/GuiaEstilo.md)
- [Permisos por perfil](docs/Readmes/Permisos.md)
- [Plan y registro de pruebas](docs/Readmes/Pruebas.md)
- [Correo de confirmación](docs/Readmes/Correo_Confirmacion.md)
- [QR temporal y asistencia](docs/Readmes/QR_Temporal.md)
- [Empresa NexusCode](docs/Readmes/Empresa.md)
- [Uso real de IA](docs/Readmes/IA_Uso_Proyecto.md)
- [Entrega del checkpoint](docs/Readmes/Entrega_Checkpoint.md)
- [Prompt para la memoria](docs/Readmes/Prompt_Memoria_Claude.md)
- [Pendientes](docs/Readmes/Pendientes.md)

Recursos gráficos y enunciados:

- `docs/Imagenes/Modelo_Datos_Sabitech_Web.png`
- `docs/PDF/`
- `docs/Instrucciones/Checkpoint_TFG.txt`

## API

Prefijo `/api`. Las rutas con token necesitan `Authorization: Bearer <token>`, que se obtiene en `POST /login`.

| Método y ruta | Acceso | Descripción |
|---|---|---|
| `GET /charlas` | Público | Listado de charlas con ponente, ubicación y plazas |
| `POST /register` | Público | Registro de un usuario con rol asistente |
| `POST /login` | Público | Devuelve el token y los datos del usuario |
| `GET /usuario` | Token | Datos del usuario autenticado |
| `PATCH /usuario/foto-perfil` | Token | Cambia o quita la foto de perfil |
| `POST /logout` | Token | Invalida el token |
| `GET /reservas` | Token | Reservas activas del usuario |
| `POST /reservas` | Token | Crea una reserva (`charla_id`) |
| `PATCH /reservas/{id}/cancelar` | Token | Cancela una reserva propia y libera la plaza |
| `GET /usuarios` | Token de administrador u organizador | Listado de usuarios |
| `GET /asistencias` | Token de administrador u organizador | Listado de asistencias |
| `POST /charlas` | Token de administrador | Crea una charla |

## Reglas de reserva y cancelación

Las decisiones las toma siempre el backend, dentro de una transacción con bloqueo de la charla para no superar el aforo con peticiones simultáneas.

| Situación | Respuesta |
|---|---|
| Sin token o token no válido | 401 |
| Datos no válidos, por ejemplo un email repetido | 422 |
| La charla o la reserva no existe | 404 |
| Charla cancelada o ya empezada | 409 |
| Sin plazas libres | 409 |
| Ya existe una reserva activa de esa persona para esa charla | 409 |
| Cancelar una reserva ya cancelada o de una charla que ya empezó | 409 |

Una reserva solo puede cancelarla su propietario. Al cancelar se libera la plaza.

## Comandos habituales

```bash
docker compose up -d --build
docker compose ps
docker compose logs -f frontend
docker compose logs -f web
docker compose down
```

Actualizar dependencias del frontend:

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
- Los cambios entran en `develop` mediante pull request revisado por otra persona.
- Las tareas y las incidencias se registran como issues en GitHub.
- Repositorio: https://github.com/AlejandroCDO/Sabitech

## Asignaturas convalidadas

IPE II, Sostenibilidad, Digitalización e Inglés Oral están convalidadas. La documentación incluye solo una introducción breve de NexusCode y el registro real de IA en el proyecto. No se desarrollan el plan económico, el plan de digitalización ni el informe de vídeos en inglés.
