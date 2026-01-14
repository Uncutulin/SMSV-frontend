// src/hooks/useCarteraVigente.ts
import { useState, useEffect } from 'react';
import { fetchCarteraVigenteData } from '@/services/carteraVigenteService';
import { CarteraVigenteTotales, CarteraVigenteListado } from '@/types/carteraVigente';

export const useCarteraVigente = (filters: any) => {
    const [totalesData, setTotalesData] = useState<CarteraVigenteTotales | null>(null);
    const [listadoData, setListadoData] = useState<CarteraVigenteListado[] | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            setError(null);

            // Evitar fetch si falta año o mes (por ejemplo al cambiar de año)
            if (!filters.anio || !filters.mes) {
                setLoading(false);
                return;
            }

            try {
                const queryParams = new URLSearchParams(filters).toString();
                const { totales, tabla } = await fetchCarteraVigenteData(queryParams);

                if (totales.status === 'success') setTotalesData(totales.data); //Totales
                if (tabla.status === 'success') setListadoData(tabla.data); //Listado

            } catch (err) {
                setError('Error al cargar los datos');
            } finally {
                setLoading(false);
            }
        };

        getData();
    }, [filters.anio, filters.mes, filters.compania, filters.tipo_filtro]);

    return { listadoData, totalesData, loading, error };
};