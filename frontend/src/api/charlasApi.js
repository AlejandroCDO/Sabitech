import { Charla } from "../models/charla.js";
import { ApiError } from "./ApiError.js";

const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8080/api";
const CHARLAS_URL = `${API_BASE_URL}/charlas`;

export async function list() {
  let response;
  let json;
  try {
    response = await fetch(CHARLAS_URL, {
      headers: { Accept: "application/json" },
    });
    json = await response.json();
  } catch {
    throw new ApiError(0, "No se ha podido conectar con el servidor.");
  }

  if (!response.ok) {
    throw new ApiError(response.status, json.mensaje ?? json.message);
  }

  const charlas = Array.isArray(json) ? json : json.data ?? [];
  return charlas.map(Charla.fromJSON);
}
