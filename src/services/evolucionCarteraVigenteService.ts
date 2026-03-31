// src/services/evolucionCarteraService.ts
import { ProductorEjecutivoResponse, ComparativoResponse } from '../types/evolucionCarteraVigente';
import { getAuthHeaders } from '@/utils/auth';


const API_URL = import.meta.env.VITE_API_URL;

export const fetchEvolucionCarteraData = async (params: string, serverToken?: string) => {
    try {
        // En Promise.all, pasamos una tupla con los tipos esperados para cada posición
        const [resStats, resTabla] = await Promise.all([
            fetch(`${API_URL}/api/evolucion-de-cartera/productores?${params}`, { cache: 'no-store', headers: getAuthHeaders(serverToken) }),
            fetch(`${API_URL}/api/evolucion-de-cartera/ejecutivos?${params}`, { cache: 'no-store', headers: getAuthHeaders(serverToken) })
        ]);

        if (!resStats.ok || !resTabla.ok) {
            throw new Error('Error en la comunicación con el servidor');
        }

        // Aquí es donde asignamos los tipos genéricos a la respuesta del JSON
        const productores: ProductorEjecutivoResponse = await resStats.json();
        const ejecutivos: ProductorEjecutivoResponse = await resTabla.json();

        return { productores, ejecutivos };

    } catch (error) {
        console.error("Error en service:", error);
        throw error;
    }
};

export const fetchEvolucionCarteraComparativo = async (params: string, serverToken?: string) => {
    try {
        const response = await fetch(`${API_URL}/api/evolucion-de-cartera/comparativo?${params}`, {
            cache: 'no-store',
            headers: getAuthHeaders(serverToken)
        });

        if (!response.ok) {
            throw new Error('Error en la comunicación con el servidor');
        }

        const data: ComparativoResponse = await response.json();
        return data;

    } catch (error) {
        console.error("Error en fetchEvolucionCarteraComparativo:", error);
        throw error;
    }
};