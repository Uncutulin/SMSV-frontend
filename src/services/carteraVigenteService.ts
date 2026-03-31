import { CarteraVigenteTotalesResponse, CarteraVigenteListadoResponse } from '../types/carteraVigente';
import { getAuthHeaders } from '@/utils/auth';


const API_URL = import.meta.env.VITE_API_URL;

export const fetchCarteraVigenteData = async (params: string, serverToken?: string) => {
    try {
        const [resStats, resTabla] = await Promise.all([
            fetch(`${API_URL}/api/cartera-vigente/indicadores?${params}`, {
                cache: 'no-store',
                headers: getAuthHeaders(serverToken)
            }),
            fetch(`${API_URL}/api/cartera-vigente/listado?${params}`, {
                cache: 'no-store',
                headers: getAuthHeaders(serverToken)
            })
        ]);

        if (!resStats.ok || !resTabla.ok) {
            throw new Error(`Error Laravel: Stats ${resStats.status}, Tabla ${resTabla.status}`);
        }

        // Usamos tus interfaces específicas
        const totales: CarteraVigenteTotalesResponse = await resStats.json();
        const tabla: CarteraVigenteListadoResponse = await resTabla.json();

        return { totales, tabla };

    } catch (error) {
        console.error("Error en service:", error);
        throw error;
    }
};