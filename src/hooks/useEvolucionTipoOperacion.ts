// src/hooks/useEvolucionTipoOperacion.ts
import { useState, useEffect } from 'react';
import {
    fetchR12Data,
    fetchQPOLData,
    fetchCanales,
    fetchCompanias,
    fetchRamos,
    EvolucionData,
    Compania,
    Ramo
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
    const [r12Data, setR12Data] = useState<EvolucionData[]>([]);
    const [qpolData, setQpolData] = useState<EvolucionData[]>([]);
    const [labels, setLabels] = useState({ p1: '', p2: '', p3: '' });
    const [loading, setLoading] = useState(false);
    const [hasFetched, setHasFetched] = useState(false);

    // Listas para filtros
    const [canales, setCanales] = useState<string[]>([]);
    const [companias, setCompanias] = useState<Compania[]>([]);
    const [ramos, setRamos] = useState<Ramo[]>([]);
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
                const finalRequest = {
                    anio_1: anio1,
                    mes_1: mes1,
                    anio_2: anio2,
                    mes_2: mes2,
                    anio_3: anio3,
                    mes_3: mes3,
                    tipo_vista: tipoVista,
                    canal: filtroCanal || 'TODOS',
                    compania: filtroCia || 'TODOS',
                    ramo: filtroRamo || 'TODOS'
                };

                const [r12Res, qpolRes] = await Promise.all([
                    fetchR12Data(finalRequest),
                    fetchQPOLData(finalRequest)
                ]);

                if (r12Res.status === 'success') {
                    setR12Data(r12Res.data);
                    // Asumimos que los labels son consistentes entre ambos, tomamos los de R12
                    setLabels(r12Res.labels);
                }

                if (qpolRes.status === 'success') {
                    setQpolData(qpolRes.data);
                }
            } catch (error) {
                console.error("Error loading evolucion data", error);
            } finally {
                setLoading(false);
                setHasFetched(true);
            }
        };

        if (anio1 && mes1 && anio2 && mes2 && anio3 && mes3 && tipoVista) {
            loadData();
        }
    }, [anio1, mes1, anio2, mes2, anio3, mes3, tipoVista, filtroCanal, filtroCia, filtroRamo]);

    return {
        r12Data,
        qpolData,
        labels,
        loading,
        hasFetched,
        canales,
        companias,
        ramos,
        loadingFilters
    };
};
