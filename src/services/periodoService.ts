import { getAuthHeaders } from '@/utils/auth';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Obtener la lista de años únicos
export const fetchAnios = async (serverToken?: string) => {
    const res = await fetch(`${API_URL}/api/periodo/anios`, { cache: 'no-store', headers: getAuthHeaders(serverToken) });
    if (!res.ok) throw new Error('Error al cargar años');
    const response = await res.json();
    return response.data.anios; // Retorna el array de años
};

// Obtener meses filtrados por año
export const fetchMesesByAnio = async (anio: number, serverToken?: string) => {
    const res = await fetch(`${API_URL}/api/periodo/meses?anio=${anio}`, { cache: 'no-store', headers: getAuthHeaders(serverToken) });
    if (!res.ok) throw new Error('Error al cargar meses');
    const response = await res.json();
    return response.data.meses;
};
