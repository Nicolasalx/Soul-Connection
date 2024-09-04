import { verifyToken } from "@/app/lib/dal"
import { NextResponse } from "next/server"

export async function GET(_req: Request) {
    const token = await verifyToken()

    return NextResponse.json(token, { status: 200 })
}
