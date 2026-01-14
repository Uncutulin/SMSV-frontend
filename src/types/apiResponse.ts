// src/types/carteraVigente.ts

export interface ApiResponse<T> {
    status: 'success' | 'error';
    statusCode: 200 | 400 | 500;
    fecha_corte: string;
    data: T;
}