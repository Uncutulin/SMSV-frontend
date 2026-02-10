import { NextResponse } from 'next/server'

export async function POST(req: Request) {
    const body = await req.json().catch(() => null)

    if (!body) {
        return NextResponse.json({ error: 'JSON inválido' }, { status: 400 })
    }

    // Cambia NEXT_PUBLIC_API_URL por una variable de servidor como API_BASE_URL
    const apiBase = process.env.API_BASE_URL
    if (!apiBase) {
        return NextResponse.json({ error: 'Configuración de API faltante' }, { status: 500 })
    }

    try {
        const upstream = await fetch(`${apiBase}/api/campanas-mkt`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(body),
        })

        const data = await upstream.text()
        console.log(data)

        // RETORNO CORRECTO: Pasamos la variable 'data' que tiene el JSON real
        return new NextResponse(data, {
            status: upstream.status,
            headers: {
                'Content-Type': upstream.headers.get('content-type') ?? 'application/json'
            },
        })
    } catch (error) {
        return NextResponse.json({ error: 'Error de conexión con el backend' }, { status: 502 })
    }
}