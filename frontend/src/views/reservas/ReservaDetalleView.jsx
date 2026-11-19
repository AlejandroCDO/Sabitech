import { useEffect, useState } from "react";
import "./MisReservasView.css";
import { list } from "../../api/charlasApi";
import { CharlaDetalleView } from "../charlas/CharlaDetalleView";

export function ReservaDetalleView({ charlaId, onVolver }) {
  const [charla, setCharla] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [intento, setIntento] = useState(0);

  useEffect(() => {
    let activo = true;

    list()
      .then((charlas) => {
        if (!activo) {
          return;
        }
        const encontrada = charlas.find((item) => item.id === charlaId);
        setCharla(encontrada ?? null);
        setError(encontrada ? "" : "No se ha encontrado la charla.");
      })
      .catch((errorCarga) => {
        if (activo) {
          setError(errorCarga.message || "No se ha podido cargar la charla.");
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
  }, [charlaId, intento]);

  function reintentar() {
    setError("");
    setCargando(true);
    setIntento((valor) => valor + 1);
  }

  if (charla) {
    return (
      <CharlaDetalleView
        charla={charla}
        reservada
        etiquetaVolver="Mis reservas"
        onVolver={onVolver}
      />
    );
  }

  return (
    <div className="reservas-pagina">
      <div className="reservas-contenedor">
        {cargando && (
          <p className="reservas-estado" role="status">
            Cargando la charla...
          </p>
        )}

        {!cargando && error && (
          <div className="reservas-estado reservas-estado--error" role="alert">
            <p>{error}</p>
            <button type="button" className="reservas-boton-secundario" onClick={reintentar}>
              Reintentar
            </button>
            <button type="button" className="reservas-boton-secundario" onClick={onVolver}>
              Volver a mis reservas
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
