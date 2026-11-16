
import { useState } from "react";
import "./Navbar.css";
import logo from "../../assets/icons/banner.ico";

function Navbar({
  logeado,
  onIrAInicio,
  onIrALogin,
  onIrARegistro,
  modoAuth = false,
}) {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [accesoAbierto, setAccesoAbierto] = useState(false);

  function cerrarMenus() {
    setMenuAbierto(false);
    setAccesoAbierto(false);
  }

  function irAInicio() {
    cerrarMenus();
    onIrAInicio();
  }

  function irALogin() {
    cerrarMenus();
    onIrALogin();
  }

  function irARegistro() {
    cerrarMenus();
    onIrARegistro();
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

      {/* MENÚ MÓVIL: SOLO EN LA PÁGINA PRINCIPAL */}
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

      {/* NAVEGACIÓN: SOLO EN LA PÁGINA PRINCIPAL */}
      {!modoAuth && (
        <nav className={`navbar-links ${menuAbierto ? "open" : ""}`}>
          <a href="#inicio" className="active" onClick={irAInicio}>
            Inicio
          </a>

          <a href="#charlas" onClick={irAInicio}>
            Charlas
          </a>

          <a href="#ponentes" onClick={irAInicio}>
            Ponentes
          </a>

          <a href="#comunidad" onClick={irAInicio}>
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
        <a
          href="#reservas"
          className="navbar-reservas"
          onClick={cerrarMenus}
        >
          Mis reservas
        </a>
      ) : (
        <div className="navbar-acceso">
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
