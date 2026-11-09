export class Charla {
    constructor({
        id = null,
        ponente_id,
        ubicacion_id,
        titulo,
        descripcion,
        inicio,
        fin,
        aforo,
        plazas_ocupadas = 0,
        cancelada = false
    }) {
        this.id = id;
        this.ponente_id = ponente_id;
        this.ubicacion_id = ubicacion_id;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.inicio = inicio;
        this.fin = fin;
        this.aforo = aforo;
        this.plazas_ocupadas = plazas_ocupadas;
        this.cancelada = cancelada;
    }

    static fromJSON(json) {
        return new Charla({
            id: json.id,
            ponente_id: json.ponente_id,
            ubicacion_id: json.ubicacion_id,
            titulo: json.titulo,
            descripcion: json.descripcion,
            inicio: json.inicio,
            fin: json.fin,
            aforo: json.aforo,
            plazas_ocupadas: json.plazas_ocupadas,
            cancelada: json.cancelada
        });
    }

    toJSON() {
        return {
            id: this.id,
            ponente_id: this.ponente_id,
            ubicacion_id: this.ubicacion_id,
            titulo: this.titulo,
            descripcion: this.descripcion,
            inicio: this.inicio,
            fin: this.fin,
            aforo: this.aforo,
            plazas_ocupadas: this.plazas_ocupadas,
            cancelada: this.cancelada
        };
    }
}
