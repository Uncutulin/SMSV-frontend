import { NextRequest, NextResponse } from 'next/server';
import { fetchCarteraVigenteData } from '@/services/carteraVigenteService';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const queryString = searchParams.toString();

    try {
        const data = await fetchCarteraVigenteData(queryString);
        return NextResponse.json(data);

    } catch (error: any) {
        console.error("Error en el Handler de Cartera:", error.message);

        return NextResponse.json(
            { error: 'Error interno al procesar la cartera' },
            { status: 500 }
        );
    }
}