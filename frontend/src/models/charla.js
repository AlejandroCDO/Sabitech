export class Charla {
    constructor({
        id = null,
        ponente_id,
        ubicacion_id,
        titulo,
        descripcion,
        foto_url = null,
        inicio,
        fin,
        aforo,
        plazas_ocupadas = 0,
        cancelada = false,
        ponente_nombre = null,
        ubicacion_nombre = null,
        municipio = null
    }) {
        this.id = id;
        this.ponente_id = ponente_id;
        this.ubicacion_id = ubicacion_id;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.foto_url = foto_url;
        this.inicio = inicio;
        this.fin = fin;
        this.aforo = aforo;
        this.plazas_ocupadas = plazas_ocupadas;
        this.cancelada = cancelada;
        this.ponente_nombre = ponente_nombre;
        this.ubicacion_nombre = ubicacion_nombre;
        this.municipio = municipio;
    }

    static fromJSON(json) {
        return new Charla({
            id: json.id,
            ponente_id: json.ponente_id,
            ubicacion_id: json.ubicacion_id,
            titulo: json.titulo,
            descripcion: json.descripcion,
            foto_url: json.foto_url,
            inicio: json.inicio,
            fin: json.fin,
            aforo: json.aforo,
            plazas_ocupadas: json.plazas_ocupadas,
            cancelada: Boolean(json.cancelada),
            ponente_nombre: json.ponente_nombre,
            ubicacion_nombre: json.ubicacion_nombre,
            municipio: json.municipio
        });
    }

    toJSON() {
        return {
            id: this.id,
            ponente_id: this.ponente_id,
            ubicacion_id: this.ubicacion_id,
            titulo: this.titulo,
            descripcion: this.descripcion,
            foto_url: this.foto_url,
            inicio: this.inicio,
            fin: this.fin,
            aforo: this.aforo,
            plazas_ocupadas: this.plazas_ocupadas,
            cancelada: this.cancelada
        };
    }
}
