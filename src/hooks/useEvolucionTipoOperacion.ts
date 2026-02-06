// src/hooks/useEvolucionTipoOperacion.ts
import { useState, useEffect } from 'react';
import {
    fetchEvolucion,
    fetchCanales,
    fetchCompanias,
    fetchRamos,
    EvolucionData
} from '@/services/evolucionTipoOperacionService';

interface Props {
    anio1: string;
    mes1: string;
    anio2: string;
    mes2: string;
    anio3: string;
    mes3: string;
    tipoVista: string;
    filtroCanal: string;
    filtroCia: string;
    filtroRamo: string;
}

export const useEvolucionTipoOperacion = ({
    anio1, mes1, anio2, mes2, anio3, mes3,
    tipoVista,
    filtroCanal,
    filtroCia,
    filtroRamo
}: Props) => {
    const [data, setData] = useState<EvolucionData[]>([]);
    const [labels, setLabels] = useState({ p1: '', p2: '', p3: '' });
    const [loading, setLoading] = useState(false);

    // Listas para filtros
    const [canales, setCanales] = useState<string[]>([]);
    const [companias, setCompanias] = useState<string[]>([]);
    const [ramos, setRamos] = useState<string[]>([]);
    const [loadingFilters, setLoadingFilters] = useState(true);

    // Cargar listas de filtros al montar
    useEffect(() => {
        const loadFilters = async () => {
            try {
                const [c, k, r] = await Promise.all([
                    fetchCanales(),
                    fetchCompanias(),
                    fetchRamos()
                ]);
                setCanales(c);
                setCompanias(k);
                setRamos(r);
            } catch (error) {
                console.error("Error loading filters", error);
            } finally {
                setLoadingFilters(false);
            }
        };
        loadFilters();
    }, []);

    // Cargar datos de evolución
    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                const paramsObj: any = {
                    anio_1: anio1, mes_1: mes1,
                    anio_2: anio2, mes_2: mes2,
                    anio_3: anio3, mes_3: mes3,
                    tipo_vista: tipoVista
                };

                if (filtroCanal && filtroCanal !== 'TODOS') paramsObj.canal = filtroCanal;
                if (filtroCia && filtroCia !== 'TODOS') paramsObj.cia = filtroCia;
                if (filtroRamo && filtroRamo !== 'TODOS') paramsObj.ramo = filtroRamo;

                const params = new URLSearchParams(paramsObj).toString();
                const response = await fetchEvolucion(params);

                if (response.status === 'success') {
                    setData(response.data);
                    setLabels(response.labels);
                }
            } catch (error) {
                console.error("Error loading evolucion data", error);
            } finally {
                setLoading(false);
            }
        };

        if (anio1 && mes1 && anio2 && mes2 && anio3 && mes3 && tipoVista) {
            loadData();
        }
    }, [anio1, mes1, anio2, mes2, anio3, mes3, tipoVista, filtroCanal, filtroCia, filtroRamo]);

    return {
        data,
        labels,
        loading,
        canales,
        companias,
        ramos,
        loadingFilters
    };
};
