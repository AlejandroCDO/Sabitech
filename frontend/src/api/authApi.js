import { ApiError } from "./ApiError.js";

const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8080/api";

async function enviar(ruta, datos) {
  let response;
  let json;
  try {
    response = await fetch(`${API_BASE_URL}${ruta}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(datos),
    });
    json = await response.json();
  } catch {
    throw new ApiError(0, "No se ha podido conectar con el servidor.");
  }

  if (!response.ok) {
    throw new ApiError(response.status, json.mensaje ?? json.message, json);
  }

  return json;
}

export async function login(email, password) {
  return enviar("/login", { email, password });
}

export async function register(usuario) {
  return enviar("/register", usuario);
}
