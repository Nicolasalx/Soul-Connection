import { verifyToken } from "@/app/lib/dal";
import { logout } from "@/app/lib/connection";

export async function POST(_req: Request) {
    const token = await verifyToken()

    if (!token) {
        return Response.json({ error: 'Not logged in.' }, { status: 403 })
    }
    await logout()
    return Response.json('Disconnected successfully.', { status: 307 })
}
