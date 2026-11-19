import { useEffect, useRef } from "react";
import "./ModalConfirmacion.css";

export function ModalConfirmacion({
  titulo,
  mensaje,
  textoConfirmar,
  textoCancelar = "Volver",
  cargando = false,
  error = "",
  onConfirmar,
  onCancelar,
}) {
  const botonVolverRef = useRef(null);

  useEffect(() => {
    botonVolverRef.current?.focus();
  }, []);

  useEffect(() => {
    function alPulsarTecla(evento) {
      if (evento.key === "Escape" && !cargando) {
        onCancelar();
      }
    }

    document.addEventListener("keydown", alPulsarTecla);
    return () => document.removeEventListener("keydown", alPulsarTecla);
  }, [cargando, onCancelar]);

  function alPulsarFondo(evento) {
    if (evento.target === evento.currentTarget && !cargando) {
      onCancelar();
    }
  }

  return (
    <div className="modal-fondo" onClick={alPulsarFondo}>
      <div
        className="modal-caja"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="modal-titulo"
        aria-describedby="modal-mensaje"
      >
        <h2 id="modal-titulo" className="modal-titulo">
          {titulo}
        </h2>
        <p id="modal-mensaje" className="modal-mensaje">
          {mensaje}
        </p>

        {error && (
          <p className="modal-error" role="alert">
            {error}
          </p>
        )}

        <div className="modal-acciones">
          <button
            ref={botonVolverRef}
            type="button"
            className="modal-boton modal-boton--secundario"
            disabled={cargando}
            onClick={onCancelar}
          >
            {textoCancelar}
          </button>
          <button
            type="button"
            className="modal-boton modal-boton--peligro"
            disabled={cargando}
            onClick={onConfirmar}
          >
            {cargando ? "Cancelando..." : textoConfirmar}
          </button>
        </div>
      </div>
    </div>
  );
}
