// src/services/evolucionCarteraService.ts
import { ProductorEjecutivoResponse, ComparativoResponse } from '../types/evolucionCarteraVigente';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchEvolucionCarteraData = async (params: string) => {
    try {
        // En Promise.all, pasamos una tupla con los tipos esperados para cada posición
        const [resStats, resTabla] = await Promise.all([
            fetch(`${API_URL}/api/evolucion-de-cartera/productores?${params}`, { cache: 'no-store' }),
            fetch(`${API_URL}/api/evolucion-de-cartera/ejecutivos?${params}`, { cache: 'no-store' })
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

export const fetchEvolucionCarteraComparativo = async (params: string) => {
    try {
        const response = await fetch(`${API_URL}/api/evolucion-de-cartera/comparativo?${params}`, {
            cache: 'no-store',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
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