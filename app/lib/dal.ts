/*
** EPITECH PROJECT, 2024
** dal.ts
** File description:
** Data Access Layer to verify the token's presence
*/

import 'server-only'
import { cookies } from 'next/headers'
import jose, { jwtVerify } from 'jose'

export const verifyToken = async () => {
    const token = cookies().get('token')?.value

    if (!token) {
        return null
    }
    if (process.env.ENCRYPT_KEY) {
        try {
            const access_token = (await jwtVerify(token, new TextEncoder().encode(process.env.ENCRYPT_KEY))).payload.token
            return access_token as string
        } catch(err) {
            return null
        }
    }
    return null
}
