'use server'
import { jwtVerify } from 'jose'
import { cookies } from 'next/headers'

export const verifyToken = async () => {
    const token = cookies().get('token')?.value

    if (!token) {
        return null
    }
    if (process.env.ENCRYPT_KEY) {
        try {
            const payload = (await jwtVerify(token, new TextEncoder().encode(process.env.ENCRYPT_KEY))).payload
            return payload
        } catch(err) {
            return null
        }
    }
    return null
}
