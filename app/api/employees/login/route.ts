import { cookies } from "next/headers"
import { SignJWT } from 'jose'

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
            const { access_token } = await result.json()
            let token: string = ''

            if (process.env.ENCRYPT_KEY) {
                console.log("ok")
                token = await new SignJWT({ token: access_token })
                    .setProtectedHeader({alg: 'HS256', typ: 'JWT'})
                    .setIssuedAt()
                    .setExpirationTime('24 hours')
                    .sign(new TextEncoder().encode(process.env.ENCRYPT_KEY));
                console.log("okkk")
            }
            cookies().set('token', token, {
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
