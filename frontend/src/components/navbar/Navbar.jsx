
import { useEffect, useRef, useState } from "react";
import "./Navbar.css";
import logo from "../../assets/icons/banner.ico";
import defaultAvatar from "../../assets/images/default.png";

function FotoPerfil({ usuario, onIrAPerfil }) {
  const [urlConError, setUrlConError] = useState(null);

  const fotoUrl = usuario?.foto_perfil_url;
  const imagen = fotoUrl && fotoUrl !== urlConError ? fotoUrl : defaultAvatar;

  return (
    <button
      type="button"
      className="navbar-perfil"
      title="Mi perfil"
      aria-label="Ir a mi perfil"
      onClick={onIrAPerfil}
    >
      <img
        src={imagen}
        alt=""
        className={`navbar-avatar ${!fotoUrl || fotoUrl === urlConError ? "navbar-avatar-default" : ""}`}
        onError={(evento) => {
          if (evento.currentTarget.src !== defaultAvatar) {
            setUrlConError(fotoUrl);
          }
        }}
      />
    </button>
  );
}

function Navbar({
  logeado,
  usuario,
  onIrAPerfil,
  onIrAInicio,
  onIrACharlas,
  onIrALogin,
  onIrARegistro,
  onIrAReservas,
  vistaActiva = "inicio",
  modoAuth = false,
}) {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [accesoAbierto, setAccesoAbierto] = useState(false);
  const accesoRef = useRef(null);

  useEffect(() => {
    if (!accesoAbierto) return;

    function cerrarAlClicarFuera(evento) {
      if (accesoRef.current && !accesoRef.current.contains(evento.target)) {
        setAccesoAbierto(false);
      }
    }

    document.addEventListener("click", cerrarAlClicarFuera);
    return () => document.removeEventListener("click", cerrarAlClicarFuera);
  }, [accesoAbierto]);

  function cerrarMenus() {
    setMenuAbierto(false);
    setAccesoAbierto(false);
  }

  function irAInicio(evento) {
    evento.preventDefault();
    cerrarMenus();
    onIrAInicio();
  }

  function irASeccionInicio() {
    cerrarMenus();
    onIrAInicio();
  }

  function irACharlas(evento) {
    evento.preventDefault();
    cerrarMenus();
    onIrACharlas();
  }

  function irALogin() {
    cerrarMenus();
    onIrALogin();
  }

  function irARegistro() {
    cerrarMenus();
    onIrARegistro();
  }

  function irAReservas(evento) {
    evento.preventDefault();
    cerrarMenus();
    onIrAReservas();
  }

  function irAPerfil() {
    cerrarMenus();
    onIrAPerfil();
  }

  return (
    <header className="navbar">
      {/* LOGOTIPO */}
      <a href="#inicio" className="navbar-logo" onClick={irAInicio}>
        <span className="logo-container">
          <img src={logo} alt="Logotipo SABITECH" className="logo-img" />
        </span>

        <span className="logo-text">SABITECH</span>
      </a>

      {/* MENÚ MÓVIL */}
      {!modoAuth && (
        <button
          className="menu-toggle"
          onClick={() => setMenuAbierto(!menuAbierto)}
          aria-label="Abrir menú"
          aria-expanded={menuAbierto}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      )}

      {/* NAVEGACIÓN */}
      {!modoAuth && (
        <nav className={`navbar-links ${menuAbierto ? "open" : ""}`}>
          <a
            href="#inicio"
            className={vistaActiva === "inicio" ? "active" : ""}
            onClick={irAInicio}
          >
            Inicio
          </a>

          <a
            href="#charlas"
            className={vistaActiva === "charlas" ? "active" : ""}
            onClick={irACharlas}
          >
            Charlas
          </a>

          <a href="#ponentes" onClick={irASeccionInicio}>
            Ponentes
          </a>

          <a href="#comunidad" onClick={irASeccionInicio}>
            La comunidad
          </a>
        </nav>
      )}

      {/* BOTÓN DE LA DERECHA */}
      {modoAuth ? (
        <button
          type="button"
          className="navbar-volver"
          onClick={irAInicio}
        >
          <span aria-hidden="true">←</span>
          Volver al inicio
        </button>
      ) : logeado ? (
        <div className="navbar-acciones">
          <a
            href="#reservas"
            className="navbar-reservas"
            onClick={irAReservas}
          >
            Mis reservas
          </a>

          <FotoPerfil
            usuario={usuario}
            onIrAPerfil={irAPerfil}
          />
        </div>
      ) : (
        <div className="navbar-acceso" ref={accesoRef}>
          <button
            className="navbar-reservas"
            type="button"
            onClick={() => setAccesoAbierto(!accesoAbierto)}
            aria-expanded={accesoAbierto}
          >
            Acceder
            <span className="acceso-flecha">
              {accesoAbierto ? "▲" : "▼"}
            </span>
          </button>

          {accesoAbierto && (
            <div className="acceso-dropdown">
              <button type="button" onClick={irALogin}>
                Iniciar sesión
              </button>

              <button type="button" onClick={irARegistro}>
                Registrarse
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}

export default Navbar;
