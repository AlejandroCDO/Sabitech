import { User } from "../models/user.js";
import { ApiError } from "./ApiError.js";

const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8080/api";

export async function getUser(token) {
  let response;
  let json;
  try {
    response = await fetch(`${API_BASE_URL}/usuario`, {
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

  return User.fromJSON(json.usuario ?? json);
}