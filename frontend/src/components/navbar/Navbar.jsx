import { useState } from "react";
import "./Navbar.css";
import logo from "../../assets/icons/banner.ico";

function Navbar() {
  const [menuAbierto, setMenuAbierto] = useState(false);

  const cerrarMenu = () => {
    setMenuAbierto(false);
  };

  return (
    <header className="navbar">
      {/* LOGOTIPO */}
      <a href="#inicio" className="navbar-logo" onClick={cerrarMenu}>
        <span className="logo-container">
          <img src={logo} alt="Logotipo SABITECH" className="logo-img" />
        </span>

        <span className="logo-text">SABITECH</span>
      </a>

      {/* BOTÓN MENÚ MÓVIL */}
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

      {/* NAVEGACIÓN */}
      <nav className={`navbar-links ${menuAbierto ? "open" : ""}`}>
        <a href="#inicio" className="active" onClick={cerrarMenu}>
          Inicio
        </a>

        <a href="#charlas" onClick={cerrarMenu}>
          Charlas
        </a>

        <a href="#ponentes" onClick={cerrarMenu}>
          Ponentes
        </a>

        <a href="#comunidad" onClick={cerrarMenu}>
          La comunidad
        </a>
      </nav>

      {/* MIS RESERVAS */}
      <a href="#reservas" className="navbar-reservas" onClick={cerrarMenu}>
        Mis reservas
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3a2 2 0 0 0 0 4v3a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-3a2 2 0 0 0 0-4V7Z" />
          <path d="M13 5v2" />
          <path d="M13 11v2" />
          <path d="M13 17v2" />
        </svg>
      </a>
    </header>
  );
}

export default Navbar;
