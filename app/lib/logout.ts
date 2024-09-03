/*
** EPITECH PROJECT, 2024
** logout.ts
** File description:
** delete token cookie
*/

import 'server-only'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function logout() {
    cookies().delete('token')
    redirect('/login')
}
