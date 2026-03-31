import { getAuthHeaders } from '@/utils/auth';

const API_URL = import.meta.env.VITE_API_URL;

export interface PresupuestoRequest {
    startYear: string | number;
    endYear: string | number;
    startMonth: string | number;
    endMonth: string | number;
    tipoVista: string;
}

export const fetchPresupuestoData = async (params: PresupuestoRequest) => {
    if (!API_URL) {
        throw new Error('La URL de la API (VITE_API_URL) no está configurada en el .env');
    }

    const response = await fetch(`${API_URL}/api/presupuesto`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            ...getAuthHeaders()
        },
        body: JSON.stringify(params),
    });

    if (!response.ok) {
        throw new Error(`Error en la API de presupuesto: ${response.status}`);
    }

    const data = await response.json();
    // La respuesta parece ser un objeto que convertimos a array en el componente anterior
    return Object.values(data);
};
