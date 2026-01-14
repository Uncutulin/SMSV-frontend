// src/services/carteraService.ts
import { CarteraVigenteTotalesResponse, CarteraVigenteListadoResponse } from '../types/carteraVigente';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchCarteraVigenteData = async (params: string) => {
    try {
        // En Promise.all, pasamos una tupla con los tipos esperados para cada posición
        const [resStats, resTabla] = await Promise.all([
            fetch(`${API_URL}/api/cartera-vigente/indicadores?${params}`, { cache: 'no-store' }),
            fetch(`${API_URL}/api/cartera-vigente/listado?${params}`, { cache: 'no-store' })
        ]);

        if (!resStats.ok || !resTabla.ok) {
            throw new Error('Error en la comunicación con el servidor');
        }

        // Aquí es donde asignamos los tipos genéricos a la respuesta del JSON
        const totales: CarteraVigenteTotalesResponse = await resStats.json();
        const tabla: CarteraVigenteListadoResponse = await resTabla.json();

        return { totales, tabla };

    } catch (error) {
        console.error("Error en service:", error);
        throw error;
    }
};