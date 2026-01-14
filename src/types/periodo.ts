// src/types/carteraVigente.ts


import { ApiResponse } from "./apiResponse";

export interface anios {
    anio: string;
}

export interface meses {
    mes_numero: string;
    mes_nombre: string;
}

export type aniosResponse = ApiResponse<anios[]>;
export type mesesResponse = ApiResponse<meses[]>;



