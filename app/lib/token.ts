/*
** EPITECH PROJECT, 2024
** token.ts
** File description:
** token related functions
*/

import 'server-only'
import { cookies } from "next/headers";

export function deleteToken() {
    cookies().delete('token')
}
