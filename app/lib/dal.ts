/*
** EPITECH PROJECT, 2024
** dal.ts
** File description:
** Data Access Layer to verify the token's presence
*/

import 'server-only'
import { cookies } from 'next/headers'

export async function isTokenValid(token: string) : Promise<boolean> {
    const api_token = process.env.API_TOKEN
    if (!api_token) {
        console.error("Missing API token.")
        return false
    }
    try {
        const res = await fetch('https://soul-connection.fr/api/employees/me', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-Group-Authorization': api_token,
                'Authorization': `Bearer ${token}`
            }
        })
        return res.ok
    } catch(err) {
        console.error(err)
        return false
    }
}

export const verifyToken = async () => {
    const token = cookies().get('token')?.value

    if (!token) {
        return null
    }
    if (await isTokenValid(token)) {
        return token
    }
    return null
}
