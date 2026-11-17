import { useState } from "react";

export function FormField({ id, label, type = "text", error, exito, ...props }) {
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const esPassword = type === "password";
  const estado = error ? "error" : exito ? "exito" : "";

  return (
    <div className={`campo ${estado}`}>
      <label htmlFor={id}>{label}</label>
      <div className="campo-control">
        <input
          id={id}
          name={id}
          type={esPassword && mostrarPassword ? "text" : type}
          aria-invalid={Boolean(error)}
          aria-describedby={error || exito ? `${id}-mensaje` : undefined}
          {...props}
        />
        {esPassword && (
          <button
            type="button"
            className="campo-icono campo-ojo"
            onClick={() => setMostrarPassword(!mostrarPassword)}
            aria-label={mostrarPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
              <circle cx="12" cy="12" r="3" />
              {mostrarPassword && <path d="M4 4l16 16" />}
            </svg>
          </button>
        )}
        {!esPassword && error && (
          <svg className="campo-icono" viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7v6M12 16.5v.5" />
          </svg>
        )}
        {!esPassword && !error && exito && (
          <svg className="campo-icono" viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="9" />
            <path d="M8 12.5l3 3 5-6" />
          </svg>
        )}
      </div>
      {(error || exito) && (
        <p id={`${id}-mensaje`} className="campo-mensaje">
          {error || exito}
        </p>
      )}
    </div>
  );
}
