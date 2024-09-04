import { verifyToken } from "@/app/lib/dal";
import { logout } from "@/app/lib/connection";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const token = await verifyToken()

    if (!token) {
        return NextResponse.json({ error: 'Not logged in.' }, { status: 403 })
    }
    await logout()
    return NextResponse.json('Disconnected successfully.', { status: 307 })
}
