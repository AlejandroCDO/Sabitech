import { useEffect, useState } from "react";
import { list } from "../../api/charlasApi";

function formatearFecha(fecha) {
  return new Date(fecha.replace(" ", "T")).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function CharlaDestacada() {
  const [charla, setCharla] = useState(null);
  const [imagenRota, setImagenRota] = useState(false);

  useEffect(() => {
    let activo = true;

    async function cargarCharla() {
      try {
        const charlas = await list();
        const disponibles = charlas.filter((c) => !c.cancelada && new Date(c.fin.replace(" ", "T")) > new Date());
        if (activo && disponibles.length > 0) {
          setCharla(disponibles[Math.floor(Math.random() * disponibles.length)]);
        }
      } catch (error) {
        console.log(error);
      }
    }

    cargarCharla();
    return () => {
      activo = false;
    };
  }, []);

  const lugar = charla ? [charla.ubicacion_nombre, charla.municipio].filter(Boolean).join(", ") : "";

  return (
    <section className="auth-hero" aria-label={charla ? `Charla destacada: ${charla.titulo}` : "SABITECH 2026"}>
      {charla?.foto_url && !imagenRota && (
        <img className="auth-hero-imagen" src={charla.foto_url} alt="" onError={() => setImagenRota(true)} />
      )}
      <span className="auth-hero-badge">SABITECH 2026</span>
      <h2 className="auth-hero-titulo">
        {charla ? (
          charla.titulo
        ) : (
          <>
            Conecta con
            <br />
            el futuro.
          </>
        )}
      </h2>
      <p className="auth-hero-texto">
        {charla
          ? charla.ponente_nombre && `Con ${charla.ponente_nombre}`
          : "Tus próximas ideas, conexiones y experiencias empiezan aquí."}
      </p>
      <p className="auth-hero-fecha">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <path d="M3 10h18M8 3v4M16 3v4" />
        </svg>
        {charla
          ? [formatearFecha(charla.inicio), lugar].filter(Boolean).join(" · ")
          : "18 y 19 de junio de 2026 · Madrid"}
      </p>
    </section>
  );
}
