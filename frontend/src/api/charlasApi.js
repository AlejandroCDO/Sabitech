import { Charla } from '../models/charla.js';
import { ApiError } from './ApiError.js';
import { Page } from '../models/Page.js';

const API_BASE_URL = 'http://localhost:8080/api';
const CHARLAS_URL = `${API_BASE_URL}/charlas`;

export async function list() {
    const response = await fetch(`${CHARLAS_URL}`,);
    const json = await response.json();
    if (!response.ok) {
        throw new ApiError(response.status, json.message);
    }

    // El json es un array de charlas, convertir de jsonarray a js array
    const charlas = Page.fromJSON(json, 'data', Charla.fromJSON);

    return charlas;
}

