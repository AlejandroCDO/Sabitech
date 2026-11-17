
import { useCallback, useEffect, useState } from "react";
import "./App.css";

import { MainView } from "./views/home/MainView";
import { CharlasView } from "./views/charlas/CharlasView";
import { LoginView } from "./views/auth/LoginView";
import { RegisterView } from "./views/auth/RegisterView";
import { MisReservasView } from "./views/reservas/MisReservasView";
import { ReservaDetalleView } from "./views/reservas/ReservaDetalleView";
import { PerfilView } from "./views/perfil/PerfilView";

import { getUser } from "./api/usersApi";
import { logout } from "./api/authApi";
import { cerrarSesion } from "./utils/sesion";

import Navbar from "./components/navbar/Navbar";
import { Footer } from "./components/footer/Footer";

function App() {
  const [logeado, setLogeado] = useState(false);
  const [usuario, setUsuario] = useState(null);
  const [vista, setVista] = useState("inicio");
  const [mensajeRegistro, setMensajeRegistro] = useState("");
  const [charlaIdDetalle, setCharlaIdDetalle] = useState(null);
  const [detalleAbierto, setDetalleAbierto] = useState(false);
  const [claveVista, setClaveVista] = useState(0);

  useEffect(() => {
    comprobarSesionIniciada();
  }, []);

  useEffect(() => {
    let hash = vista;

    if (vista === "detalleReserva") {
      hash = "detalle-reserva";
    } else if (vista === "perfil") {
      hash = "perfil";
    } else if (
      (vista === "inicio" || vista === "charlas") &&
      detalleAbierto
    ) {
      hash = "detalle-charla";
    }

    window.history.replaceState(null, "", `#${hash}`);
  }, [vista, detalleAbierto]);

  async function comprobarSesionIniciada() {
    const token =
      localStorage.getItem("token") ?? sessionStorage.getItem("token");

    if (token) {
      try {
        const user = await getUser(token);

        setUsuario(user);
        setLogeado(true);
        setVista("inicio");
      } catch (error) {
        console.log(error);

        cerrarSesion();
        setUsuario(null);
        setLogeado(false);
        setVista("inicio");
      }
    } else {
      setUsuario(null);
      setLogeado(false);
      setVista("inicio");
    }
  }

  function irARegistro() {
    setMensajeRegistro("");
    setVista("registro");
  }

  function terminarRegistro(mensaje) {
    setMensajeRegistro(`${mensaje}. Ya puedes iniciar sesión.`);
    setVista("login");
  }

  function irAInicio() {
    setClaveVista((clave) => clave + 1);
    setVista("inicio");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function irACharlas() {
    setClaveVista((clave) => clave + 1);
    setVista("charlas");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function irAReservas() {
    setVista(logeado ? "reservas" : "login");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function irAPerfil() {
    setVista(logeado ? "perfil" : "login");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function irADetalleReserva(charlaId) {
    setCharlaIdDetalle(charlaId);
    setVista("detalleReserva");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function volverAReservas() {
    setVista("reservas");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function gestionarCierreSesion() {
    try {
      await logout();
    } catch (error) {
      console.error("No se pudo cerrar la sesión en el servidor:", error);
    } finally {
      cerrarSesion();
      setUsuario(null);
      setLogeado(false);
      setVista("inicio");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  const cerrarSesionCaducada = useCallback(() => {
    cerrarSesion();
    setUsuario(null);
    setLogeado(false);
    setVista("login");
  }, []);

  return (
    <>
      {(vista === "inicio" ||
        vista === "charlas" ||
        vista === "reservas" ||
        vista === "detalleReserva" ||
        vista === "perfil") && (
        <>
          <Navbar
            logeado={logeado}
            usuario={usuario}
            vistaActiva={
              vista === "detalleReserva" ? "reservas" : vista
            }
            onIrAInicio={irAInicio}
            onIrACharlas={irACharlas}
            onIrALogin={() => setVista("login")}
            onIrARegistro={irARegistro}
            onIrAReservas={irAReservas}
            onIrAPerfil={irAPerfil}
          />

          {vista === "inicio" && (
            <MainView
              key={claveVista}
              logeado={logeado}
              onIrACharlas={irACharlas}
              onDetalleChange={setDetalleAbierto}
            />
          )}

          {vista === "charlas" && (
            <CharlasView
              key={claveVista}
              logeado={logeado}
              onDetalleChange={setDetalleAbierto}
            />
          )}

          {vista === "reservas" && (
            <MisReservasView
              onIrAInicio={irAInicio}
              onIrACharlas={irACharlas}
              onVerDetalle={irADetalleReserva}
              onSesionCaducada={cerrarSesionCaducada}
            />
          )}

          {vista === "detalleReserva" && (
            <ReservaDetalleView
              charlaId={charlaIdDetalle}
              onVolver={volverAReservas}
            />
          )}

          {vista === "perfil" && (
            <PerfilView
              usuario={usuario}
              onVolver={irAInicio}
              onCerrarSesion={gestionarCierreSesion}
            />
          )}

          <Footer />
        </>
      )}

      {vista === "login" && (
        <LoginView
          onLogin={comprobarSesionIniciada}
          onIrARegistro={irARegistro}
          onIrAInicio={irAInicio}
          mensajeExito={mensajeRegistro}
        />
      )}

      {vista === "registro" && (
        <RegisterView
          onRegistrado={terminarRegistro}
          onIrALogin={() => setVista("login")}
          onIrAInicio={irAInicio}
        />
      )}
    </>
  );
}

export default App;
