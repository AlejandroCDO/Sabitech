import "./CharlaPages.css";
import heroImage from "../assets/hero-sabitech.jpg";

const ICONOS = {
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
  entrada: (
    <>
      <path d="M3 9V6h18v3a3 3 0 000 6v3H3v-3a3 3 0 000-6z" />
      <path d="M15 6v12" />
    </>
  ),
  usuario: (
    <>
      <path d="M20 21a8 8 0 00-16 0" />
      <circle cx="12" cy="7" r="4" />
    </>
  ),
  flecha: <path d="M9 6l6 6-6 6" />,
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

function datosPlazas(charla) {
  if (charla.cancelada) {
    return {
      titulo: "Charla cancelada",
      texto: "Esta sesión no se celebrará.",
      agotada: true,
    };
  }

  if (charla.completa) {
    return {
      titulo: "No quedan plazas",
      texto: "Todas las plazas están ocupadas.",
      agotada: true,
    };
  }

  const disponibles = charla.plazasDisponibles;
  return {
    titulo: disponibles === 1 ? "1 plaza disponible" : `${disponibles} plazas disponibles`,
    texto: "Reserva antes de que se agoten.",
    agotada: false,
  };
}

export function CharlaDetalleView({ charla, reservando, error, onVolver, onReservar }) {
  const empezada = aFecha(charla.inicio) <= new Date();
  const plazas = datosPlazas(charla);
  const deshabilitado = reservando || charla.cancelada || charla.completa || empezada;

  let textoBoton = "Reservar plaza";
  if (reservando) {
    textoBoton = "Reservando...";
  } else if (charla.cancelada) {
    textoBoton = "Charla cancelada";
  } else if (empezada && !charla.completa) {
    textoBoton = "Charla finalizada";
  } else if (charla.completa) {
    textoBoton = "Sin plazas";
  }

  return (
    <div className="detalle-pagina">
      <div className="detalle-contenedor">
        <nav className="detalle-migas" aria-label="Migas de pan">
          <button type="button" onClick={onVolver}>
            Inicio
          </button>
          <Icono nombre="flecha" />
          <button type="button" onClick={onVolver}>
            Todas las charlas
          </button>
          <Icono nombre="flecha" />
          <span className="detalle-migas-actual">Detalle de charla</span>
        </nav>

        <div className="detalle-grid">
          <article className="detalle-principal">
            <div className="detalle-hero">
              <img
                src={charla.foto_url || heroImage}
                alt={charla.titulo}
                onError={(evento) => {
                  evento.currentTarget.onerror = null;
                  evento.currentTarget.src = heroImage;
                }}
              />
            </div>

            <p className="detalle-tematica">{charla.ponente_especialidad || "Charla SABITECH"}</p>
            <h1 className="detalle-titulo">{charla.titulo}</h1>

            <div className="detalle-ponente">
              <span className="detalle-avatar">
                <Icono nombre="usuario" />
              </span>
              <div>
                <p className="detalle-ponente-nombre">{charla.ponente_nombre || "Ponente SABITECH"}</p>
                <p className="detalle-ponente-rol">{charla.ponente_especialidad || "Ponente"}</p>
              </div>
            </div>

            <h2 className="detalle-descripcion-titulo">Sobre la charla</h2>
            <p className="detalle-descripcion">{charla.descripcion}</p>
            <p className="detalle-descripcion detalle-descripcion--suave">
              Esta charla forma parte de la agenda de SABITECH 2026. La entrada es gratuita con
              reserva previa y las plazas son limitadas.
            </p>
          </article>

          <aside className="detalle-lateral">
            <div className="detalle-tarjeta">
              <h2 className="detalle-tarjeta-titulo">Nos vemos en SABITECH</h2>
              <p className="detalle-tarjeta-subtitulo">Entrada gratuita · Evento presencial</p>

              <div className="detalle-datos">
                <div className="detalle-dato">
                  <Icono nombre="calendario" />
                  <div>
                    <span className="detalle-dato-etiqueta">Fecha</span>
                    <span className="detalle-dato-valor">{formatearFecha(charla.inicio)}</span>
                  </div>
                </div>

                <div className="detalle-dato">
                  <Icono nombre="reloj" />
                  <div>
                    <span className="detalle-dato-etiqueta">Hora · CEST</span>
                    <span className="detalle-dato-valor">{formatearHorario(charla.inicio, charla.fin)}</span>
                  </div>
                </div>

                <div className="detalle-dato">
                  <Icono nombre="ubicacion" />
                  <div>
                    <span className="detalle-dato-etiqueta">Ubicación</span>
                    <span className="detalle-dato-valor">{formatearUbicacion(charla)}</span>
                  </div>
                </div>
              </div>

              <div className={`detalle-plazas ${plazas.agotada ? "detalle-plazas--agotada" : ""}`}>
                <Icono nombre="entrada" />
                <div>
                  <strong>{plazas.titulo}</strong>
                  <span>{plazas.texto}</span>
                </div>
              </div>

              {error && (
                <p className="detalle-error" role="alert">
                  {error}
                </p>
              )}

              <button className="detalle-boton" type="button" disabled={deshabilitado} onClick={onReservar}>
                {textoBoton}
                {!deshabilitado && <Icono nombre="entrada" />}
              </button>

              <p className="detalle-nota">
                Tu plaza quedará guardada en Mis reservas.
                <br />
                Podrás cancelarla si cambian tus planes.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
