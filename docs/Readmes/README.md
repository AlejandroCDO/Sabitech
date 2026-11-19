# Documentación de SABITECH WEB

Índice de la documentación técnica del proyecto. Está pensada para el **primer checkpoint** del ciclo y para que cualquier persona del equipo pueda entender qué hay hecho, qué es un prototipo y qué queda pendiente.

> **Nota sobre las asignaturas convalidadas.** IPE II, Sostenibilidad, Digitalización e Inglés Oral están convalidadas. Por eso solo se incluye una introducción breve de la empresa y el registro real del uso de IA en el proyecto. No se desarrollan el plan de personal, el análisis económico, la comparación manual/digital ni el informe de vídeos en inglés, salvo que sean necesarios para explicar una decisión técnica.

## 1. Por dónde empezar

| Si buscas... | Lee... |
|---|---|
| Cómo se arranca el proyecto | [README principal](../../README.md) |
| Qué hace la aplicación y qué reglas tiene | [Requisitos](Requisitos.md) |
| Cómo está organizado el trabajo | [Planificación](Planificacion.md) |
| Cómo son los datos | [Modelo de datos](Modelo_Datos.md) |
| Qué pantallas y recorridos hay | [Recorridos de usuario](Recorridos_Usuario.md) |
| Cómo está hecho el frontend | [Frontend](Frontend.md) |
| Cómo está hecha la API | [Backend](Backend.md) |
| Cómo se ejecuta y se despliega | [Despliegue](Despliegue.md) |
| Qué empresa ficticia hay detrás | [NexusCode](Empresa.md) |
| Qué herramientas de IA se han usado | [Uso real de IA](IA_Uso_Proyecto.md) |
| Qué falta y cómo se presenta | [Entrega del checkpoint](Entrega_Checkpoint.md) |

## 2. Documentos existentes

| Documento | Contenido | Estado |
|---|---|---|
| [README principal](../../README.md) | Instalación, usuarios de prueba, API y comandos | Actualizado |
| [Requisitos](Requisitos.md) | Perfiles, requisitos funcionales y no funcionales, reglas de negocio y casos de uso | Actualizado |
| [Arquitectura](Arquitectura.md) | Visión general, componentes, flujo de una petición y decisiones de diseño | Actualizado |
| [Guía de estilo](GuiaEstilo.md) | Colores, tipografía, componentes, responsive y accesibilidad | Actualizado |
| [Permisos](Permisos.md) | Matriz de permisos por perfil y códigos de respuesta | Actualizado |
| [Pruebas](Pruebas.md) | Plan y registro de las 25 pruebas manuales | Actualizado |
| [Correo de confirmación](Correo_Confirmacion.md) | Diseño del correo y reenvío controlado | Diseñado, no implementado |
| [QR temporal](QR_Temporal.md) | Diseño del token, caducidad y validación de asistencia | Diseñado, no implementado |
| [Pendientes](Pendientes.md) | Tareas posteriores al checkpoint | Actualizado |

## 3. Documentos nuevos de este checkpoint

| Documento | Qué aporta |
|---|---|
| [Planificacion.md](Planificacion.md) | Fases, calendario, reparto de tareas, ramas de Git, issues y riesgos |
| [Modelo_Datos.md](Modelo_Datos.md) | Diagrama, diccionario de datos, claves y restricciones |
| [Recorridos_Usuario.md](Recorridos_Usuario.md) | Recorridos por perfil, mapa de pantallas y comprobaciones de accesibilidad |
| [Frontend.md](Frontend.md) | Componentes, estado, sesión, validaciones y consumo de la API |
| [Backend.md](Backend.md) | Rutas, middleware, controladores, transacciones y referencia de la API |
| [Despliegue.md](Despliegue.md) | Docker, variables de entorno, copia de seguridad y entorno de demostración |
| [Empresa.md](Empresa.md) | Introducción breve de NexusCode, la empresa ficticia |
| [IA_Uso_Proyecto.md](IA_Uso_Proyecto.md) | Herramientas de IA usadas realmente, finalidad y verificaciones |
| [Entrega_Checkpoint.md](Entrega_Checkpoint.md) | Checklist de entrega, demostración, PPT y plan de continuación |
| [Prompt_Memoria_Claude.md](Prompt_Memoria_Claude.md) | Prompt para generar la memoria parcial con Claude |

## 4. Mapa con el checkpoint

| Punto del checkpoint | Dónde está documentado |
|---|---|
| 1. Definir y organizar el proyecto | [Requisitos](Requisitos.md), [Planificación](Planificacion.md) |
| 2. Diseñar la aplicación | [Modelo de datos](Modelo_Datos.md), [Recorridos](Recorridos_Usuario.md), [Guía de estilo](GuiaEstilo.md) |
| 3. Conseguir una primera reserva funcional | [Frontend](Frontend.md), [Backend](Backend.md), [Pruebas](Pruebas.md) |
| 4. Preparar el entorno y las siguientes funcionalidades | [Despliegue](Despliegue.md), [Permisos](Permisos.md), [Correo](Correo_Confirmacion.md), [QR](QR_Temporal.md) |
| 5. Empresa y Digitalización | [Empresa](Empresa.md) (solo introducción; el resto está convalidado) |
| 6. Uso de IA | [Uso real de IA](IA_Uso_Proyecto.md) (el informe de vídeos en inglés no se incluye por convalidación) |
| 7. Entrega y presentación | [Entrega del checkpoint](Entrega_Checkpoint.md) |

## 5. Estado de la versión

- **Versión:** checkpoint 1, rama `develop`.
- **Funciona:** registro, login, catálogo, detalle, reserva persistente, mis reservas y cancelación.
- **Parcial:** creación de charlas por API y listados de usuarios/asistencias para organización.
- **Diseñado, no implementado:** correo de confirmación y QR temporal.
- **Convalidado:** IPE II, Sostenibilidad, Digitalización e Inglés Oral.
