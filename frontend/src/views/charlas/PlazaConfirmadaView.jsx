import { useState } from "react";
import "./CharlaPages.css";

const ICONOS = {
  check: <path d="M7 12.5l3.2 3.2L17 9" />,
  calendario: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </>
  ),
  reloj: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  ubicacion: (
    <>
      <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 0116 0z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
};

function Icono({ nombre }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      {ICONOS[nombre]}
    </svg>
  );
}

function aFecha(valor) {
  if (!valor) {
    return new Date(0);
  }
  return new Date(String(valor).replace(" ", "T"));
}

function formatearFecha(valor) {
  return aFecha(valor).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatearHora(valor) {
  return aFecha(valor).toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

function formatearHorario(inicio, fin) {
  if (!fin) {
    return formatearHora(inicio);
  }
  return `${formatearHora(inicio)}–${formatearHora(fin)}`;
}

function formatearUbicacion(charla) {
  const ubicacion = [charla.municipio, charla.ubicacion_nombre].filter(Boolean).join(" · ");
  return ubicacion || "Sede SABITECH";
}

export function PlazaConfirmadaView({ charla, onVolver }) {
  const [avisoQr, setAvisoQr] = useState(false);

  const ponente = [charla.ponente_nombre || "Ponente SABITECH", charla.ponente_especialidad]
    .filter(Boolean)
    .join(" · ");

  return (
    <div className="plaza-pagina">
      <div className="plaza-contenido">
        <div className="plaza-check">
          <Icono nombre="check" />
        </div>

        <h1 className="plaza-titulo">¡Plaza confirmada!</h1>
        <p className="plaza-subtitulo">
          Ya tienes tu sitio. Prepara tus preguntas y ven a conectar con las ideas que están
          construyendo el futuro.
        </p>

        <article className="plaza-tarjeta">
          <div className="plaza-cabecera">
            <span className="plaza-etiqueta">Tu próxima charla</span>
            <span className="plaza-badge">
              <Icono nombre="check" />
              Confirmada
            </span>
          </div>

          <h2 className="plaza-tarjeta-titulo">{charla.titulo}</h2>
          <p className="plaza-ponente">{ponente}</p>

          <div className="plaza-separador" />

          <div className="plaza-datos">
            <div className="plaza-dato">
              <Icono nombre="calendario" />
              <div>
                <span className="plaza-dato-etiqueta">Fecha</span>
                <span className="plaza-dato-valor">{formatearFecha(charla.inicio)}</span>
              </div>
            </div>

            <div className="plaza-dato">
              <Icono nombre="reloj" />
              <div>
                <span className="plaza-dato-etiqueta">Hora · CEST</span>
                <span className="plaza-dato-valor">{formatearHorario(charla.inicio, charla.fin)}</span>
              </div>
            </div>

            <div className="plaza-dato">
              <Icono nombre="ubicacion" />
              <div>
                <span className="plaza-dato-etiqueta">Ubicación</span>
                <span className="plaza-dato-valor">{formatearUbicacion(charla)}</span>
              </div>
            </div>
          </div>
        </article>

        <div className="plaza-acciones">
          <button className="plaza-boton" type="button" onClick={() => setAvisoQr(true)}>
            Ver mi QR
          </button>
          <button className="plaza-boton plaza-boton--contorno" type="button" onClick={onVolver}>
            Volver al programa
          </button>
        </div>

        <p className="plaza-nota">Encontrarás tu acreditación y todos los detalles en Mis reservas.</p>
        {avisoQr && (
          <p className="plaza-aviso" role="status">
            Tu QR estará disponible en Mis reservas.
          </p>
        )}
      </div>
    </div>
  );
}
