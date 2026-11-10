import { useEffect, useState } from "react";
import "./App.css";
import { ListarCharlasButton } from "./components/ListarCharlasButton";
import { MainView } from "./views/MainView";
import { LoginView } from "./views/LoginView";
import { getUser } from "./api/usersApi";

function App() {
    const [logeado, setLogeado] = useState(false);

    useEffect(() => {
        comprobarSesionIniciada();
    }, []);

    async function comprobarSesionIniciada(){
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const user = await getUser;
                console.log(user);
                setLogeado(true);
            }catch(error){
                console.log(error);
            }
        }
    }
    
    return <>{comprobarSesionIniciada() ? <MainView></MainView> : <LoginView onLogin={comprobarSesionIniciada}></LoginView>}</>
}

export default App;
