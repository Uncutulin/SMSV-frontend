import { useState, useEffect } from 'react';
import {
    CarteraVigenteTotales,
    CarteraVigenteListado,
    CarteraVigenteTotalesResponse,
    CarteraVigenteListadoResponse
} from '@/types/carteraVigente';

export const useCarteraVigente = (filters: any) => {
    const [totalesData, setTotalesData] = useState<CarteraVigenteTotales | null>(null);
    const [listadoData, setListadoData] = useState<CarteraVigenteListado[] | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getData = async () => {
            if (!filters.anio || !filters.mes) return;

            setLoading(true);
            setError(null);

            try {
                const queryParams = new URLSearchParams(filters).toString();
                const response = await fetch(`/api/cartera-vigente?${queryParams}`);

                if (!response.ok) throw new Error('Error al conectar con la API interna');

                // Tipamos la respuesta que viene del Handler
                const { totales, tabla }: {
                    totales: CarteraVigenteTotalesResponse,
                    tabla: CarteraVigenteListadoResponse
                } = await response.json();

                // Verificamos el status según tu ApiResponse
                if (totales.status === 'success') {
                    setTotalesData(totales.data);
                }

                if (tabla.status === 'success') {
                    setListadoData(tabla.data);
                }

            } catch (err) {
                console.error("Hook Error:", err);
                setError('Error al cargar los datos de la cartera');
            } finally {
                setLoading(false);
            }
        };

        getData();
    }, [filters.anio, filters.mes, filters.compania, filters.tipo_filtro]);

    return { listadoData, totalesData, loading, error };
};