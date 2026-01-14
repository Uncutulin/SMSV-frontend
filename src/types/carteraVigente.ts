// src/types/carteraVigente.ts

import { ApiResponse } from "./apiResponse";

export interface CarteraVigenteTotales {
    total_polizas: string;
    total_mensual: string;
    total_anual: string;
    total_capitas: string;
}

export interface CarteraVigenteListado {
    nombre_grupo: string;
    q_pol: string;
    r12: string;
}

export type CarteraVigenteTotalesResponse = ApiResponse<CarteraVigenteTotales>;
export type CarteraVigenteListadoResponse = ApiResponse<CarteraVigenteListado[]>;