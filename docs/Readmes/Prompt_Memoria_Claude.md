# Prompt para generar la memoria con Claude

## Cómo usarlo

1. Abre Claude y adjunta todos los README de `docs/Readmes/`, el `README.md` de la raíz y el documento con los puntos del checkpoint.
2. Pega el prompt que empieza en la línea siguiente.
3. Revisa el resultado: Claude no debe inventar capturas, resultados de pruebas ni funcionalidades.
4. Pasa el texto a Google Docs, aplica el formato APA 7 y exporta a PDF.

---

Actúa como redactor técnico y profesor de un ciclo formativo de **Desarrollo de Aplicaciones Web (2.º DAW)**. Vas a redactar la **memoria parcial del primer checkpoint de SABITECH WEB**, una aplicación de reservas para las jornadas de charlas tecnológicas SABITECH.

## Material de partida

Te adjunto:

1. Todos los README de `docs/Readmes/`.
2. El `README.md` de la raíz del repositorio.
3. El documento con los puntos del checkpoint que debe seguir la memoria.

Usa los README como fuente principal. Si un dato no aparece, no lo inventes: escribe “pendiente de concreción” o “no documentado”. Si los puntos adjuntos contradicen esta estructura, **prioriza los puntos adjuntos** y avisa al final del cambio realizado.

## Reglas de redacción

- Escribe en **español de España**, con voz activa, frases cortas y tono natural.
- Nivel de un alumno de 2.º DAW: claro, directo y bien explicado, sin grandilocuencia ni párrafos vacíos.
- Usa la **primera persona del plural** (“hemos implementado”, “hemos comprobado”).
- Distingue siempre entre **hecho**, **parcial**, **diseñado pero no implementado** y **pendiente**.
- No inventes capturas, métricas, resultados de pruebas, usuarios, fechas ni funcionalidades.
- Si una prueba no se ha ejecutado, escribe “pendiente de ejecución”; no la marques como superada.
- No desarrolles IPE II, Sostenibilidad, Digitalización ni Inglés Oral: están convalidadas. Incluye solo una **introducción breve de NexusCode** y el **uso real de IA en el proyecto**.
- No incluyas el informe de vídeos en inglés.
- La empresa se llama **NexusCode**.
- No menciones el proceso de generación del texto ni herramientas de escritura. El documento debe leerse como una memoria del equipo.
- No copies literalmente los README: resúmelos, ordénalos y conecta unas secciones con otras.
- Máximo **15 páginas en total**, incluyendo portada, índice, tablas, figuras y referencias. Si el documento adjunto fija otro límite, prevalece el adjunto.
- Usa como máximo **8 figuras** y **8 tablas**. No metas capturas gigantes ni texto dentro de imágenes.

## Estructura obligatoria y presupuesto de páginas

1. **Portada** (1 página): título, los tres autores, ciclo, asignatura, profesor y fecha. Si no consta el nombre del profesor, usa `[Profesor]`.
2. **Resumen y palabras clave** (0,5 páginas): 150–200 palabras y 4–6 palabras clave.
3. **Índice** (0,5 páginas).
4. **Introducción** (1 página): problema, objetivo general, objetivos específicos y alcance del checkpoint.
5. **Contexto y empresa** (0,5 páginas): qué es SABITECH, qué necesita y quién es NexusCode. Muy breve.
6. **Requisitos y alcance** (1 página): perfiles, requisitos funcionales principales, reglas de negocio y límites.
7. **Planificación** (1 página): fases, reparto de tareas, Git/GitHub y riesgos.
8. **Diseño** (2,5 páginas): arquitectura, modelo de datos, recorridos, pantallas, estilo y accesibilidad.
9. **Desarrollo** (2,5 páginas): frontend, backend, autenticación, reserva transaccional, cancelación y seguridad.
10. **Pruebas** (1,5 páginas): plan, casos obligatorios y resultados reales. Si no hay resultados, indica “pendiente de ejecución”.
11. **Uso de IA** (1 página): Claude y OpenCode, para qué se usaron, qué se aceptó o corrigió y cómo se verificó.
12. **Limitaciones y pendientes** (1 página): correo, QR, gestión, pruebas automáticas y entorno de demostración.
13. **Conclusiones** (0,5 páginas): qué se ha conseguido y qué se aprende del checkpoint.
14. **Referencias** (1 página): solo fuentes citadas, en APA 7.
15. **Anexos** (opcional, 0–1 página): solo si aportan algo que no cabe en el cuerpo.

En cada sección técnica incluye, cuando tenga sentido: **qué se hizo**, **por qué se decidió así**, **cómo se comprobó** y **qué queda pendiente**.

## Formato APA 7

Aplica el formato de **trabajo de estudiante** de APA 7:

- Times New Roman 12 pt, interlineado doble, márgenes de 2,54 cm.
- Sangría de primera línea de 1,27 cm en los párrafos.
- Número de página en la esquina superior derecha.
- Sin encabezado de página (no se usa “running head” en trabajos de estudiante).
- Títulos:
  - Nivel 1: centrado, negrita, mayúscula inicial y minúsculas.
  - Nivel 2: alineado a la izquierda, negrita.
  - Nivel 3: alineado a la izquierda, negrita y cursiva.
- Citas en el texto: `(Autor, año)` o `(Autor, año, p. 12)`. Cita solo lo que hayas consultado.
- Referencias ordenadas alfabéticamente, con sangría francesa de 1,27 cm.
- Tablas: “Tabla 1” en negrita, título en cursiva en la línea siguiente, nota al pie si hace falta.
- Figuras: “Figura 1” en negrita, título en cursiva, nota con la fuente.
- Cita todas las tablas y figuras en el texto antes de que aparezcan.
- No uses negritas decorativas ni colores en el cuerpo del texto.

En Google Docs:

- Usa los estilos de título para generar el índice automático.
- Inserta saltos de página antes de la portada, el índice, cada gran apartado y las referencias.
- Activa la numeración de páginas.
- Exporta a PDF al terminar.

## Contenido mínimo por sección

### Introducción

Explica el problema de gestionar reservas de un evento con hojas de cálculo o mensajes: duplicados, falta de control de aforo y poca trazabilidad. Formula el objetivo general y 3–4 objetivos específicos. Aclara que el checkpoint entrega una primera reserva funcional, no el sistema completo.

### Contexto y empresa

Presenta SABITECH y NexusCode en pocas líneas. No hagas un plan de empresa. Di que NexusCode es una S.L. ficticia formada por los tres integrantes y que actúa como proveedor técnico.

### Requisitos y alcance

Resume los perfiles (visitante, asistente, organizador, administrador), los requisitos funcionales más importantes y las reglas de negocio: una reserva activa por persona y charla, control de aforo, no reservar charlas canceladas o empezadas, cancelación solo antes del inicio y plaza liberada al cancelar.

### Planificación

Explica las fases del Gantt, el reparto entre Alejandro (backend), Marc (frontend) y Alberto (análisis y documentación), el uso de `main`, `develop` y `feature/*`, los pull requests y los riesgos principales.

### Diseño

Incluye:

- Arquitectura de tres capas: React, Laravel y MySQL sobre Docker.
- Modelo de datos con las tablas principales y sus relaciones.
- Un diagrama sencillo de entidad-relación o un esquema equivalente.
- Recorrido del asistente desde la agenda hasta la reserva y la cancelación.
- Mapa de pantallas.
- Decisiones de estilo y accesibilidad.

No hace falta pegar el diagrama completo si se entiende con una tabla y un esquema resumido.

### Desarrollo

Explica:

- Cómo se organiza el frontend: vistas, componentes, estado, sesión y capa de API.
- Cómo se organiza el backend: rutas, middleware de token, controladores y validaciones.
- El flujo de reserva con transacción y `lockForUpdate`.
- La clave única que impide reservas activas duplicadas.
- La cancelación y la liberación de la plaza.
- Las medidas de seguridad: contraseñas con hash, token hasheado, permisos por rol y consultas parametrizadas.

Incluye un diagrama de secuencia de la reserva si ayuda a entenderlo.

### Pruebas

Resume el plan de 25 pruebas. Destaca los tres casos obligatorios: reserva válida, reserva repetida y charla sin plazas. Si no hay resultados, escribe una tabla con “Pendiente de ejecución” y explica que las capturas se adjuntarán en el anexo o en la entrega. No inventes porcentajes de éxito.

### Uso de IA

Explica el uso real de Claude y OpenCode: explicar errores, revisar el modelo, redactar borradores, proponer pruebas y ordenar ideas. Indica que la IA no está integrada en la aplicación, que no se compartieron datos sensibles y que todo cambio se revisó y se probó. Diferéncialo de un uso acrítico.

### Limitaciones y pendientes

Habla del correo de confirmación, el QR temporal, el área de gestión visual, las pruebas automáticas y el entorno de demostración con HTTPS. Explica qué está diseñado y qué no está implementado.

### Conclusiones

Cierra con lo conseguido: reserva funcional, control de aforo, persistencia, cancelación y documentación. Añade una reflexión breve sobre lo aprendido y lo que se priorizará después.

## Referencias sugeridas

Incluye solo las que cites en el texto. Ajusta la fecha o usa “s. f.” si no consta. No inventes DOI ni años.

- American Psychological Association. (2020). *Publication manual of the American Psychological Association* (7.ª ed.). https://doi.org/10.1037/0000165-000
- Docker. (s. f.). *Docker Docs*. Recuperado el 18 de noviembre de 2026, de https://docs.docker.com/
- Laravel. (s. f.). *Laravel documentation*. Recuperado el 18 de noviembre de 2026, de https://laravel.com/docs
- MDN Web Docs. (s. f.). *Fetch API*. Recuperado el 18 de noviembre de 2026, de https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
- Oracle. (s. f.). *MySQL 8.4 Reference Manual*. Recuperado el 18 de noviembre de 2026, de https://dev.mysql.com/doc/refman/8.4/en/
- OWASP Foundation. (2021). *OWASP Top 10:2021*. https://owasp.org/Top10/
- PHP Group. (s. f.). *PHP Manual*. Recuperado el 18 de noviembre de 2026, de https://www.php.net/manual/en/
- React. (s. f.). *React documentation*. Recuperado el 18 de noviembre de 2026, de https://react.dev/
- Sabitech. (2026). *SABITECH WEB* [Repositorio de código]. GitHub. https://github.com/AlejandroCDO/Sabitech
- World Wide Web Consortium. (2023). *Web Content Accessibility Guidelines (WCAG) 2.2*. https://www.w3.org/TR/WCAG22/

## Comprobación final antes de entregar

- [ ] El documento tiene 15 páginas o menos.
- [ ] La portada sigue el formato APA 7 de trabajo de estudiante.
- [ ] El índice se ha generado automáticamente.
- [ ] Todas las tablas y figuras están numeradas, tituladas y citadas en el texto.
- [ ] Las pruebas no ejecutadas aparecen como pendientes.
- [ ] No se han desarrollado asignaturas convalidadas.
- [ ] No hay afirmaciones que no se puedan demostrar con los README o el repositorio.
- [ ] Las citas del texto coinciden con la lista de referencias.
- [ ] Las referencias tienen sangría francesa y orden alfabético.
- [ ] El español es consistente y no hay párrafos de relleno.
- [ ] El PDF final se ha revisado en un lector de PDF.

## Qué debes devolverme

Devuelve el **texto completo de la memoria**, ordenado por secciones y listo para pegar en Google Docs. Cuando falte una captura, escribe un marcador como:

`[INSERTAR FIGURA X: captura de la pantalla de Mis reservas]`

Al final, añade una lista breve de los datos que el equipo debe rellenar o verificar antes de entregar.
