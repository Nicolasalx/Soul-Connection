/*
** EPITECH PROJECT, 2024
** connection.ts
** File description:
** connection related functions
*/

import { verifyToken } from './dal'
import { deleteToken } from './token'

export async function logout() {
    deleteToken()
}

export async function isConnected() {
    const token = await verifyToken()

    return token ? true : false
}
