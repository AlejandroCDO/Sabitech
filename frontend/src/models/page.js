export class Page {
	constructor({ items }) {
		this.items = items;
	}

	static fromJSON(json, listKey, mapFn) {
		const lista = Array.isArray(json) ? json : json[listKey];
		const rawItems = Array.isArray(lista) ? lista : [];
		return rawItems.map(mapFn);
	}
}
