
import "./PerfilView.css";
import defaultAvatar from "../../assets/images/default.png";

export function PerfilView({ usuario, onVolver, onCerrarSesion }) {
  const fechaNacimiento = usuario?.fecha_nacimiento
    ? new Date(`${usuario.fecha_nacimiento}T00:00:00`).toLocaleDateString("es-ES")
    : "No especificada";

  return (
    <main className="perfil">
      <section className="perfil-contenedor">
        <button
          type="button"
          className="perfil-volver"
          onClick={onVolver}
        >
          ← Volver al inicio
        </button>

        <div className="perfil-cabecera">
          <div className="perfil-avatar">
            <img
              src={usuario?.foto_perfil_url || defaultAvatar}
              alt="Foto de perfil"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = defaultAvatar;
              }}
            />
          </div>

          <div className="perfil-presentacion">
            <span className="perfil-etiqueta">MI CUENTA</span>
            <h1>Mi perfil</h1>
            <p>Consulta tu información personal y gestiona tu cuenta.</p>
          </div>
        </div>

        <section className="perfil-tarjeta">
          <div className="perfil-tarjeta-cabecera">
            <div>
              <h2>Datos personales</h2>
              <p>Información asociada a tu cuenta SABITECH.</p>
            </div>

            <button
              type="button"
              className="perfil-editar"
              disabled
              title="Esta funcionalidad estará disponible próximamente"
            >
              Editar perfil
            </button>
          </div>

          <div className="perfil-datos">
            <div className="perfil-campo">
              <span>Nombre completo</span>
              <p>{usuario?.nombre || "No disponible"}</p>
            </div>

            <div className="perfil-campo">
              <span>Correo electrónico</span>
              <p>{usuario?.email || "No disponible"}</p>
            </div>

            <div className="perfil-campo">
              <span>Teléfono</span>
              <p>{usuario?.telefono || "No especificado"}</p>
            </div>

            <div className="perfil-campo">
              <span>Fecha de nacimiento</span>
              <p>{fechaNacimiento}</p>
            </div>

            <div className="perfil-campo">
              <span>Tipo de cuenta</span>
              <p>{usuario?.rol || "Usuario"}</p>
            </div>
          </div>
        </section>

        <section className="perfil-sesion">
          <div>
            <h2>Sesión</h2>
            <p>Cuando cierres sesión tendrás que volver a identificarte para acceder a tu cuenta.</p>
          </div>

          <button
            type="button"
            className="perfil-cerrar-sesion"
            onClick={onCerrarSesion}
          >
            Cerrar sesión
          </button>
        </section>
      </section>
    </main>
  );
}
