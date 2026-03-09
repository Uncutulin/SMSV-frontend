import { NextRequest, NextResponse } from 'next/server';
import { fetchEvolucionFromBackend } from '@/services/evolucionTipoOperacionService';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const queryString = searchParams.toString();

    try {
        const data = await fetchEvolucionFromBackend(queryString);
        return NextResponse.json(data);

    } catch (error: any) {
        console.error("Error en el Handler de Evolucion Tipo Operacion:", error.message);

        return NextResponse.json(
            { status: 'error', error: 'Error interno al procesar la evolución' },
            { status: 500 }
        );
    }
}
