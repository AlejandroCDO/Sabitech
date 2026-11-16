import logo from "../assets/logo-sabitech.png";
import { CharlaDestacada } from "./CharlaDestacada";

export function AuthLayout({ children }) {
  return (
    <div className="auth">
      <header className="auth-header">
        <a className="auth-marca" href="/">
          <img className="auth-logo" src={logo} alt="Logo de SABITECH" />
          <span className="auth-marca-nombre">SABITECH</span>
          <span className="auth-marca-web">WEB</span>
        </a>
        <a className="auth-volver" href="/">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M19 12H5M11 6l-6 6 6 6" />
          </svg>
          Volver al inicio
        </a>
      </header>

      <main className="auth-main">
        <CharlaDestacada />

        <section className="auth-panel">{children}</section>
      </main>

      <footer className="auth-footer">
        <span>© 2026 SABITECH WEB. Todos los derechos reservados.</span>
        <nav className="auth-footer-enlaces">
          <a href="#">Privacidad</a>
          <a href="#">¿Necesitas ayuda?</a>
        </nav>
      </footer>
    </div>
  );
}
