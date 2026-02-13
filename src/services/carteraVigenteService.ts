import { CarteraVigenteTotalesResponse, CarteraVigenteListadoResponse } from '../types/carteraVigente';

const API_URL = process.env.API_BASE_URL;

export const fetchCarteraVigenteData = async (params: string) => {
    try {
        const [resStats, resTabla] = await Promise.all([
            fetch(`${API_URL}/api/cartera-vigente/indicadores?${params}`, {
                cache: 'no-store',
                headers: { 'Accept': 'application/json' }
            }),
            fetch(`${API_URL}/api/cartera-vigente/listado?${params}`, {
                cache: 'no-store',
                headers: { 'Accept': 'application/json' }
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