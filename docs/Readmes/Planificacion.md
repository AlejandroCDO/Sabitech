# Planificación y organización del trabajo

Documento de organización del equipo para el primer checkpoint. Recoge las fases, el reparto de tareas, el uso de Git y GitHub y los riesgos detectados. La planificación se apoya en el Gantt del proyecto (`docs/PDF/SABITECH_Gantt_Aula_A2.pdf`).

## 1. Equipo y responsabilidades

| Persona | Inicial | Responsabilidad principal |
|---|---|---|
| Alejandro Company | A | Backend, base de datos, despliegue y pruebas de API |
| Marc Penadés | M | Frontend, integración con la API, estilos y pruebas de interfaz |
| Alberto Bellanato | B | Análisis, modelo de datos, documentación, coordinación y presentación |

El reparto es una **propuesta**, no una división rígida. Las decisiones que afectan a varias partes se revisan en equipo y todo el mundo debe poder explicar el conjunto.

## 2. Fases del checkpoint

| Semana | Fechas | Trabajo principal | Evidencia |
|---|---|---|---|
| 1 | 12–18 octubre | Entender el encargo, definir perfiles, reglas y empresa ficticia | [Requisitos](Requisitos.md) y [Empresa](Empresa.md) |
| 2 | 19–25 octubre | Modelo de datos, bocetos, guía de estilo y contratos de la API | [Modelo de datos](Modelo_Datos.md), [Recorridos](Recorridos_Usuario.md) y [Guía de estilo](GuiaEstilo.md) |
| 3 | 26 octubre–1 noviembre | Proyectos frontend/backend, Docker, migraciones y datos de prueba | [Despliegue](Despliegue.md) y seeders |
| 4 | 2–8 noviembre | Catálogo y detalle conectados a la API; login y permisos iniciales | [Frontend](Frontend.md) y [Backend](Backend.md) |
| 5 | 9–15 noviembre | Reserva persistente, control de aforo y cancelación | [Pruebas](Pruebas.md), PR-01 a PR-15 |
| 6 | 16–22 noviembre | Repaso del recorrido completo, documentación y presentación | [Entrega del checkpoint](Entrega_Checkpoint.md) |
| Checkpoint | 23–30 noviembre | Entrega de memoria, PPT y demostración | Memoria parcial y presentación |

## 3. Reparto de tareas del checkpoint

| Tarea | Módulo | Responsable | Estado |
|---|---|---|---|
| Modelo de datos y migraciones | Servidor | A y B | Hecho |
| API de charlas, registro y login | Servidor | A | Hecho |
| Reserva con transacción y control de aforo | Servidor | A | Hecho |
| Cancelación de reservas | Servidor | A | Hecho |
| Permisos por rol en el middleware | Servidor | A | Hecho |
| Catálogo, búsqueda y filtros | Cliente | M | Hecho |
| Detalle de charla y pantalla de confirmación | Cliente | M | Hecho |
| Mis reservas y modal de cancelación | Cliente | M | Hecho |
| Perfil y foto de perfil | Cliente | M | Hecho |
| Guía de estilo y responsive | Interfaces | M | Hecho |
| Requisitos y reglas de negocio | Intermodular | B | Hecho |
| Arquitectura, permisos y documentación | Intermodular | B | Hecho |
| Correo de confirmación | Servidor | A | Diseñado |
| QR temporal y asistencia | Servidor y cliente | A y M | Diseñado |
| Pruebas manuales y capturas | Intermodular | M y B | En curso |

## 4. Uso de Git y GitHub

- **Ramas:** `main` para versiones estables, `develop` para la integración y `feature/*` para cada funcionalidad.
- **Pull requests:** los cambios entran en `develop` mediante PR revisado por otra persona del equipo.
- **Issues:** cada tarea, mejora o fallo se registra como issue con etiquetas como `frontend`, `backend`, `docs` o `bug`.
- **Commits:** mensajes cortos y en español, indicando qué se ha hecho.
- **Versión del checkpoint:** se etiquetará la versión entregada, por ejemplo `checkpoint-1`, sobre el commit que se presente.

Flujo habitual:

```text
feature/mi-tarea ──► pull request ──► develop ──► main (versión estable)
```

Repositorio: <https://github.com/AlejandroCDO/Sabitech>

## 5. Riesgos y cómo se afrontan

| Riesgo | Efecto | Medida |
|---|---|---|
| Dos personas reservan la última plaza a la vez | Se supera el aforo | Transacción con `lockForUpdate` y clave única en la base de datos |
| Cambios de última hora en el modelo | Hay que rehacer pantallas o migraciones | Documentar el modelo y acordar los campos antes de programar |
| El correo o el QR se retrasan | El checkpoint queda incompleto | Se presentan como diseñados y con pruebas previstas, sin decir que funcionan |
| Diferencias entre lo que muestra el frontend y lo que guarda el backend | Datos incoherentes | El backend es la única fuente de verdad; el frontend recarga tras reservar o cancelar |
| Falta de tiempo para pruebas | Se entregan casos sin ejecutar | Priorizar PR-01, PR-02 y PR-03 y dejar el resto documentado |
| Pérdida de datos de prueba | No se puede repetir la demostración | `migrate:fresh --seed` antes de cada prueba importante |

## 6. Registro de incidencias

Las incidencias se anotan aquí y, si son fallos reales, se abren como issue en GitHub con la etiqueta `bug`.

| N.º | Fecha | Descripción | Módulo | Gravedad | Estado |
|---|---|---|---|---|---|
| 1 | | | | | |

## 7. Plan de continuación

Las tareas posteriores al checkpoint están en [Pendientes](Pendientes.md). Las más importantes son:

1. Correo de confirmación con Mailpit.
2. QR temporal y validación de asistencia.
3. Área de gestión para organización.
4. Pruebas automáticas y entorno de demostración con HTTPS.

Cada tarea debe tener responsable, fecha y dependencia antes de empezar diciembre.
