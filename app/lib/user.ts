/*
** EPITECH PROJECT, 2024
** user.ts
** File description:
** connected user related functions
*/

export async function isManager() {
    const result = await fetch('/api/employees/me', { method: 'GET' })
    const { work } = await result.json()
    if (work === 'Coach') {
        return false
    }
    return true
}
