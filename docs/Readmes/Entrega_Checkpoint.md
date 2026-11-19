# Entrega del primer checkpoint

Esta guía reúne lo que hay que enseñar, cómo demostrarlo y qué queda para después. La prioridad es que la reserva funcione en directo y que no se afirme nada que no se pueda comprobar.

> **Asignaturas convalidadas:** no se incluyen el informe de vídeos en inglés, el plan de digitalización ni el plan económico de la empresa. Solo se presenta una introducción breve de NexusCode y el uso real de IA en el proyecto.

## 1. Checklist de entrega

| Elemento | Estado | Dónde está |
|---|---|---|
| Repositorio actualizado | Pendiente de etiquetar | GitHub, rama `develop` |
| README con instrucciones | Hecho | [README principal](../../README.md) |
| Requisitos y reglas | Hecho | [Requisitos](Requisitos.md) |
| Planificación | Hecho | [Planificación](Planificacion.md) |
| Modelo de datos | Hecho | [Modelo de datos](Modelo_Datos.md) |
| Recorridos y pantallas | Hecho | [Recorridos](Recorridos_Usuario.md) |
| Guía de estilo y accesibilidad | Hecho | [Guía de estilo](GuiaEstilo.md) |
| Permisos | Hecho | [Permisos](Permisos.md) |
| Entorno y despliegue | Hecho | [Despliegue](Despliegue.md) |
| Correo y QR diseñados | Hecho | [Correo](Correo_Confirmacion.md), [QR](QR_Temporal.md) |
| Empresa | Introducción breve | [NexusCode](Empresa.md) |
| Uso real de IA | Hecho | [IA](IA_Uso_Proyecto.md) |
| Pruebas ejecutadas y capturadas | En curso | [Pruebas](Pruebas.md) |
| Memoria parcial | Pendiente | Generar con Claude |
| PPT y demostración | Pendiente | Esta guía |

Antes de entregar:

```bash
git status
git add .
git commit -m "Documentación del primer checkpoint"
git tag checkpoint-1
git push origin develop
git push origin checkpoint-1
```

## 2. Demostración en directo

Duración recomendada: **4 minutos**. Hay que tener la aplicación arrancada y los datos sembrados.

### Preparación

```bash
docker compose up -d
docker compose exec web php artisan migrate:fresh --seed
```

Comprobar que el frontend abre en <http://localhost:5173> y que la API responde en <http://localhost:8080/api/charlas>.

### Guion

1. **Inicio (20 s):** presentar SABITECH y explicar que el objetivo es reservar una plaza sin duplicados ni sobreaforo.
2. **Agenda (30 s):** enseñar búsqueda, filtros y estados “Próxima”, “Plazas agotadas”, “Finalizada” y “Cancelada”.
3. **Detalle (30 s):** abrir una charla con plazas y señalar ponente, fecha, ubicación y plazas disponibles.
4. **Login (20 s):** entrar con `asistente1@sabitech.test` / `password`.
5. **Reserva (40 s):** reservar, enseñar “Plaza confirmada” y comprobar que la tarjeta cambia a “Plaza reservada”.
6. **Mis reservas (30 s):** abrir el listado, entrar en el detalle y cancelar.
7. **Aforo (20 s):** explicar que la plaza vuelve a quedar libre y que el backend usa una transacción con bloqueo.
8. **Cierre (10 s):** recordar que el correo y el QR están diseñados, no implementados.

### Si algo falla

- No improvisar una funcionalidad que no existe.
- Enseñar el error y explicar qué se ha comprobado.
- Tener preparadas capturas de respaldo de la reserva y de “Mis reservas”.
- Si el login falla, comprobar que se ha ejecutado el seeder.

## 3. Estructura del PPT

| Diapositiva | Contenido | Tiempo |
|---|---|---|
| 1 | Título, asignatura, integrantes y fecha | 10 s |
| 2 | Problema: reservas manuales, duplicados y aforo | 30 s |
| 3 | Solución: SABITECH WEB y recorrido principal | 30 s |
| 4 | Requisitos y reglas de negocio | 30 s |
| 5 | Arquitectura y modelo de datos | 40 s |
| 6 | Reserva: transacción y control de aforo | 40 s |
| 7 | Demostración en directo | 3–4 min |
| 8 | Pruebas y resultados | 30 s |
| 9 | Pendientes: correo, QR y gestión | 30 s |
| 10 | Conclusión y preguntas | 20 s |

Consejos:

- Máximo 6 líneas por diapositiva.
- Usar capturas reales, no maquetas.
- No leer el texto de la diapositiva.
- Llevar la aplicación ya arrancada antes de empezar.

## 4. Evidencias para la memoria

| Evidencia | Qué debe mostrar | Estado |
|---|---|---|
| EV-01 | Pantalla de inicio | Pendiente de captura |
| EV-02 | Agenda con filtros | Pendiente de captura |
| EV-03 | Detalle de una charla con plazas | Pendiente de captura |
| EV-04 | Registro con validaciones | Pendiente de captura |
| EV-05 | Login correcto | Pendiente de captura |
| EV-06 | Plaza confirmada | Pendiente de captura |
| EV-07 | Mis reservas | Pendiente de captura |
| EV-08 | Modal de cancelación | Pendiente de captura |
| EV-09 | Reserva cancelada y plaza liberada | Pendiente de captura |
| EV-10 | Error de reserva duplicada | Pendiente de captura |
| EV-11 | Error de aforo completo | Pendiente de captura |
| EV-12 | Respuesta de la API con token | Pendiente de captura |

Las capturas deben llevar pie de figura y explicar qué se ve. No se deben usar capturas de una versión anterior si el aspecto ha cambiado.

## 5. Plan de continuación

| Periodo | Tarea | Responsable | Dependencia |
|---|---|---|---|
| 1–14 diciembre | Correo de confirmación con Mailpit y plantilla HTML | A | Reserva creada |
| 1–14 diciembre | QR temporal de 30 s y endpoint de validación | A y M | Correo y secreto de reserva |
| 15–31 diciembre | Área de organización y listado visual de asistencias | M y B | Permisos y asistencias |
| 15–31 diciembre | Cancelación de charlas y aviso a asistentes | A | Correo |
| 1–31 enero | Pruebas automáticas de la API y del flujo de reserva | A | Endpoints estables |
| 1–31 enero | Revisión de accesibilidad y responsive | M | Pantallas terminadas |
| 1–15 febrero | Entorno de demostración con HTTPS y `APP_DEBUG=false` | A | Despliegue estable |
| 1–15 febrero | Manual de uso y documentación final | B | Funcionalidades cerradas |
| 16–22 febrero | Memoria final, PPT y ensayo | B, A y M | Todo lo anterior |

## 6. Riesgos de la siguiente fase

| Riesgo | Mitigación |
|---|---|
| El correo no llega en la demostración | Usar Mailpit y enseñar la bandeja local |
| El QR caduca antes de enseñarlo | Generar uno nuevo y explicar la ventana de 30 s |
| El área de organización no está lista | Mantener la API como respaldo y no prometer pantallas |
| Falta tiempo para pruebas automáticas | Priorizar el flujo de reserva y el control de aforo |
| Cambios de última hora en el modelo | Congelar el esquema antes de enero |

## 7. Qué decir en la exposición

Mensajes clave:

- El problema no es solo “hacer una web”, sino evitar duplicados y controlar el aforo.
- La decisión importante es que el backend valida y bloquea la charla dentro de una transacción.
- El frontend no decide si hay plazas: muestra lo que confirma la API.
- El correo y el QR están diseñados, pero no se presentan como terminados.
- Las pruebas que no se hayan ejecutado se presentan como pendientes.

No se incluye guion en inglés porque Inglés Oral está convalidado. Si el profesorado solicita una intervención, se preparará aparte.

## 8. Enlaces relacionados

- [Planificación](Planificacion.md)
- [Pruebas](Pruebas.md)
- [Pendientes](Pendientes.md)
- [Prompt para la memoria](Prompt_Memoria_Claude.md)
