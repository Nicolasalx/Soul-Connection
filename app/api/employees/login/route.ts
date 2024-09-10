import { getEmployee } from "@/app/lib/user"
import { saveToken } from "@/app/lib/token"
import { updateEmployee } from "@/app/lib/dbhelper/employees"
import Employees from "@/app/back/models/employees"
import bcrypt from 'bcryptjs'
import { checkDBForEmployee, connectEmployee } from "@/app/lib/connection"

export async function POST(req: Request) {
    const { email, password } = await req.json()

    if (await checkDBForEmployee(email as string, password as string)) {
        return Response.json('OK', { status: 200 })
    }
    const api_token = process.env.API_TOKEN
    if (!api_token) {
        console.error("Missing API token.")
        return Response.json({ error: 'Unauthorized' }, { status: 401 })
    }
    try {
        const result = await fetch('https://soul-connection.fr/api/employees/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Group-Authorization': api_token,
            },
            body: JSON.stringify({
                "email": email,
                "password": password
            })
        })
        if (result.ok) {
            const { access_token } = await result.json()
            let employee = await getEmployee(email)

            if (employee && employee._id) {
                await connectEmployee(employee, access_token as string, password as string)
            } else {
                return Response.json({ error: 'Unauthorized' }, { status: 401 })
            }
        }
        return Response.json(result.statusText, { status: result.status })
    } catch(error) {
        console.log(error)
        return Response.json({ error: error }, { status: 500 })
    }
}
