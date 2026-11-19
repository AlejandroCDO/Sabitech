import "./Footer.css";
import logo from "../../assets/icons/banner.ico";

export function Footer({ onIrACharlas, onIrAReservas }) {
    // Cambia de vista sin saltar por la página y vuelve arriba del todo
    const ir = (evento, accion) => {
        evento.preventDefault();
        accion?.();
        window.scrollTo(0, 0);
    };

    return (
        <footer className="footer">

            <div className="footer-content">

                {/* LOGOTIPO Y DESCRIPCIÓN */}
                <div className="footer-brand">

                    <a href="#inicio" className="footer-logo">

                        <span className="footer-logo-container">
                            <img src={logo} alt="Logotipo SABITECH" />
                        </span>

                        <span className="footer-logo-text">
                            SABITECH
                        </span>

                        <small>WEB</small>

                    </a>

                    <p>
                        El punto de encuentro entre la tecnología,
                        el conocimiento y las personas.
                    </p>

                </div>

                {/* COLUMNA EXPLORA */}
                <div className="footer-column">

                    <h3>Explora</h3>

                    <a href="#charlas" onClick={(e) => ir(e, onIrACharlas)}>
                        Agenda de charlas
                    </a>
                    <a href="#ponentes">Nuestros ponentes</a>
                    <a href="#comunidad">La comunidad</a>

                </div>

                {/* COLUMNA ASISTENCIA */}
                <div className="footer-column">

                    <h3>Tu asistencia</h3>

                    <a href="#reservas" onClick={(e) => ir(e, onIrAReservas)}>
                        Mis reservas
                    </a>
                    <a href="#como-llegar">Cómo llegar</a>
                    <a href="#preguntas">Preguntas frecuentes</a>

                </div>

                {/* COLUMNA CONTACTO */}
                <div className="footer-column">

                    <h3>Hablemos</h3>

                    <a href="mailto:soporte@sabitech.es">
                        soporte@sabitech.es
                    </a>

                    <span>Jornadas de tecnología</span>

                </div>

            </div>

            {/* PARTE INFERIOR */}
            <div className="footer-bottom">

                <p>
                    © {new Date().getFullYear()} SABITECH WEB.
                    Todos los derechos reservados.
                </p>

                <div className="footer-legal">

                    <a href="#aviso-legal">Aviso legal</a>
                    <a href="#privacidad">Privacidad</a>
                    <a href="#cookies">Cookies</a>
                    <a href="#accesibilidad">Accesibilidad</a>

                </div>

            </div>

        </footer>
    );
}