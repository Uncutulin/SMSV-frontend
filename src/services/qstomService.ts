import { QSTOMReport, RequestReportParams } from '@/types/qstom';

// Note: Internal API routes are correctly called with relative paths in client components,
// but if this services is used server-side or needs absolute URL, process.env.NEXT_PUBLIC_BASE_URL might be needed.
// However, looking at the previous page.tsx, it was using relative '/api/internal/qstom'.
// We will maintain relative paths for internal Next.js API routes called from client.

export const fetchQstomLogs = async (): Promise<QSTOMReport[]> => {
    const response = await fetch('/api/internal/qstom');
    if (!response.ok) {
        throw new Error('Error al obtener los logs');
    }
    return response.json();
};

export const requestQstomReport = async (data: RequestReportParams): Promise<void> => {
    const response = await fetch('/api/internal/qstom/report', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        throw new Error('Error al solicitar el reporte');
    }
};
