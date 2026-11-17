import { useCallback, useEffect, useState } from "react";
import "./App.css";
import { MainView } from "./views/home/MainView";
import { CharlasView } from "./views/charlas/CharlasView";
import { LoginView } from "./views/auth/LoginView";
import { RegisterView } from "./views/auth/RegisterView";
import { MisReservasView } from "./views/reservas/MisReservasView";
import { getUser } from "./api/usersApi";
import Navbar from "./components/navbar/Navbar";
import { Footer } from "./components/footer/Footer";

function App() {
  const [logeado, setLogeado] = useState(false);
  const [vista, setVista] = useState("inicio");
  const [mensajeRegistro, setMensajeRegistro] = useState("");

  useEffect(() => {
    comprobarSesionIniciada();
  }, []);

  async function comprobarSesionIniciada() {
    const token =
      localStorage.getItem("token") ?? sessionStorage.getItem("token");

    if (token) {
      try {
        const user = await getUser(token);
        console.log(user);

        setLogeado(true);
        setVista("inicio");
      } catch (error) {
        console.log(error);

        localStorage.removeItem("token");
        sessionStorage.removeItem("token");

        setLogeado(false);
        setVista("inicio");
      }
    } else {
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
    setVista("inicio");
  }

  function irACharlas() {
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

  const cerrarSesionCaducada = useCallback(() => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");

    setLogeado(false);
    setVista("login");
  }, []);

  return (
    <>
      {(vista === "inicio" || vista === "charlas" || vista === "reservas") && (
        <>
          <Navbar
            logeado={logeado}
            vistaActiva={vista}
            onIrAInicio={irAInicio}
            onIrACharlas={irACharlas}
            onIrALogin={() => setVista("login")}
            onIrARegistro={irARegistro}
            onIrAReservas={irAReservas}
          />

          {vista === "inicio" && (
            <MainView onIrACharlas={irACharlas} />
          )}

          {vista === "charlas" && (
            <CharlasView />
          )}

          {vista === "reservas" && (
            <MisReservasView
              onIrAInicio={irAInicio}
              onIrACharlas={irACharlas}
              onSesionCaducada={cerrarSesionCaducada}
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