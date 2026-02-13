import { NextResponse } from 'next/server';
import { fetchMarketingData } from '@/services/marketingService';

export async function POST(req: Request) {
    try {
        // Validamos que el JSON sea válido
        const body = await req.json().catch(() => null);

        if (!body) {
            return NextResponse.json({ error: 'Cuerpo de petición inválido' }, { status: 400 });
        }

        const data = await fetchMarketingData(body, body.page || 1);

        return NextResponse.json(data);
    } catch (error: any) {
        console.error("Marketing Proxy Error:", error.message);
        return NextResponse.json({ error: 'Fallo en el proxy de marketing' }, { status: 502 });
    }
}