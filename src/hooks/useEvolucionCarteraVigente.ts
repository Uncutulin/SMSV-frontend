// src/hooks/useEvolucionCarteraVigente.ts
import { useState, useEffect } from 'react';
import { fetchEvolucionCarteraData, fetchEvolucionCarteraComparativo } from '@/services/evolucionCarteraVigenteService';
import { ProductorEjecutivo, DatoComparativo } from '@/types/evolucionCarteraVigente';

export const useEvolucionCarteraVigente = (
    tipoVista: string,
    anioInicio: string,
    mesInicio: string,
    anioFin: string,
    mesFin: string,
    filtroProductor: string,
    filtroEjecutivo: string,
    shouldFetch: boolean = true
) => {
    const [listaProductores, setListaProductores] = useState<ProductorEjecutivo[]>([]);
    const [listaEjecutivos, setListaEjecutivos] = useState<ProductorEjecutivo[]>([]);
    const [listaComparativa, setListaComparativa] = useState<DatoComparativo[]>([]);
    const [comparativaLabels, setComparativaLabels] = useState<{ inicio: string, fin: string }>({ inicio: '', fin: '' });
    const [loadingDropdowns, setLoadingDropdowns] = useState(false);
    const [loadingComparativa, setLoadingComparativa] = useState(false);

    useEffect(() => {
        // Evitamos peticiones innecesarias si la vista está vacía
        if (!tipoVista) return;

        const loadData = async () => {
            setLoadingDropdowns(true);
            try {
                const params = new URLSearchParams({
                    tipo_vista: tipoVista
                }).toString();

                const { productores, ejecutivos } = await fetchEvolucionCarteraData(params);

                if (productores.status === 'success') setListaProductores(productores.data);
                if (ejecutivos.status === 'success') setListaEjecutivos(ejecutivos.data);
            } catch (error) {
                console.error("Error cargando selectores:", error);
            } finally {
                setLoadingDropdowns(false);
            }
        };

        loadData();
    }, [tipoVista]);

    // Nuevo efecto para cargar los datos comparativos (podría unificarse, pero lo separo por claridad y porque podría depender de otros filtros a futuro)
    useEffect(() => {
        if (!shouldFetch || !tipoVista || !anioInicio || !mesInicio || !anioFin || !mesFin) return;

        const loadComparativo = async () => {
            setLoadingComparativa(true);
            try {
                const paramsObj: any = {
                    tipo_vista: tipoVista,
                    anio_inicio: anioInicio,
                    mes_inicio: mesInicio,
                    anio_fin: anioFin,
                    mes_fin: mesFin
                };

                if (filtroProductor && filtroProductor !== 'TODOS') {
                    paramsObj.productor = filtroProductor;
                }
                if (filtroEjecutivo && filtroEjecutivo !== 'TODOS') {
                    paramsObj.ejecutivo = filtroEjecutivo;
                }

                const params = new URLSearchParams(paramsObj).toString();

                const response = await fetchEvolucionCarteraComparativo(params);
                console.log(response);
                if (response.status === 'success') {
                    console.log(response.data);
                    console.log(response.labels);
                    setListaComparativa(response.data);
                    setComparativaLabels(response.labels);
                }
            } catch (error) {
                console.error("Error cargando comparativa:", error);
            } finally {
                setLoadingComparativa(false);
            }
        };

        loadComparativo();
    }, [tipoVista, anioInicio, mesInicio, anioFin, mesFin, filtroProductor, filtroEjecutivo, shouldFetch]);

    return { listaProductores, listaEjecutivos, loadingDropdowns, listaComparativa, comparativaLabels, loadingComparativa };
};