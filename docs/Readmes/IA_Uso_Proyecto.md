# Uso real de IA en el proyecto

Este documento recoge las herramientas de IA que se han usado realmente durante el desarrollo de SABITECH WEB y cómo se ha comprobado su resultado. No incluye el informe de vídeos en inglés porque la asignatura de Inglés Oral está convalidada.

## 1. Herramientas utilizadas

| Herramienta | Tipo | Uso principal |
|---|---|---|
| Claude | Asistente conversacional | Explicar errores, revisar ideas, redactar borradores y contrastar decisiones |
| OpenCode | Asistente de código en terminal | Inspeccionar el repositorio, proponer cambios y generar documentación técnica |

La IA se ha usado como **apoyo**. Las decisiones finales, la ejecución de comandos y la validación del resultado han sido siempre del equipo.

## 2. Para qué se ha utilizado

| Tarea | Herramienta | Qué se pedía | Cómo se comprobó |
|---|---|---|---|
| Entender el proyecto | OpenCode y Claude | Resumir la estructura, rutas, tablas y flujo de reserva | Lectura del código y ejecución de la aplicación |
| Redactar documentación | OpenCode y Claude | Pasar notas técnicas a un README claro | Revisión manual y contraste con el código |
| Revisar el modelo de datos | Claude | Detectar relaciones y restricciones que faltaban | Comparación con las migraciones y pruebas de reserva |
| Entender errores | Claude | Explicar mensajes de Laravel, React o Docker | Reproducir el error y aplicar solo la solución comprobada |
| Mejorar validaciones | Claude y OpenCode | Revisar campos obligatorios y mensajes de error | Pruebas manuales de registro y reserva |
| Preparar pruebas | OpenCode | Proponer casos límite para el aforo y las reservas duplicadas | Ejecución de los casos y anotación del resultado |
| Preparar la presentación | Claude | Ordenar ideas y reducir texto | Revisión del equipo y ajuste al tiempo disponible |

## 3. Ejemplos de peticiones

Estos son ejemplos representativos, no un registro literal de todas las conversaciones:

- “Explícame qué hace este controlador y qué casos de error no está cubriendo.”
- “Revisa esta migración y dime si la clave única impide dos reservas activas.”
- “Convierte estas notas en un README para un alumno de 2.º DAW.”
- “¿Qué pruebas manuales debería hacer para comprobar el aforo?”
- “Revisa este texto y quita lo que no se pueda demostrar con el código.”

## 4. Qué se aceptó, qué se corrigió y qué se descartó

| Resultado | Ejemplo |
|---|---|
| Aceptado | Explicaciones de conceptos, borradores de documentación y listas de comprobación |
| Corregido | Nombres de tablas, estados de reserva y rutas que la IA confundía con las de Laravel por defecto |
| Descartado | Sugerencias de librerías o patrones que no encajaban con el nivel del proyecto o añadían complejidad innecesaria |
| Verificado antes de usar | Comandos de Docker, consultas SQL y cambios en migraciones |

## 5. Verificación del resultado

Antes de dar por bueno un cambio propuesto por IA se ha comprobado:

1. Que el código existe y está en la ruta indicada.
2. Que la explicación coincide con la versión real de Laravel, React o MySQL.
3. Que la aplicación arranca y la pantalla funciona.
4. Que la reserva se guarda en la base de datos.
5. Que el aforo no se descuadra al reservar y cancelar.
6. Que los mensajes de error son comprensibles.
7. Que no se han incluido datos personales, contraseñas ni tokens en las peticiones.

## 6. Qué no se ha hecho con IA

- No se ha integrado ningún modelo de IA dentro de SABITECH WEB.
- No se han generado datos reales de asistentes.
- No se ha dejado que la IA modifique la base de datos sin revisar.
- No se ha copiado código sin entenderlo.
- No se ha usado IA para decidir las reglas de negocio.

## 7. Limitaciones y riesgos

| Riesgo | Cómo se ha controlado |
|---|---|
| Inventar rutas, campos o funciones | Contraste con el código y ejecución real |
| Usar una versión antigua de una librería | Comprobación en la documentación oficial y en `composer.json` / `package.json` |
| Generar texto demasiado genérico | Revisión del equipo y ajuste al proyecto concreto |
| Exponer datos sensibles | No se han pegado contraseñas, tokens ni datos personales |
| Aceptar código inseguro | Revisión de validaciones, permisos y consultas |

## 8. Conclusión

La IA ha servido para acelerar la documentación, entender errores y revisar ideas. No sustituye la comprensión del código ni las pruebas. En este proyecto, cualquier afirmación de la memoria debe poder demostrarse con el repositorio, la aplicación en marcha o una captura.

## 9. Enlaces relacionados

- [Requisitos](Requisitos.md)
- [Backend](Backend.md)
- [Pruebas](Pruebas.md)
- [Entrega del checkpoint](Entrega_Checkpoint.md)
