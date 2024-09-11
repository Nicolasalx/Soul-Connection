import { getCustomers } from "@/app/lib/dbhelper/customers";

export async function GET(req: Request, { params }: { params: { id: number } }) {
    const { id } = params
    try {
        const customer = (await getCustomers()).find(c => c.id == id)

        if (!customer) {
            return Response.json({ message: 'Customer not found' }, { status: 404 });
        }
        return Response.json(customer, { status: 200 });
    } catch (error) {
        console.error('Error fetching customers:', error);
        return Response.json({ message: 'Internal server error' }, { status: 500 });
    }
}
