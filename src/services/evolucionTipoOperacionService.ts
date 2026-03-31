// src/services/evolucionTipoOperacionService.ts
import { getAuthHeaders } from '@/utils/auth';


// Backend API URL
const API_URL = import.meta.env.VITE_API_URL;

export interface EvolucionData {
    entidad: string;
    p1: number;
    p2: number;
    p3: number;
}

export interface EvolucionRequest {
    anio_1: string;
    mes_1: string;
    anio_2: string;
    mes_2: string;
    anio_3: string;
    mes_3: string;
    tipo_vista: string;
    canal: string;
    compania: string;
    ramo: string;
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

// Datos de prueba (Mock)
export const MOCK_EVOLUCION_DATA: EvolucionData[] = [
    { entidad: 'Nuevos Negocios', p1: 1200000, p2: 1450000, p3: 1600000 },
    { entidad: 'Anulaciones', p1: 180000, p2: 120000, p3: 90000 },
    { entidad: 'Renovaciones', p1: 800000, p2: 950000, p3: 1100000 },
    { entidad: 'Refacturación', p1: 200000, p2: 280000, p3: 350000 },
    { entidad: 'Otros Endosos', p1: 120000, p2: 150000, p3: 180000 }
];

// --- FUNCIONES PARA LLAMAR AL BACKEND (Laravel) ---

/**
 * Utility to fetch data from the Laravel backend using POST with JSON body.
 */
export const fetchFromBackend = async (subpath: string, params: EvolucionRequest, serverToken?: string): Promise<EvolucionResponse> => {
    try {
        const url = `${API_URL}/api/evolucion-tipo-operacion${subpath}`;

        const response = await fetch(url, {
            method: 'POST',
            cache: 'no-store',
            headers: getAuthHeaders(serverToken),
            body: JSON.stringify(params)
        });

        if (!response.ok) {
            throw new Error(`Error Laravel (${subpath}): ${response.status}`);
        }

        const data = await response.json();

        return data;
    } catch (error) {
        console.error(`Error en fetchFromBackend (${subpath}):`, error);
        throw error;
    }
};

export const fetchEvolucionFromBackend = async (params: string, serverToken?: string): Promise<EvolucionResponse> => {
    try {
        const response = await fetch(`${API_URL}/api/evolucion-tipo-operacion?${params}`, {
            cache: 'no-store',
            headers: getAuthHeaders(serverToken)
        });

        if (!response.ok) {
            throw new Error(`Error Laravel: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error en fetchEvolucionFromBackend:", error);
        throw error;
    }
};

export const fetchR12Data = async (params: EvolucionRequest): Promise<EvolucionResponse> => {
    try {
        const response = await fetch(`${API_URL}/api/evolucion-tipo-operacion/r12`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(params),
            cache: 'no-store'
        });

        if (!response.ok) throw new Error('Error al conectar con la API R12');
        return await response.json();
    } catch (error) {
        console.error("Error en fetchR12Data:", error);
        throw error;
    }
};

export const fetchQPOLData = async (params: EvolucionRequest): Promise<EvolucionResponse> => {
    try {
        const response = await fetch(`${API_URL}/api/evolucion-tipo-operacion/qpol`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(params),
            cache: 'no-store'
        });

        if (!response.ok) throw new Error('Error al conectar con la API QPOL');
        return await response.json();
    } catch (error) {
        console.error("Error en fetchQPOLData:", error);
        throw error;
    }
};

// Deprecated: keeping it briefly to avoid breaking the build while updating hooks
export const fetchEvolucionCharts = async (params: EvolucionRequest): Promise<EvolucionResponse> => {
    return fetchR12Data(params);
};

// Filtros (Siguen llamando al backend directamente o podrías crear rutas API para ellos también)
export const fetchCanales = async (serverToken?: string): Promise<string[]> => {
    try {
        const response = await fetch(`${API_URL}/api/evolucion-tipo-operacion/canales`, { cache: 'no-store', headers: getAuthHeaders(serverToken) });
        if (!response.ok) throw new Error('Error fetching canales');
        return await response.json();
    } catch (error) {
        console.error("Error fetching canales:", error);
        return [];
    }
};

export interface Compania {
    id: number;
    nombre: string;
}

export const fetchCompanias = async (serverToken?: string): Promise<Compania[]> => {
    try {
        const response = await fetch(`${API_URL}/api/evolucion-tipo-operacion/companias`, { cache: 'no-store', headers: getAuthHeaders(serverToken) });
        if (!response.ok) throw new Error('Error fetching companias');
        return await response.json();
    } catch (error) {
        console.error("Error fetching companias:", error);
        return [];
    }
};

export interface Ramo {
    id: number;
    nombre: string;
}

export const fetchRamos = async (serverToken?: string): Promise<Ramo[]> => {
    try {
        const response = await fetch(`${API_URL}/api/evolucion-tipo-operacion/ramos`, { cache: 'no-store', headers: getAuthHeaders(serverToken) });
        if (!response.ok) throw new Error('Error fetching ramos');
        return await response.json();
    } catch (error) {
        console.error("Error fetching ramos:", error);
        return [];
    }
};
