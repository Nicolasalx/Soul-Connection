import { registerCustomer } from "@/app/lib/connection"
import { getCustomer } from "@/app/lib/user"

export async function POST(req: Request) {
    const { email, password } = await req.json()
    const customer = await getCustomer(email as string)

    if (!customer || !customer._id || customer.email !== email as string) {
        return Response.json({ error: 'Unauthorized' }, { status: 401 })
    }
    if (customer.password) {
        return Response.json({ error: 'Already registered' }, { status: 409 })
    }
    await registerCustomer(customer, password as string)
    return Response.json('OK', { status: 200 })
}
