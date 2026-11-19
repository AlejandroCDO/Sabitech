import { ApiError } from "./ApiError.js";

const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8080/api";

export async function listarMisReservas() {
  const token = localStorage.getItem("token") ?? sessionStorage.getItem("token");

  let response;
  let json;
  try {
    response = await fetch(`${API_BASE_URL}/reservas`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
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

export async function crearReserva(charlaId) {
  const token = localStorage.getItem("token") ?? sessionStorage.getItem("token");

  let response;
  let json;
  try {
    response = await fetch(`${API_BASE_URL}/reservas`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ charla_id: charlaId }),
    });
    json = await response.json();
  } catch {
    throw new ApiError(0, "No se ha podido conectar con el servidor.");
  }

  if (response.status === 401) {
    throw new ApiError(401, "Debes registrarte o iniciar sesión primero.", json);
  }

  if (!response.ok) {
    throw new ApiError(response.status, json.mensaje ?? json.message, json);
  }

  return json;
}

export async function cancelarReserva(reservaId) {
  const token = localStorage.getItem("token") ?? sessionStorage.getItem("token");

  let response;
  let json;
  try {
    response = await fetch(`${API_BASE_URL}/reservas/${reservaId}/cancelar`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
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
