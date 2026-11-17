import { useCallback, useEffect, useRef, useState } from "react";
import "./MainView.css";
import heroImage from "../../assets/hero-sabitech.jpg";
import comunidadImage from "../../assets/comunidad-sabitech.jpg";
import { list } from "../../api/charlasApi";
import { crearReserva } from "../../api/reservasApi";
import { CharlaDetalleView } from "../charlas/CharlaDetalleView";
import { PlazaConfirmadaView } from "../charlas/PlazaConfirmadaView";

const VENTAJAS = [
  {
    icono: "charla",
    titulo: "Charlas de expertos",
    texto: "Ideas y casos reales para estar un paso por delante.",
  },
  {
    icono: "usuarios",
    titulo: "Conexiones que importan",
    texto: "Comparte experiencias con profesionales del sector.",
  },
  {
    icono: "certificado",
    titulo: "Certificado de asistencia",
    texto: "Da valor a lo aprendido y haz crecer tu perfil.",
  },
  {
    icono: "ubicacion",
    titulo: "Una experiencia presencial",
    texto: "Vive la tecnología de cerca, dentro y fuera del escenario.",
  },
];

const ESTADISTICAS = [
  { numero: "+500", texto: "Asistentes con ganas de conectar" },
  { numero: "+30", texto: "Ponentes de referencia" },
  { numero: "+20", texto: "Charlas y experiencias" },
  { numero: "5", texto: "Ediciones compartiendo futuro" },
];

const ICONOS = {
  flecha: <path d="M5 12h14M13 6l6 6-6 6" />,
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
  entrada: (
    <>
      <path d="M3 9V6h18v3a3 3 0 000 6v3H3v-3a3 3 0 000-6z" />
      <path d="M15 6v12" />
    </>
  ),
  charla: (
    <>
      <path d="M21 11.5a8.5 8.5 0 01-8.5 8.5H5l-2 2V11.5A8.5 8.5 0 0111.5 3h1A8.5 8.5 0 0121 11.5z" />
      <path d="M8 9h8M8 13h5" />
    </>
  ),
  usuarios: (
    <>
      <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
    </>
  ),
  certificado: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12.5l3 3 5-6" />
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
  externo: (
    <path d="M14 3h7v7M21 3l-9 9M19 14v5a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h5" />
  ),
  alerta: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v6M12 16.5v.5" />
    </>
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5M12 7.5v.5" />
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

function claveDia(valor) {
  const fecha = aFecha(valor);
  return `${fecha.getFullYear()}-${fecha.getMonth()}-${fecha.getDate()}`;
}

export function MainView({ onIrACharlas, onDetalleChange }) {
  const [charlas, setCharlas] = useState([]);
  const [diaActivo, setDiaActivo] = useState("");
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [aviso, setAviso] = useState(null);
  const [reservandoId, setReservandoId] = useState(null);
  const [pagina, setPagina] = useState("lista");
  const [charlaSeleccionada, setCharlaSeleccionada] = useState(null);
  const [errorDetalle, setErrorDetalle] = useState("");
  const contenedorRef = useRef(null);

  useEffect(() => {
    onDetalleChange?.(pagina !== "lista");
  }, [pagina, onDetalleChange]);

  const cargarCharlas = useCallback(async () => {
    try {
      const datos = await list();
      setCharlas(datos);
      setError("");
      return datos;
    } catch (errorCarga) {
      setError(errorCarga.message || "No se han podido cargar las charlas.");
      return null;
    } finally {
      setCargando(false);
    }
  }, []);

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
            errorCarga.message || "No se han podido cargar las charlas.",
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
  const proximas = charlas
    .filter((charla) => !charla.cancelada && aFecha(charla.inicio) > ahora)
    .sort((a, b) => aFecha(a.inicio) - aFecha(b.inicio));

  const dias = [];
  proximas.forEach((charla) => {
    const clave = claveDia(charla.inicio);
    if (!dias.some((dia) => dia.clave === clave)) {
      dias.push({ clave, etiqueta: formatearDia(charla.inicio) });
    }
  });

  const diasVisibles = dias.slice(0, 2);
  const diaSeleccionado = diasVisibles.some((dia) => dia.clave === diaActivo)
    ? diaActivo
    : (diasVisibles[0]?.clave ?? "");
  const destacadas = proximas
    .filter((charla) => claveDia(charla.inicio) === diaSeleccionado)
    .slice(0, 3);

  useEffect(() => {
    const contenedor = contenedorRef.current;
    if (!contenedor) {
      return undefined;
    }

    const elementos = contenedor.querySelectorAll(".reveal:not(.visible)");
    const observador = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((entrada) => {
          if (entrada.isIntersecting) {
            entrada.target.classList.add("visible");
            observador.unobserve(entrada.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    elementos.forEach((elemento) => observador.observe(elemento));
    return () => observador.disconnect();
  }, [charlas, cargando, diaSeleccionado, pagina]);

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
    <div className="home" ref={contenedorRef}>
      <header className="home-hero">
        <div className="home-hero-contenido">
          <span className="home-badge">
            Jornadas tecnológicas · Edición 2026
          </span>
          <h1 className="home-hero-titulo">
            <span className="home-hero-marca">SABITECH 2026</span>
            <span className="home-hero-lema">Conecta con el futuro.</span>
          </h1>
          <p className="home-hero-descripcion">
            Dos días de ideas, tecnología y conexiones reales. Aprende de
            quienes están construyendo lo que viene.
          </p>
          <div className="home-hero-meta">
            <span>
              <Icono nombre="calendario" />
              18 y 19 de junio de 2026
            </span>
            <span>
              <Icono nombre="ubicacion" />
              Madrid · Presencial
            </span>
          </div>
          <div className="home-hero-acciones">
            <a className="home-boton home-boton--principal" href="#charlas">
              Ver charlas
              <Icono nombre="flecha" />
            </a>
            <a className="home-boton home-boton--contorno" href="#comunidad">
              Conocer a los ponentes
            </a>
          </div>
          <p className="home-hero-nota">
            <Icono nombre="entrada" />
            Entrada gratuita con reserva previa · Plazas limitadas
          </p>
        </div>
        <div className="home-hero-foto">
          <img
            src={heroImage}
            alt="Escenario de SABITECH con el público asistente"
          />
          <span className="home-hero-pie">Así vivimos SABITECH 2025</span>
        </div>
      </header>

      <section className="home-ventajas" aria-label="Qué ofrece SABITECH">
        {VENTAJAS.map((ventaja, indice) => (
          <article
            className="home-ventaja reveal"
            key={ventaja.titulo}
            style={{ transitionDelay: `${indice * 80}ms` }}
          >
            <span className="home-ventaja-icono">
              <Icono nombre={ventaja.icono} />
            </span>
            <h2>{ventaja.titulo}</h2>
            <p>{ventaja.texto}</p>
          </article>
        ))}
      </section>

      <section className="home-charlas" id="charlas">
        <div className="home-seccion">
          <div className="home-seccion-cabecera reveal">
            <div>
              <p className="home-eyebrow">Ideas que nos mueven</p>
              <h2>No te pierdas las próximas charlas</h2>
            </div>
            <a
              className="home-enlace-flecha"
              href="#agenda"
              onClick={(evento) => {
                evento.preventDefault();
                onIrACharlas();
              }}
            >
              Ver toda la agenda
              <Icono nombre="flecha" />
            </a>
          </div>

          {cargando && (
            <div className="home-estado">
              <span className="home-spinner" aria-hidden="true" />
              <p>Cargando próximas charlas...</p>
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
                  setError("");
                  cargarCharlas();
                }}
              >
                Reintentar
                <Icono nombre="flecha" />
              </button>
            </div>
          )}

          {!cargando && !error && diasVisibles.length === 0 && (
            <div className="home-estado">
              <Icono nombre="calendario" />
              <p>
                No hay próximas charlas disponibles. Vuelve a consultar dentro
                de unos días.
              </p>
            </div>
          )}

          {!cargando && !error && diasVisibles.length > 0 && (
            <>
              <div className="home-charlas-controles reveal">
                <div
                  className="home-dias"
                  role="tablist"
                  aria-label="Días de las charlas"
                >
                  {diasVisibles.map((dia) => (
                    <button
                      className={`home-dia ${diaSeleccionado === dia.clave ? "activo" : ""}`}
                      type="button"
                      role="tab"
                      aria-selected={diaSeleccionado === dia.clave}
                      key={dia.clave}
                      onClick={() => setDiaActivo(dia.clave)}
                    >
                      {dia.etiqueta}
                    </button>
                  ))}
                </div>
                <p className="home-charlas-nota">
                  {destacadas.length}{" "}
                  {destacadas.length === 1
                    ? "charla destacada"
                    : "charlas destacadas"}{" "}
                  · Todas las horas en CEST
                </p>
              </div>

              {aviso && (
                <p
                  className={`home-aviso home-aviso--${aviso.tipo}`}
                  role="status"
                >
                  <Icono
                    nombre={
                      aviso.tipo === "error"
                        ? "alerta"
                        : aviso.tipo === "info"
                          ? "info"
                          : "certificado"
                    }
                  />
                  {aviso.texto}
                </p>
              )}

              <div className="home-tarjetas">
                {destacadas.map((charla, indice) => {
                  const fecha = diaMes(charla.inicio);
                  return (
                    <article
                      className="home-tarjeta reveal"
                      key={charla.id}
                      style={{ transitionDelay: `${indice * 90}ms` }}
                    >
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
                        {charla.completa && (
                          <span className="home-tarjeta-agotada">
                            Plazas agotadas
                          </span>
                        )}
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
                            {charla.ubicacion_nombre || charla.municipio}
                          </span>
                        </div>

                        <div className="home-tarjeta-pie">
                          <button
                            className="home-tarjeta-detalle"
                            type="button"
                            onClick={() => abrirDetalle(charla)}
                          >
                            Ver detalles
                            <Icono nombre="externo" />
                          </button>
                          <button
                            className="home-boton home-boton--principal home-boton-reserva"
                            type="button"
                            disabled={
                              charla.completa || reservandoId === charla.id
                            }
                            onClick={() => reservar(charla)}
                          >
                            {reservandoId === charla.id ? (
                              "Reservando..."
                            ) : charla.completa ? (
                              "Sin plazas"
                            ) : (
                              <>
                                Reservar plaza
                                <Icono nombre="entrada" />
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </section>

      <section className="home-comunidad" id="comunidad">
        <div className="home-comunidad-imagen reveal">
          <img
            src={comunidadImage}
            alt="Asistentes conversando en SABITECH"
            loading="lazy"
          />
          <span className="home-comunidad-pie">
            Las mejores ideas empiezan con una conversación.
          </span>
        </div>
        <div className="home-comunidad-texto reveal">
          <p className="home-eyebrow">Tecnología con personas</p>
          <h2>
            Más que un evento,
            <br />
            una comunidad.
          </h2>
          <p>
            En SABITECH reunimos a quienes sienten curiosidad por lo que viene.
            Profesionales, estudiantes y empresas que comparten conocimiento y
            hacen que la tecnología avance.
          </p>
          <p>Ven por las charlas. Quédate por las conexiones.</p>
          <a className="home-boton home-boton--contorno" href="#charlas">
            Conoce SABITECH
            <Icono nombre="externo" />
          </a>
        </div>
      </section>

      <section className="home-stats" aria-label="Cifras de SABITECH">
        {ESTADISTICAS.map((estadistica) => (
          <div className="home-stat reveal" key={estadistica.numero}>
            <strong>{estadistica.numero}</strong>
            <span>{estadistica.texto}</span>
          </div>
        ))}
      </section>
    </div>
  );
}
