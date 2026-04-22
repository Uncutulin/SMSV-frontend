import { useState, useEffect, useMemo } from 'react';
import { fetchAllPeriodos } from '@/services/periodoService';

// Definimos las interfaces según tu JSON
export interface MesData {
    mes_numero: number;
    mes_nombre: string;
}

export interface PeriodoData {
    anio: number;
    meses: MesData[];
}

export const usePeriodos = (selectedAnio?: string | number) => {
    const [periodos, setPeriodos] = useState<PeriodoData[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getAllPeriodos = async () => {
            setLoading(true);
            try {
                const data = await fetchAllPeriodos();
                setPeriodos(data);
            } catch (err) {
                setError('Error al cargar los periodos');
            } finally {
                setLoading(false);
            }
        };
        getAllPeriodos();
    }, []);

    const anios = useMemo(() => {
        return periodos.map(p => ({ anio: p.anio }));
    }, [periodos]);

    const meses = useMemo(() => {
        if (!selectedAnio) return [];
        const anioNum = Number(selectedAnio);
        const p = periodos.find(p => p.anio === anioNum);
        return p ? p.meses : [];
    }, [periodos, selectedAnio]);

    return { periodos, anios, meses, loading, error };
};