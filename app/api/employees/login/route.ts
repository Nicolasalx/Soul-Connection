import { cookies } from "next/headers"
import * as crypto from 'crypto'

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json()
        const api_token = process.env.API_TOKEN
        if (!api_token) {
            console.error("Missing API token.")
            return Response.json({ error: 'Unauthorized' }, { status: 401 })
        }
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
            const expiresAt = new Date(Date.now())
            expiresAt.setHours(expiresAt.getHours() + 24)   // wait 24 hours before token expiration in cookies
            let {access_token} = await result.json()
            if (process.env.encryptKey && process.env.iv) {
                const tmp = crypto.createCipheriv('aes-256-gcm', process.env.encryptKey, process.env.iv)
                access_token = tmp.update(access_token, "utf8", "base64")
                access_token += tmp.final("base64")
            }
            cookies().set('token', access_token, {
                httpOnly: true,
                secure: true,
                expires: expiresAt,
                path: '/',
            })
        }
        return Response.json(result.statusText, { status: result.status })
    } catch(error) {
        return Response.json({ error: error }, { status: 500 })
    }
}
