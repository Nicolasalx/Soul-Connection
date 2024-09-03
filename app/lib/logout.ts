/*
** EPITECH PROJECT, 2024
** logout.ts
** File description:
** delete token cookie
*/

import { redirect } from 'next/navigation'
import { deleteToken } from './token'

export async function logout() {
    deleteToken()
    redirect('/login')
}
