import { useCallback, useEffect, useState } from "react";
import "./App.css";
import { MainView } from "./views/home/MainView";
import { CharlasView } from "./views/charlas/CharlasView";
import { LoginView } from "./views/auth/LoginView";
import { RegisterView } from "./views/auth/RegisterView";
import { MisReservasView } from "./views/reservas/MisReservasView";
import { ReservaDetalleView } from "./views/reservas/ReservaDetalleView";
import { getUsuario } from "./utils/sesion";
import { getUser } from "./api/usersApi";
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
    } else if ((vista === "inicio" || vista === "charlas") && detalleAbierto) {
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
        console.log(user);

        setUsuario(user);
        setLogeado(true);
        setVista("inicio");
      } catch (error) {
        console.log(error);

        localStorage.removeItem("token");
        sessionStorage.removeItem("token");

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
  }

  function irACharlas() {
    setClaveVista((clave) => clave + 1);
    setVista("charlas");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function irAReservas() {
    setVista(logeado ? "reservas" : "login");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function irADetalleReserva(charlaId) {
    setCharlaIdDetalle(charlaId);
    setVista("detalleReserva");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function volverAReservas() {
    setVista("reservas");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  const cerrarSesionCaducada = useCallback(() => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");

    setUsuario(null);
    setLogeado(false);
    setVista("login");
  }, []);

  return (
    <>
      {(vista === "inicio" ||
        vista === "charlas" ||
        vista === "reservas" ||
        vista === "detalleReserva") && (
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
          />

          {vista === "inicio" && (
            <MainView
              key={claveVista}
              onIrACharlas={irACharlas}
              onDetalleChange={setDetalleAbierto}
            />
          )}

          {vista === "charlas" && (
            <CharlasView
              key={claveVista}
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
