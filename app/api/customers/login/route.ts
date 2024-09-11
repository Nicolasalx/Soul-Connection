import { connectCustomer } from "@/app/lib/connection"
import { getCustomer } from "@/app/lib/user"

export async function POST(req: Request) {
    const { email, password } = await req.json()
    const customer = await getCustomer(email as string)

    if (!customer || !customer._id) {
        return Response.json({ error: 'Unauthorized' }, { status: 401 })
    }
    if (await connectCustomer(customer, password as string)) {
        return Response.json('OK', { status: 200 })
    } else {
        return Response.json({ error: 'Unauthorized' }, { status: 401 })
    }
}
