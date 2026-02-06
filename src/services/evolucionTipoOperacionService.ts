// src/services/evolucionTipoOperacionService.ts

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface EvolucionData {
    entidad: string;
    
    q_1: number;
    r_1: string;
    
    q_2: number;
    r_2: string;
    
    q_3: number;
    r_3: string;
    
    dif_q_12: number;
    pct_q_12: string;
    dif_r_12: string;
    pct_r_12: string;

    dif_q_23: number;
    pct_q_23: string;
    dif_r_23: string;
    pct_r_23: string;
}

export interface EvolucionResponse {
    status: string;
    data: EvolucionData[];
    labels: {
        p1: string;
        p2: string;
        p3: string;
    };
}

export const fetchEvolucion = async (params: string): Promise<EvolucionResponse> => {
    try {
        const response = await fetch(`${API_URL}/api/evolucion-tipo-operacion?${params}`, {
            cache: 'no-store',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Error en la comunicación con el servidor');
        }

        return await response.json();
    } catch (error) {
        console.error("Error en fetchEvolucion:", error);
        throw error;
    }
};

export const fetchCanales = async (): Promise<string[]> => {
    try {
        const response = await fetch(`${API_URL}/api/evolucion-tipo-operacion/canales`, { cache: 'no-store' });
        if (!response.ok) throw new Error('Error fetching canales');
        return await response.json();
    } catch (error) {
        console.error("Error fetching canales:", error);
        return [];
    }
};

export const fetchCompanias = async (): Promise<string[]> => {
    try {
        const response = await fetch(`${API_URL}/api/evolucion-tipo-operacion/companias`, { cache: 'no-store' });
        if (!response.ok) throw new Error('Error fetching companias');
        return await response.json();
    } catch (error) {
        console.error("Error fetching companias:", error);
        return [];
    }
};

export const fetchRamos = async (): Promise<string[]> => {
    try {
        const response = await fetch(`${API_URL}/api/evolucion-tipo-operacion/ramos`, { cache: 'no-store' });
        if (!response.ok) throw new Error('Error fetching ramos');
        return await response.json();
    } catch (error) {
        console.error("Error fetching ramos:", error);
        return [];
    }
};
