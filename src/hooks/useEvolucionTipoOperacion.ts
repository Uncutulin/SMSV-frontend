// src/hooks/useEvolucionTipoOperacion.ts
import { useState, useEffect } from 'react';
import {
    fetchR12Data,
    fetchQPOLData,
    fetchCanales,
    fetchFiltrosDependientes,
    EvolucionData,
    Compania,
    Ramo,
    FiltroDependiente
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
    vinculo: string;
}

export const useEvolucionTipoOperacion = ({
    anio1, mes1, anio2, mes2, anio3, mes3,
    tipoVista,
    filtroCanal,
    filtroCia,
    filtroRamo,
    vinculo
}: Props) => {
    const [r12Data, setR12Data] = useState<EvolucionData[]>([]);
    const [qpolData, setQpolData] = useState<EvolucionData[]>([]);
    const [labels, setLabels] = useState({ p1: '', p2: '', p3: '' });
    const [loading, setLoading] = useState(false);
    const [hasFetched, setHasFetched] = useState(false);

    const [filtrosRaw, setFiltrosRaw] = useState<FiltroDependiente[]>([]);
    const [canales, setCanales] = useState<string[]>([]);
    const [companias, setCompanias] = useState<Compania[]>([]);
    const [ramos, setRamos] = useState<Ramo[]>([]);
    const [loadingFilters, setLoadingFilters] = useState(true);

    // Cargar listas de filtros al montar
    useEffect(() => {
        const loadFilters = async () => {
            try {
                const [c, raw] = await Promise.all([
                    fetchCanales(),
                    fetchFiltrosDependientes()
                ]);
                setCanales(c);
                setFiltrosRaw(raw);
            } catch (error) {
                console.error("Error loading filters", error);
            } finally {
                setLoadingFilters(false);
            }
        };
        loadFilters();
    }, []);

    // Derivar compañías y ramos según filtros dependientes
    useEffect(() => {
        let filteredData = filtrosRaw;

        // Tipo de Vista (fuente)
        if (tipoVista && tipoVista !== 'TODOS') {
            const mapaFuentes: { [key: string]: string } = {
                'ASSA': 'QSTOM',
                'CAS': 'GAUS',
                'ART': 'ART'
            };
            const fuenteReal = mapaFuentes[tipoVista] || tipoVista;
            filteredData = filteredData.filter(d => d.fuente === fuenteReal);
        }

        // Si hay una compañía seleccionada, filtrar ramos por esa compañía
        let dataForRamos = filteredData;
        if (filtroCia && filtroCia !== 'TODOS') {
            dataForRamos = filteredData.filter(d => d.IDCompania.toString() === filtroCia);
        }

        // Si hay un ramo seleccionado, filtrar compañías por ese ramo
        let dataForCompanias = filteredData;
        if (filtroRamo && filtroRamo !== 'TODOS') {
            dataForCompanias = filteredData.filter(d => d.id_ramo.toString() === filtroRamo);
        }

        // Extraer compañías únicas
        const uniqueCompaniasMap = new Map();
        dataForCompanias.forEach(d => {
            if (!uniqueCompaniasMap.has(d.IDCompania)) {
                uniqueCompaniasMap.set(d.IDCompania, { id: d.IDCompania, nombre: d.nombre_compania });
            }
        });
        setCompanias(Array.from(uniqueCompaniasMap.values()).sort((a, b) => a.nombre.localeCompare(b.nombre)));

        // Extraer ramos únicos
        const uniqueRamosMap = new Map();
        dataForRamos.forEach(d => {
            if (!uniqueRamosMap.has(d.id_ramo)) {
                uniqueRamosMap.set(d.id_ramo, { id: d.id_ramo, nombre: d.nombre_ramo });
            }
        });
        setRamos(Array.from(uniqueRamosMap.values()).sort((a, b) => a.nombre.localeCompare(b.nombre)));

    }, [filtrosRaw, tipoVista, filtroCia, filtroRamo]);

    // Cargar datos de evolución
    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                let idCompaniaToPass = filtroCia;

                let ramoToPass = 'TODOS';
                if (filtroRamo && filtroRamo !== 'TODOS') {
                    const foundRamo = filtrosRaw.find(r => r.id_ramo.toString() === filtroRamo);
                    if (foundRamo) ramoToPass = foundRamo.nombre_ramo;
                }

                const finalRequest = {
                    anio_1: anio1,
                    mes_1: mes1,
                    anio_2: anio2,
                    mes_2: mes2,
                    anio_3: anio3,
                    mes_3: mes3,
                    tipo_vista: tipoVista,
                    canal: filtroCanal || 'TODOS',
                    compania: 'TODOS', // El backend ya ignora esto si usa id_compania
                    id_compania: idCompaniaToPass,
                    ramo: ramoToPass,
                    vinculo: vinculo
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
    }, [anio1, mes1, anio2, mes2, anio3, mes3, tipoVista, filtroCanal, filtroCia, filtroRamo, vinculo]);

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
