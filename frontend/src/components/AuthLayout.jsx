import logo from "../assets/logo-sabitech.png";

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
        <section className="auth-hero">
          <span className="auth-hero-badge">SABITECH 2026</span>
          <h2 className="auth-hero-titulo">
            Conecta con
            <br />
            el futuro.
          </h2>
          <p className="auth-hero-texto">Tus próximas ideas, conexiones y experiencias empiezan aquí.</p>
          <p className="auth-hero-fecha">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <rect x="3" y="5" width="18" height="16" rx="2" />
              <path d="M3 10h18M8 3v4M16 3v4" />
            </svg>
            18 y 19 de junio de 2026 · Madrid
          </p>
        </section>

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
