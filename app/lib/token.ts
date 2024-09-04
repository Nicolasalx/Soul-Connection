/*
** EPITECH PROJECT, 2024
** token.ts
** File description:
** token related functions
*/

'use server'
import { cookies } from "next/headers";

export async function deleteToken() {
    cookies().delete('token')
}
