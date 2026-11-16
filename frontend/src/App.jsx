import { useEffect, useState } from "react";
import "./App.css";
import { MainView } from "./views/MainView";
import { CharlasView } from "./views/charlas/CharlasView";
import { LoginView } from "./views/LoginView";
import { RegisterView } from "./views/RegisterView";
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

  return (
    <>
      {(vista === "inicio" || vista === "charlas") && (
        <>
          <Navbar
            logeado={logeado}
            vistaActiva={vista}
            onIrAInicio={irAInicio}
            onIrACharlas={irACharlas}
            onIrALogin={() => setVista("login")}
            onIrARegistro={irARegistro}
          />

          {vista === "inicio" && (
            <MainView onIrACharlas={irACharlas} />
          )}

          {vista === "charlas" && (
            <CharlasView />
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