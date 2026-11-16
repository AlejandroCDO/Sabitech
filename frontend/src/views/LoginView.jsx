import { useState } from "react";
import "./AuthView.css";
import { login } from "../api/authApi";
import { AuthLayout } from "../components/AuthLayout";
import { FormField } from "../components/FormField";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function LoginView({ onLogin, onIrARegistro, mensajeExito }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [recordarme, setRecordarme] = useState(false);
  const [emailTocado, setEmailTocado] = useState(false);
  const [errores, setErrores] = useState({});
  const [errorGeneral, setErrorGeneral] = useState("");
  const [cargando, setCargando] = useState(false);

  const emailValido = EMAIL_REGEX.test(email);
  const errorEmail = errores.email ?? (emailTocado && !emailValido ? "Introduce un correo electrónico válido." : "");
  const exitoEmail = emailTocado && emailValido && !errores.email ? "El formato del correo electrónico es correcto." : "";

  async function iniciarSesion(event) {
    event.preventDefault();
    setEmailTocado(true);
    setErrores({});
    setErrorGeneral("");
    if (!emailValido || !password) {
      if (!password) {
        setErrores({ password: "Introduce tu contraseña." });
      }
      return;
    }

    setCargando(true);
    try {
      const respuesta = await login(email, password);
      const almacen = recordarme ? localStorage : sessionStorage;
      almacen.setItem("token", respuesta.token);
      onLogin();
    } catch (error) {
      setErrores(error.erroresPorCampo ?? {});
      setErrorGeneral(error.erroresPorCampo ? "" : error.message || "No se ha podido iniciar sesión.");
    } finally {
      setCargando(false);
    }
  }

  return (
    <AuthLayout>
      <p className="auth-eyebrow">TU ESPACIO SABITECH</p>
      <h1 className="auth-titulo">Bienvenido de nuevo</h1>
      <p className="auth-subtitulo">Accede para gestionar tus reservas y preparar tu próxima experiencia SABITECH.</p>

      {mensajeExito && <p className="auth-aviso exito" role="status">{mensajeExito}</p>}
      {errorGeneral && <p className="auth-aviso error" role="alert">{errorGeneral}</p>}

      <form className="auth-form" onSubmit={iniciarSesion} noValidate>
        <FormField
          id="email"
          label="Correo electrónico"
          type="email"
          placeholder="tu@correo.com"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => setEmailTocado(true)}
          error={errorEmail}
          exito={exitoEmail}
        />
        <FormField
          id="password"
          label="Contraseña"
          type="password"
          placeholder="Introduce tu contraseña"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errores.password}
        />

        <div className="auth-opciones">
          <label className="auth-check">
            <input type="checkbox" checked={recordarme} onChange={(e) => setRecordarme(e.target.checked)} />
            Recordarme
          </label>
          <a className="auth-enlace" href="#">¿Has olvidado tu contraseña?</a>
        </div>

        <button className="auth-boton" type="submit" disabled={cargando}>
          {cargando ? "Iniciando sesión..." : "Iniciar sesión"}
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </button>
      </form>

      <p className="auth-cambio">
        ¿No tienes cuenta?{" "}
        <button type="button" className="auth-cambio-boton" onClick={onIrARegistro}>
          Regístrate
        </button>
      </p>
    </AuthLayout>
  );
}
