# Sabitech

Trabajo de Fin de Ciclo DAW 2026/27

## Integrantes

Alberto Bellanato, Alejandro Company y Marc Penadés

## Arquitectura

La aplicación se ejecuta con Docker Compose y consta de tres servicios:

| Servicio   | Contenedor       | URL                   | Descripción                            |
| ---------- | ---------------- | --------------------- | -------------------------------------- |
| `frontend` | Node 24 + Vite   | http://localhost:5173 | Interfaz React con recarga en caliente |
| `web`      | PHP 8.4 + Apache | http://localhost:8080 | API Laravel                            |
| `db`       | MySQL 8.4        | Red interna de Docker | Base de datos                          |

El código de `frontend/` y `backend/` se monta como volumen, por lo que los cambios se aplican sin reconstruir las imágenes. El frontend consume la API desde el navegador en `http://localhost:8080/api`.

## Requisitos

- Docker Desktop (Windows/macOS) o Docker Engine con el plugin Compose (Linux)
- Git

## Configuración inicial

Los ficheros `.env` no se versionan. Cada desarrollador debe crearlos antes de arrancar los contenedores.

Windows (PowerShell):

```powershell
Copy-Item .env.example .env
Copy-Item backend/.env.example backend/.env
```

Linux/macOS:

```bash
cp .env.example .env
cp backend/.env.example backend/.env
```

Después:

1. En el `.env` de la raíz, define las credenciales de MySQL.
2. En `backend/.env`, configura `APP_URL=http://localhost:8080` y la conexión a la base de datos con los mismos valores:
   `DB_CONNECTION=mysql`, `DB_HOST=db`, `DB_PORT=3306`, `DB_DATABASE`, `DB_USERNAME` y `DB_PASSWORD`.
3. Arranca los contenedores y genera la clave y la base de datos:

```bash
docker compose up -d --build
docker compose exec web php artisan key:generate
docker compose exec web php artisan migrate --seed
```

## Comandos habituales

Arrancar o reconstruir todos los contenedores:

```bash
docker compose up -d --build
```

Reconstruir solo el frontend (por ejemplo, tras cambiar su Dockerfile):

```bash
docker compose up -d --build frontend
```

Ver el estado y los logs:

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

## Direcciones

- Frontend: http://localhost:5173
- API: http://localhost:8080/api
- Comprobación de salud del backend: http://localhost:8080/up
