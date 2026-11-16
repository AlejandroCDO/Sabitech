import { useState } from "react";
import "./AuthView.css";
import { register } from "../api/authApi";
import { AuthLayout } from "../components/AuthLayout";
import { FormField } from "../components/FormField";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const FORMULARIO_INICIAL = {
  nombre: "",
  email: "",
  telefono: "",
  fecha_nacimiento: "",
  password: "",
  confirmar_password: "",
};

function validar(datos) {
  const errores = {};
  if (!datos.nombre.trim()) {
    errores.nombre = "Introduce tu nombre.";
  }
  if (!EMAIL_REGEX.test(datos.email)) {
    errores.email = "Introduce un correo electrónico válido.";
  }
  if (!datos.telefono.trim()) {
    errores.telefono = "Introduce tu teléfono.";
  }
  if (!datos.fecha_nacimiento) {
    errores.fecha_nacimiento = "Introduce tu fecha de nacimiento.";
  }
  if (datos.password.length < 8) {
    errores.password = "La contraseña debe tener al menos 8 caracteres.";
  }
  if (datos.confirmar_password !== datos.password) {
    errores.confirmar_password = "Las contraseñas no coinciden.";
  }

  return errores;
}

export function RegisterView({ onRegistrado, onIrALogin, onIrAInicio }) {
  const [datos, setDatos] = useState(FORMULARIO_INICIAL);
  const [errores, setErrores] = useState({});
  const [errorGeneral, setErrorGeneral] = useState("");
  const [cargando, setCargando] = useState(false);

  function actualizarCampo(event) {
    setDatos({ ...datos, [event.target.name]: event.target.value });
  }

  async function crearCuenta(event) {
    event.preventDefault();
    setErrorGeneral("");
    const erroresCliente = validar(datos);
    setErrores(erroresCliente);
    if (Object.keys(erroresCliente).length > 0) {
      return;
    }

    setCargando(true);
    try {
      const respuesta = await register({
        nombre: datos.nombre.trim(),
        email: datos.email,
        telefono: datos.telefono.trim(),
        fecha_nacimiento: datos.fecha_nacimiento,
        password: datos.password,
      });
      onRegistrado(respuesta.mensaje);
    } catch (error) {
      setErrores(error.erroresPorCampo ?? {});
      setErrorGeneral(error.erroresPorCampo ? "" : error.message || "No se ha podido crear la cuenta.");
    } finally {
      setCargando(false);
    }
  }

  return (
    <AuthLayout onIrAInicio={onIrAInicio}>
      <p className="auth-eyebrow">TU ESPACIO SABITECH</p>
      <h1 className="auth-titulo">Crea tu cuenta</h1>
      <p className="auth-subtitulo">Regístrate para reservar tus charlas y preparar tu próxima experiencia SABITECH.</p>

      {errorGeneral && <p className="auth-aviso error" role="alert">{errorGeneral}</p>}

      <form className="auth-form" onSubmit={crearCuenta} noValidate>
        <FormField
          id="nombre"
          label="Nombre"
          placeholder="Tu nombre"
          autoComplete="name"
          value={datos.nombre}
          onChange={actualizarCampo}
          error={errores.nombre}
        />
        <FormField
          id="email"
          label="Correo electrónico"
          type="email"
          placeholder="tu@correo.com"
          autoComplete="email"
          value={datos.email}
          onChange={actualizarCampo}
          error={errores.email}
        />
        <div className="auth-fila">
          <FormField
            id="telefono"
            label="Teléfono"
            type="tel"
            placeholder="600 000 000"
            autoComplete="tel"
            maxLength={15}
            value={datos.telefono}
            onChange={actualizarCampo}
            error={errores.telefono}
          />
          <FormField
            id="fecha_nacimiento"
            label="Fecha de nacimiento"
            type="date"
            autoComplete="bday"
            value={datos.fecha_nacimiento}
            onChange={actualizarCampo}
            error={errores.fecha_nacimiento}
          />
        </div>
        <FormField
          id="password"
          label="Contraseña"
          type="password"
          placeholder="Mínimo 8 caracteres"
          autoComplete="new-password"
          value={datos.password}
          onChange={actualizarCampo}
          error={errores.password}
        />
        <FormField
          id="confirmar_password"
          label="Confirmar contraseña"
          type="password"
          placeholder="Repite tu contraseña"
          autoComplete="new-password"
          value={datos.confirmar_password}
          onChange={actualizarCampo}
          error={errores.confirmar_password}
        />

        <button className="auth-boton" type="submit" disabled={cargando}>
          {cargando ? "Creando cuenta..." : "Crear cuenta"}
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </button>
      </form>

      <p className="auth-cambio">
        ¿Ya tienes cuenta?{" "}
        <button type="button" className="auth-cambio-boton" onClick={onIrALogin}>
          Inicia sesión
        </button>
      </p>
    </AuthLayout>
  );
}
