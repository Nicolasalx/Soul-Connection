import { verifyToken } from "@/app/lib/dal"
import { NextResponse } from "next/server"

export async function GET(req: Request) {
    const token = await verifyToken()
    const result = await fetch('https://soul-connection.fr/api/employees/me', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-Group-Authorization': process.env.API_TOKEN,
            'Authorization': `Bearer ${token}`
        },
    })

    return NextResponse.json(result.json(), { status: result.status })
}
