import { verifyToken } from "@/app/lib/dal"
import { NextResponse } from "next/server"

export async function GET(req: Request) {
    const token = await verifyToken()
    if (!token) {
        return NextResponse.json({ error: 'Not logged in.' }, { status: 403 })
    }
    const api_token = process.env.API_TOKEN
    if (!api_token) {
        console.error("Missing API token.")
        return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })
    }
    try {
        const result = await fetch('https://soul-connection.fr/api/employees/me', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-Group-Authorization': api_token,
                'Authorization': `Bearer ${token}`
            },
        })
        return NextResponse.json(await result.json(), { status: result.status })
    } catch(err) {
        console.error(err)
        return NextResponse.json({ error: err }, { status: 500 })
    }
}
