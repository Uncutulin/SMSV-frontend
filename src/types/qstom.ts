export interface QSTOMReport {
    id: number;
    reportId: string;
    date: string;
    startDate: string;
    endDate: string;
    errors: string[];
    result: number;
    produccion_realizada: number;
    personal_asegurado: number;
    polizas_en_vigencia: number;
    created_at: string;
    updated_at: string;
}

export interface RequestReportParams {
    date: string;
    type: number;
}
