import { useState, useEffect } from 'react';
import { fetchAnios, fetchMesesByAnio } from '@/services/periodoService';

// Definimos las interfaces según tu JSON
interface AnioData {
    anio: number;
}

interface MesData {
    mes_numero: number;
    mes_nombre: string;
}

export const usePeriodos = (selectedAnio?: string | number) => {
    const [anios, setAnios] = useState<AnioData[]>([]);
    const [meses, setMeses] = useState<MesData[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getAnios = async () => {
            setLoading(true);
            try {
                const data = await fetchAnios(); // Tu fetch ya retorna response.data.anios
                setAnios(data);
            } catch (err) {
                setError('Error al cargar los años');
            } finally {
                setLoading(false);
            }
        };
        getAnios();
    }, []);

    useEffect(() => {
        if (!selectedAnio) return;

        const getMeses = async () => {
            setLoading(true);
            try {
                const data = await fetchMesesByAnio(Number(selectedAnio));
                setMeses(data);
            } catch (err) {
                setError('Error al cargar los meses');
            } finally {
                setLoading(false);
            }
        };

        getMeses();
    }, [selectedAnio]);

    return { anios, meses, loading, error };
};