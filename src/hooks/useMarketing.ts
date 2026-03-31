import { useState } from 'react';
import { MarketingResponse, MarketingItem } from '@/types/marketing';
import { fetchMarketingData } from '@/services/marketingService';

export const useMarketing = () => {
    const [data, setData] = useState<MarketingItem[]>([]);
    const [pagination, setPagination] = useState<Omit<MarketingResponse, 'data'> | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const loadMarketing = async (filters: any, page: number = 1) => {
        setLoading(true);
        setError(null);
        try {
            const result = await fetchMarketingData(filters, page);

            setData(result.data); // Los 10 o 50 registros de la página actual
            setPagination(result); // Guardamos meta-datos (total, last_page, etc.)
        } catch (err) {
            setError('No se pudieron cargar las campañas');
        } finally {
            setLoading(false);
        }
    };

    return { data, pagination, loading, error, loadMarketing };
};