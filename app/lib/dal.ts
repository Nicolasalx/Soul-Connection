/*
** EPITECH PROJECT, 2024
** dal.ts
** File description:
** Data Access Layer to verify the token's presence
*/

import 'server-only'
import { cookies } from 'next/headers'
import { cache } from 'react'

export const verifyToken = cache(async () => {
    const token = cookies().get('token')?.value

    if (!token) {
        return null
    }
    return token
})
