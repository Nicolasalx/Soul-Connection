/*
** EPITECH PROJECT, 2024
** dal.ts
** File description:
** Data Access Layer to verify the token's presence
*/

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { cache } from 'react'
import 'server-only'

export const verifyToken = cache(async () => {
    const token = cookies().get('token')?.value

    if (!token) {
        redirect('/login')
    }
    return token
})
