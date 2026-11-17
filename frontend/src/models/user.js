/**
 * User — los campos de un usuario de Sabitech que necesita la app.
 */
export class User {
  constructor({
    id,
    nombre = "",
    email = "",
    telefono = "",
    fecha_nacimiento = "",
    rol = "",
    foto_perfil_url = null,
  }) {
    this.id = id;
    this.nombre = nombre;
    this.email = email;
    this.telefono = telefono;
    this.fecha_nacimiento = fecha_nacimiento;
    this.rol = rol;
    this.foto_perfil_url = foto_perfil_url;
  }

  /** Iniciales para mostrar cuando no hay foto de perfil. */
  get iniciales() {
    const palabras = this.nombre.trim().split(/\s+/);

    return (
      (
        (palabras[0]?.[0] ?? "") +
        (palabras[1]?.[0] ?? "")
      ).toUpperCase() || "?"
    );
  }

  /** true si el usuario es administrador. */
  get esAdmin() {
    return this.rol === "admin";
  }

  /** Construye un User a partir del JSON de la API. */
  static fromJSON(json) {
    return new User({
      id: json.id,
      nombre: json.nombre,
      email: json.email,
      telefono: json.telefono,
      fecha_nacimiento: json.fecha_nacimiento,
      rol: json.rol,
      foto_perfil_url: json.foto_perfil_url,
    });
  }

  /** Objeto plano, para guardarlo en el navegador. */
  toJSON() {
    return {
      id: this.id,
      nombre: this.nombre,
      email: this.email,
      telefono: this.telefono,
      fecha_nacimiento: this.fecha_nacimiento,
      rol: this.rol,
      foto_perfil_url: this.foto_perfil_url,
    };
  }
}