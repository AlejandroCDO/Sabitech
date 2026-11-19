import { useEffect, useState } from "react";
import "./MisReservasView.css";
import { cancelarReserva, listarMisReservas } from "../../api/reservasApi";
import { ModalConfirmacion } from "../../components/reservas/ModalConfirmacion";

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
  cancelada: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M9 9l6 6M15 9l-6 6" />
    </>
  ),
  entrada: (
    <>
      <path d="M3 9V6h18v3a3 3 0 000 6v3H3v-3a3 3 0 000-6z" />
      <path d="M15 6v12" />
    </>
  ),
};

const ESTADOS = {
  confirmada: { texto: "Confirmada", clase: "reserva-badge--confirmada" },
  pendiente: { texto: "Pendiente", clase: "reserva-badge--pendiente" },
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

function formatearFechaHorario(inicio, fin) {
  const fecha = aFecha(inicio).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const horario = fin ? `${formatearHora(inicio)}–${formatearHora(fin)}` : formatearHora(inicio);
  return `${fecha} · ${horario}`;
}

function formatearUbicacion(reserva) {
  const ubicacion = [reserva.ubicacion_nombre, reserva.municipio].filter(Boolean).join(" · ");
  return ubicacion || "Sede SABITECH";
}

function charlaCancelada(reserva) {
  return Boolean(reserva.cancelada);
}

function plural(numero, singular, varios) {
  return `${numero} ${numero === 1 ? singular : varios}`;
}

function textoResumen(reservas) {
  const activas = reservas.filter((reserva) => !charlaCancelada(reserva));
  const confirmadas = activas.filter((reserva) => reserva.estado === "confirmada").length;
  const pendientes = activas.length - confirmadas;

  const partes = [plural(confirmadas, "reserva confirmada", "reservas confirmadas")];
  if (pendientes > 0) {
    partes.push(plural(pendientes, "pendiente", "pendientes"));
  }
  return partes.join(" · ");
}

function TarjetaReserva({ reserva, onVerDetalle, onCancelar }) {
  const [imagenFallida, setImagenFallida] = useState(false);
  const cancelada = charlaCancelada(reserva);
  const puedeCancelar = !cancelada && aFecha(reserva.inicio) > new Date();
  const estado = ESTADOS[reserva.estado] ?? ESTADOS.pendiente;

  function alPulsarTecla(evento) {
    if (evento.target !== evento.currentTarget) {
      return;
    }
    if (evento.key === "Enter" || evento.key === " ") {
      evento.preventDefault();
      onVerDetalle(reserva.charla_id);
    }
  }

  return (
    <article
      className={`reserva-tarjeta ${cancelada ? "reserva-tarjeta--cancelada" : ""}`}
      role="button"
      tabIndex={0}
      aria-label={`Ver detalle de ${reserva.titulo}`}
      onClick={() => onVerDetalle(reserva.charla_id)}
      onKeyDown={alPulsarTecla}
    >
      <div className="reserva-imagen">
        {reserva.foto_url && !imagenFallida ? (
          <img src={reserva.foto_url} alt={reserva.titulo} onError={() => setImagenFallida(true)} />
        ) : (
          <span className="reserva-imagen-vacia" aria-hidden="true" />
        )}
      </div>

      <div className="reserva-info">
        <span className={`reserva-badge ${cancelada ? "reserva-badge--cancelada" : estado.clase}`}>
          {cancelada ? "Charla cancelada" : estado.texto}
        </span>
        <h2 className="reserva-titulo">{reserva.titulo}</h2>
        <p className="reserva-ponente">{reserva.ponente_nombre || "Ponente SABITECH"}</p>
        <p className="reserva-dato reserva-dato--fecha">
          <Icono nombre="calendario" />
          {formatearFechaHorario(reserva.inicio, reserva.fin)}
        </p>
        <p className="reserva-dato">
          <Icono nombre="ubicacion" />
          {formatearUbicacion(reserva)}
        </p>
      </div>

      <div
        className="reserva-acciones"
        onClick={(evento) => {
          if (evento.target.closest("button")) {
            evento.stopPropagation();
          }
        }}
      >
        {cancelada ? (
          <div className="reserva-sin-acreditacion">
            <Icono nombre="cancelada" />
            <strong>Charla cancelada</strong>
            <span>Sin acreditación activa</span>
          </div>
        ) : (
          <button className="reserva-boton-qr" type="button" disabled title="Próximamente">
            <Icono nombre="entrada" />
            Ver QR
          </button>
        )}

        {puedeCancelar && (
          <button className="reserva-boton-cancelar" type="button" onClick={() => onCancelar(reserva)}>
            Cancelar reserva
          </button>
        )}
      </div>
    </article>
  );
}

export function MisReservasView({ onIrAInicio, onIrACharlas, onVerDetalle, onSesionCaducada }) {
  const [reservas, setReservas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [reservaACancelar, setReservaACancelar] = useState(null);
  const [cancelando, setCancelando] = useState(false);
  const [errorCancelar, setErrorCancelar] = useState("");
  const [aviso, setAviso] = useState("");

  useEffect(() => {
    if (!aviso) {
      return undefined;
    }

    const temporizador = setTimeout(() => setAviso(""), 6000);
    return () => clearTimeout(temporizador);
  }, [aviso]);

  useEffect(() => {
    let activo = true;

    listarMisReservas()
      .then((datos) => {
        if (activo) {
          setReservas(datos);
        }
      })
      .catch((errorCarga) => {
        if (!activo) {
          return;
        }
        if (errorCarga.isUnauthorized) {
          onSesionCaducada();
          return;
        }
        setError(errorCarga.message || "No se han podido cargar tus reservas.");
      })
      .finally(() => {
        if (activo) {
          setCargando(false);
        }
      });

    return () => {
      activo = false;
    };
  }, [onSesionCaducada]);

  async function recargarReservas() {
    setError("");
    try {
      const datos = await listarMisReservas();
      setReservas(datos);
    } catch (errorCarga) {
      if (errorCarga.isUnauthorized) {
        onSesionCaducada();
        return;
      }
      setError(errorCarga.message || "No se han podido cargar tus reservas.");
    } finally {
      setCargando(false);
    }
  }

  function reintentar() {
    setCargando(true);
    recargarReservas();
  }

  function pedirCancelacion(reserva) {
    setErrorCancelar("");
    setReservaACancelar(reserva);
  }

  function cerrarModal() {
    setReservaACancelar(null);
    setErrorCancelar("");
  }

  async function confirmarCancelacion() {
    setCancelando(true);
    setErrorCancelar("");

    try {
      await cancelarReserva(reservaACancelar.id);
      setReservas((actuales) => actuales.filter((reserva) => reserva.id !== reservaACancelar.id));
      setReservaACancelar(null);
      setAviso("Reserva cancelada. Tu plaza ha quedado libre.");
    } catch (errorCancelacion) {
      if (errorCancelacion.isUnauthorized) {
        onSesionCaducada();
        return;
      }
      setErrorCancelar(errorCancelacion.message || "No se ha podido cancelar la reserva.");
    } finally {
      setCancelando(false);
    }
  }

  return (
    <div className="reservas-pagina">
      <div className="reservas-contenedor">
        <nav className="reservas-migas" aria-label="Migas de pan">
          <button type="button" onClick={onIrAInicio}>
            Inicio
          </button>
          <span aria-hidden="true">/</span>
          <span className="reservas-migas-actual">Mis reservas</span>
        </nav>

        <p className="reservas-antetitulo">Tu espacio SABITECH</p>
        <h1 className="reservas-titulo">Mis reservas</h1>
        <p className="reservas-subtitulo">
          Tu próxima experiencia, en un solo lugar. Consulta tus charlas y accede a tu QR de entrada.
        </p>

        {aviso && (
          <p className="reservas-aviso" role="status">
            {aviso}
          </p>
        )}

        {cargando && (
          <p className="reservas-estado" role="status">
            Cargando tus reservas...
          </p>
        )}

        {!cargando && error && (
          <div className="reservas-estado reservas-estado--error" role="alert">
            <p>{error}</p>
            <button type="button" className="reservas-boton-secundario" onClick={reintentar}>
              Reintentar
            </button>
          </div>
        )}

        {!cargando && !error && reservas.length === 0 && (
          <div className="reservas-vacio">
            <span className="reservas-vacio-icono">
              <Icono nombre="entrada" />
            </span>
            <h2>No tienes reservas</h2>
            <p>Explora el programa y encuentra tu próxima charla. Tu plaza te espera.</p>
            <button type="button" className="reservas-boton-secundario" onClick={onIrACharlas}>
              Explorar charlas
            </button>
          </div>
        )}

        {!cargando && !error && reservas.length > 0 && (
          <>
            <div className="reservas-resumen">
              <p>{textoResumen(reservas)}</p>
              <span>Todas las horas en CEST</span>
            </div>

            <div className="reservas-lista">
              {reservas.map((reserva) => (
                <TarjetaReserva
                  key={reserva.id}
                  reserva={reserva}
                  onVerDetalle={onVerDetalle}
                  onCancelar={pedirCancelacion}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {reservaACancelar && (
        <ModalConfirmacion
          titulo="¿Cancelar la reserva?"
          mensaje={`Vas a cancelar tu plaza en "${reservaACancelar.titulo}". La plaza quedará libre para otras personas.`}
          textoConfirmar="Sí, cancelar reserva"
          textoCancelar="Volver"
          cargando={cancelando}
          error={errorCancelar}
          onConfirmar={confirmarCancelacion}
          onCancelar={cerrarModal}
        />
      )}
    </div>
  );
}
