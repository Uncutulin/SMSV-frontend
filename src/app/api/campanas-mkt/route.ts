import { NextResponse } from 'next/server'

export async function POST(req: Request) {
    const body = await req.json().catch(() => null)

    if (!body) {
        return NextResponse.json({ error: 'JSON inválido' }, { status: 400 })
    }

    // Ej: llamada a TU backend real (server-to-server)
    const apiBase = process.env.NEXT_PUBLIC_API_URL // (no NEXT_PUBLIC)
    if (!apiBase) {
        return NextResponse.json({ error: 'API_BASE_URL no configurada' }, { status: 500 })
    }

    const upstream = await fetch(`${apiBase}/api/campanas-mkt`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        // cache: 'no-store' // si querés evitar caché
    })

    const text = await upstream.text()
    return new NextResponse('text', {
        status: upstream.status,
        headers: { 'Content-Type': upstream.headers.get('content-type') ?? 'application/json' },
    })
}
