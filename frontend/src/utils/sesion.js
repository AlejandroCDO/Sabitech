export function guardarSesion(token, usuario, recordar = true) {
  const almacen = recordar ? localStorage : sessionStorage;
  almacen.setItem("token", token);
  almacen.setItem("usuario", JSON.stringify(usuario));
}

export function getToken() {
  return localStorage.getItem("token") ?? sessionStorage.getItem("token");
}

export function getUsuario() {
  const texto = localStorage.getItem("usuario") ?? sessionStorage.getItem("usuario");
  return texto ? JSON.parse(texto) : null;
}

export function cerrarSesion() {
  for (const clave of ["token", "usuario"]) {
    localStorage.removeItem(clave);
    sessionStorage.removeItem(clave);
  }
}