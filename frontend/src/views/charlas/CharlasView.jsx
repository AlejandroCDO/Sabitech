
import { useEffect, useState } from "react";
import "./CharlasView.css";
import "../home/MainView.css";
import heroImage from "../../assets/hero-sabitech.jpg";
import { list } from "../../api/charlasApi";
import { crearReserva } from "../../api/reservasApi";
import { CharlaDetalleView } from "./CharlaDetalleView";
import { PlazaConfirmadaView } from "./PlazaConfirmadaView";

const ICONOS = {
  calendario: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </>
  ),
  ubicacion: (
    <>
      <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 0116 0z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  reloj: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  usuario: (
    <>
      <path d="M20 21a8 8 0 00-16 0" />
      <circle cx="12" cy="7" r="4" />
    </>
  ),
  entrada: (
    <>
      <path d="M3 9V6h18v3a3 3 0 000 6v3H3v-3a3 3 0 000-6z" />
      <path d="M15 6v12" />
    </>
  ),
  flecha: <path d="M5 12h14M13 6l6 6-6 6" />,
  lupa: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m16 16 5 5" />
    </>
  ),
  alerta: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v6M12 16.5v.5" />
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

function formatearHora(valor) {
  return aFecha(valor).toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

function formatearDia(valor) {
  const texto = aFecha(valor).toLocaleDateString("es-ES", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

function diaMes(valor) {
  const fecha = aFecha(valor);

  return {
    dia: fecha.getDate(),
    mes: fecha
      .toLocaleDateString("es-ES", { month: "short" })
      .replace(".", "")
      .toUpperCase(),
  };
}

function obtenerTextoBusqueda(charla) {
  return [
    charla.titulo,
    charla.descripcion,
    charla.ponente_nombre,
    charla.ponente_especialidad,
    charla.ubicacion_nombre,
    charla.municipio,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

export function CharlasView({ onDetalleChange }) {
  const [charlas, setCharlas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [filtro, setFiltro] = useState("todas");

  const [pagina, setPagina] = useState("lista");
  const [charlaSeleccionada, setCharlaSeleccionada] = useState(null);
  const [reservandoId, setReservandoId] = useState(null);
  const [errorDetalle, setErrorDetalle] = useState("");
  const [aviso, setAviso] = useState(null);

  useEffect(() => {
    onDetalleChange?.(pagina !== "lista");
  }, [pagina, onDetalleChange]);

  async function cargarCharlas() {
    try {
      const datos = await list();
      setCharlas(datos);
      setError("");
    } catch (errorCarga) {
      setError(
        errorCarga.message || "No se han podido cargar las charlas."
      );
    } finally {
      setCargando(false);
    }
  }

  useEffect(() => {
    let activo = true;

    list()
      .then((datos) => {
        if (activo) {
          setCharlas(datos);
          setError("");
        }
      })
      .catch((errorCarga) => {
        if (activo) {
          setError(
            errorCarga.message || "No se han podido cargar las charlas."
          );
        }
      })
      .finally(() => {
        if (activo) {
          setCargando(false);
        }
      });

    return () => {
      activo = false;
    };
  }, []);

  useEffect(() => {
    if (!aviso) {
      return undefined;
    }

    const temporizador = setTimeout(() => setAviso(null), 6000);

    return () => clearTimeout(temporizador);
  }, [aviso]);

  const ahora = new Date();

  const charlasOrdenadas = [...charlas].sort(
    (a, b) => aFecha(a.inicio) - aFecha(b.inicio)
  );

  const charlasFiltradas = charlasOrdenadas.filter((charla) => {
    const empezada = aFecha(charla.inicio) <= ahora;

    if (filtro === "proximas" && (empezada || charla.cancelada)) {
      return false;
    }

    if (filtro === "finalizadas" && (!empezada || charla.cancelada)) {
      return false;
    }

    if (filtro === "canceladas" && !charla.cancelada) {
      return false;
    }

    if (
      busqueda.trim() &&
      !obtenerTextoBusqueda(charla).includes(busqueda.trim().toLowerCase())
    ) {
      return false;
    }

    return true;
  });

  async function reservar(charla) {
    setReservandoId(charla.id);
    setAviso(null);
    setErrorDetalle("");

    try {
      await crearReserva(charla.id);

      setCharlaSeleccionada(charla);
      setPagina("confirmada");

      window.scrollTo({ top: 0, behavior: "smooth" });

      await cargarCharlas();
    } catch (errorReserva) {
      const texto =
        errorReserva.message || "No se ha podido realizar la reserva.";

      if (pagina === "detalle") {
        setErrorDetalle(texto);
      } else {
        setAviso({ tipo: "error", texto });
      }
    } finally {
      setReservandoId(null);
    }
  }

  function abrirDetalle(charla) {
    setCharlaSeleccionada(charla);
    setErrorDetalle("");
    setAviso(null);
    setPagina("detalle");

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function volverAlPrograma() {
    setPagina("lista");
    setErrorDetalle("");
    setAviso(null);
    cargarCharlas();

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (pagina === "detalle" && charlaSeleccionada) {
    return (
      <CharlaDetalleView
        charla={charlaSeleccionada}
        reservando={reservandoId === charlaSeleccionada.id}
        error={errorDetalle}
        onVolver={volverAlPrograma}
        onReservar={() => reservar(charlaSeleccionada)}
      />
    );
  }

  if (pagina === "confirmada" && charlaSeleccionada) {
    return (
      <PlazaConfirmadaView
        charla={charlaSeleccionada}
        onVolver={volverAlPrograma}
      />
    );
  }

  return (
    <main className="home agenda-pagina">
      <section className="agenda-cabecera">
        <div className="agenda-cabecera-contenido">
          <p className="home-eyebrow">Descubre SABITECH</p>

          <h1>Toda la agenda de charlas</h1>

          <p>
            Explora todas las sesiones, conoce a sus ponentes y encuentra
            las charlas que más te interesan.
          </p>

          <div className="agenda-cabecera-datos">
            <span>
              <Icono nombre="calendario" />
              Jornadas SABITECH 2026
            </span>

            <span>
              <Icono nombre="entrada" />
              Entrada gratuita con reserva previa
            </span>
          </div>
        </div>

        <div className="agenda-cabecera-imagen">
          <img
            src={heroImage}
            alt="Escenario de las jornadas tecnológicas SABITECH"
          />
        </div>
      </section>

      <section className="agenda-contenido">
        <div className="agenda-titulo">
          <div>
            <p className="home-eyebrow">Programa completo</p>
            <h2>Encuentra tu próxima charla</h2>
            <p>
              Consulta las sesiones disponibles y reserva tu plaza.
            </p>
          </div>

          <span className="agenda-contador">
            {charlasFiltradas.length}{" "}
            {charlasFiltradas.length === 1 ? "charla" : "charlas"}
          </span>
        </div>

        <div className="agenda-controles">
          <div className="agenda-buscador">
            <Icono nombre="lupa" />

            <input
              type="search"
              placeholder="Buscar por título, ponente o ubicación..."
              value={busqueda}
              onChange={(evento) => setBusqueda(evento.target.value)}
              aria-label="Buscar charlas"
            />
          </div>

          <div className="agenda-filtros" aria-label="Filtrar charlas">
            <button
              type="button"
              className={filtro === "todas" ? "activo" : ""}
              onClick={() => setFiltro("todas")}
            >
              Todas
            </button>

            <button
              type="button"
              className={filtro === "proximas" ? "activo" : ""}
              onClick={() => setFiltro("proximas")}
            >
              Próximas
            </button>

            <button
              type="button"
              className={filtro === "finalizadas" ? "activo" : ""}
              onClick={() => setFiltro("finalizadas")}
            >
              Finalizadas
            </button>

            <button
              type="button"
              className={filtro === "canceladas" ? "activo" : ""}
              onClick={() => setFiltro("canceladas")}
            >
              Canceladas
            </button>
          </div>
        </div>

        {aviso && (
          <p className="home-aviso home-aviso--error" role="alert">
            <Icono nombre="alerta" />
            {aviso.texto}
          </p>
        )}

        {cargando && (
          <div className="home-estado">
            <span className="home-spinner" aria-hidden="true" />
            <p>Cargando todas las charlas...</p>
          </div>
        )}

        {!cargando && error && (
          <div className="home-estado home-estado--error" role="alert">
            <Icono nombre="alerta" />
            <p>{error}</p>

            <button
              className="home-boton home-boton--principal"
              type="button"
              onClick={() => {
                setCargando(true);
                cargarCharlas();
              }}
            >
              Reintentar
              <Icono nombre="flecha" />
            </button>
          </div>
        )}

        {!cargando && !error && charlasFiltradas.length === 0 && (
          <div className="home-estado agenda-vacio">
            <Icono nombre="calendario" />

            <h3>No se han encontrado charlas</h3>

            <p>
              Prueba a cambiar los filtros o el texto de búsqueda.
            </p>

            {(busqueda || filtro !== "todas") && (
              <button
                className="home-boton home-boton--contorno"
                type="button"
                onClick={() => {
                  setBusqueda("");
                  setFiltro("todas");
                }}
              >
                Limpiar filtros
              </button>
            )}
          </div>
        )}

        {!cargando && !error && charlasFiltradas.length > 0 && (
          <div className="home-tarjetas agenda-tarjetas">
            {charlasFiltradas.map((charla) => {
              const fecha = diaMes(charla.inicio);
              const empezada = aFecha(charla.inicio) <= ahora;
              const deshabilitada =
                charla.cancelada || charla.completa || empezada;

              let textoEstado = "Próxima";
              let claseEstado = "agenda-estado--proxima";

              if (charla.cancelada) {
                textoEstado = "Cancelada";
                claseEstado = "agenda-estado--cancelada";
              } else if (charla.completa) {
                textoEstado = "Plazas agotadas";
                claseEstado = "agenda-estado--agotada";
              } else if (empezada) {
                textoEstado = "Finalizada";
                claseEstado = "agenda-estado--finalizada";
              }

              return (
                <article className="home-tarjeta agenda-tarjeta" key={charla.id}>
                  <div className="home-tarjeta-imagen">
                    <img
                      src={charla.foto_url || heroImage}
                      alt={charla.titulo}
                      loading="lazy"
                      onError={(evento) => {
                        evento.currentTarget.onerror = null;
                        evento.currentTarget.src = heroImage;
                      }}
                    />

                    <span
                      className="home-tarjeta-fecha"
                      aria-label={`${fecha.dia} de ${fecha.mes}`}
                    >
                      <span className="home-tarjeta-dia">{fecha.dia}</span>
                      <span className="home-tarjeta-mes">{fecha.mes}</span>
                    </span>

                    <span className={`agenda-estado ${claseEstado}`}>
                      {textoEstado}
                    </span>
                  </div>

                  <div className="home-tarjeta-cuerpo">
                    <p className="home-tarjeta-tematica">
                      {charla.ponente_especialidad || "Charla SABITECH"}
                    </p>

                    <h3>{charla.titulo}</h3>

                    <p className="home-tarjeta-descripcion">
                      {charla.descripcion}
                    </p>

                    <div className="home-ponente">
                      <span className="home-ponente-icono">
                        <Icono nombre="usuario" />
                      </span>

                      <div>
                        <p className="home-ponente-nombre">
                          {charla.ponente_nombre || "Ponente SABITECH"}
                        </p>

                        <p className="home-ponente-rol">Ponente</p>
                      </div>
                    </div>

                    <div className="home-tarjeta-meta">
                      <span>
                        <Icono nombre="reloj" />
                        {formatearHora(charla.inicio)} –{" "}
                        {formatearHora(charla.fin)}
                      </span>

                      <span>
                        <Icono nombre="ubicacion" />
                        {charla.ubicacion_nombre || charla.municipio || "Sede SABITECH"}
                      </span>
                    </div>

                    <div className="agenda-fecha-completa">
                      {formatearDia(charla.inicio)}
                    </div>

                    <div className="home-tarjeta-pie">
                      <button
                        className="home-tarjeta-detalle"
                        type="button"
                        onClick={() => abrirDetalle(charla)}
                      >
                        Ver detalles
                        <Icono nombre="flecha" />
                      </button>

                      <button
                        className="home-boton home-boton--principal home-boton-reserva"
                        type="button"
                        disabled={
                          deshabilitada || reservandoId === charla.id
                        }
                        onClick={() => reservar(charla)}
                      >
                        {reservandoId === charla.id
                          ? "Reservando..."
                          : charla.cancelada
                            ? "Cancelada"
                            : empezada
                              ? "Finalizada"
                              : charla.completa
                                ? "Sin plazas"
                                : "Reservar plaza"}
                        {!deshabilitada && <Icono nombre="entrada" />}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
