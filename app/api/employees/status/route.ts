import { verifyToken } from "@/app/lib/dal"

export async function GET(_req: Request) {
    const token = await verifyToken()

    if (!token) {
        return Response.json({ error: 'Not logged in.' }, { status: 403 })
    }
    return Response.json(token, { status: 200 })
}
