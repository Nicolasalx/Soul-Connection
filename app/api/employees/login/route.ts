import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json()
        const result = await fetch('https://soul-connection.fr/api/employees/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Group-Authorization': process.env.API_TOKEN,
            },
            body: JSON.stringify({
                "email": email,
                "password": password
            })
        })
        if (result.ok) {
            const expiresAt = new Date(Date.now())
            expiresAt.setHours(expiresAt.getHours() + 24)   // wait 24 hours before token expiration in cookies
            const {access_token} = await result.json()
            cookies().set('token', access_token, {
                httpOnly: true,
                secure: true,
                expires: expiresAt,
                path: '/',
            })
            return NextResponse.redirect(new URL('/dashboard', req.url), { status: 307 })
        }
        return NextResponse.json(result.statusText, { status: result.status })
    } catch(error) {
        return NextResponse.json({ error: 'Unknown error.' }, { status: 500 })
    }
}
