# Frontend de SABITECH WEB

Interfaz hecha con React 19 y Vite 8. Consume la API de Laravel y muestra el catálogo, el registro, el login y las reservas.

## Arranque con Docker

Desde la raíz del repositorio:

```bash
docker compose up -d --build frontend
```

La aplicación queda en <http://localhost:5173>.

## Arranque sin Docker

```bash
npm install
npm run dev
```

La URL de la API se toma de `VITE_API_URL`. Si no se define, se usa `http://localhost:8080/api`.

## Comandos

```bash
npm run dev      # desarrollo con recarga en caliente
npm run build    # compilación de producción
npm run preview  # previsualizar la compilación
npm run lint     # ESLint
```

## Estructura

```text
src/
├── api/         Llamadas a la API y ApiError
├── assets/      Imágenes, logo y avatar por defecto
├── components/  Navbar, footer, formularios y modal
├── hooks/       useCharlasReservadas
├── models/      Charla y User
├── utils/       Gestión del token
├── views/       Inicio, charlas, auth, reservas y perfil
├── App.jsx      Estado global y navegación
└── main.jsx     Punto de entrada
```

## Documentación

- [Frontend](../docs/Readmes/Frontend.md)
- [Recorridos de usuario](../docs/Readmes/Recorridos_Usuario.md)
- [Despliegue](../docs/Readmes/Despliegue.md)
- [README principal](../README.md)
