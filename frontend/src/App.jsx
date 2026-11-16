import { useEffect, useState } from "react";
import "./App.css";
import { MainView } from "./views/MainView";
import { LoginView } from "./views/LoginView";
import { RegisterView } from "./views/RegisterView";
import { getUser } from "./api/usersApi";
import Navbar from "./components/navbar/Navbar";

function App() {
  const [logeado, setLogeado] = useState(false);
  const [vista, setVista] = useState("login");
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
      } catch (error) {
        console.log(error);
      }
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

  if (logeado) {
    return <MainView></MainView>;
  }

  if (vista === "registro") {
    return (
      <RegisterView
        onRegistrado={terminarRegistro}
        onIrALogin={() => setVista("login")}
      ></RegisterView>
    );
  }

  return (
    <>
      <Navbar />

      {logeado ? (
        <MainView />
      ) : vista === "registro" ? (
        <RegisterView
          onRegistrado={terminarRegistro}
          onIrALogin={() => setVista("login")}
        />
      ) : (
        <LoginView
          onLogin={comprobarSesionIniciada}
          onIrARegistro={irARegistro}
          mensajeExito={mensajeRegistro}
        />
      )}
    </>
  );
}

export default App;
