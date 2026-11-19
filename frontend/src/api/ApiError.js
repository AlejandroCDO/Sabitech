export class ApiError extends Error {
  constructor(status, message, body = null) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.body = body;
  }

  get isUnauthorized() {
    return this.status === 401;
  }

  get isNotFound() {
    return this.status === 404;
  }

  get erroresPorCampo() {
    const errors = this.body?.errors;
    if (!errors) {
      return null;
    }

    return Object.fromEntries(Object.entries(errors).map(([campo, mensajes]) => [campo, mensajes[0]]));
  }
}
