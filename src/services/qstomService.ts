import { QSTOMReport, RequestReportParams } from '@/types/qstom';
import { getAuthHeaders } from '@/utils/auth';

const API_URL = import.meta.env.VITE_API_URL;

// En Vite utilizamos la URL base configurada para todas las llamadas al backend.

export const fetchQstomLogs = async (): Promise<QSTOMReport[]> => {
    const response = await fetch(`${API_URL}/api/internal/qstom`, {
        headers: getAuthHeaders()
    });
    if (!response.ok) {
        throw new Error('Error al obtener los logs');
    }
    return response.json();
};

export const requestQstomReport = async (data: RequestReportParams): Promise<void> => {
    const response = await fetch(`${API_URL}/api/internal/qstom/report`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        throw new Error('Error al solicitar el reporte');
    }
};
