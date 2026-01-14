import { useState, useEffect, useCallback } from 'react';
import { fetchQstomLogs, requestQstomReport } from '@/services/qstomService';
import { QSTOMReport, RequestReportParams } from '@/types/qstom';

export const useQstom = () => {
    const [logs, setLogs] = useState<QSTOMReport[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [reportLoading, setReportLoading] = useState<boolean>(false);

    const getLogs = useCallback(async () => {
        setLoading(true);
        try {
            const data = await fetchQstomLogs();
            setLogs(data);
            setError(null);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unexpected error occurred');
            }
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        getLogs();
    }, [getLogs]);

    const requestReport = async (params: RequestReportParams) => {
        setReportLoading(true);
        try {
            await requestQstomReport(params);
            // Optionally refresh logs after successful request?
            // The original code did a window.location.reload(), so the caller might handle that.
            // Or we can just return success and let component decide.
        } catch (err) {
            throw err; // Re-throw to let component handle specific UI (alerts)
        } finally {
            setReportLoading(false);
        }
    };

    return {
        logs,
        loading,
        error,
        reportLoading,
        requestReport,
        refreshLogs: getLogs
    };
};
