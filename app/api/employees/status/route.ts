import { verifyToken } from "@/app/lib/dal"
import { NextResponse } from "next/server"

export async function GET(_req: Request) {
    const token = await verifyToken()

    if (!token) {
        return NextResponse.json({ error: 'Not logged in.' }, { status: 403 })
    }
    return NextResponse.json(token, { status: 200 })
}
