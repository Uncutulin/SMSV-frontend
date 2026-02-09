// src/types/evolucionCarteraVigente.ts

import { ApiResponse } from "./apiResponse";

export interface ProductorEjecutivo {
    nombre: string;
}

export type ProductorEjecutivoResponse = ApiResponse<ProductorEjecutivo[]>;

export interface DatoComparativo {
    entidad: string;
    q_pol_periodo_ini: number;
    q_pol_periodo_fin: number;
    dif_q_pol: number;
    pct_q_pol: string;
    r12_periodo_ini: string;
    r12_periodo_fin: string;
    dif_r12: string;
    pct_r12: string;
}

export interface ComparativoResponse extends ApiResponse<DatoComparativo[]> {
    labels: {
        status: string;
        inicio: string;
        fin: string;
    };
}
