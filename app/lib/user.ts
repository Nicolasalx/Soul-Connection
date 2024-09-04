/*
** EPITECH PROJECT, 2024
** user.ts
** File description:
** connected user related functions
*/

export async function isManager() {
    try {
        const result = await fetch('/api/employees/me', { method: 'GET' })
        const { work } = await result.json()
        if (work === 'Manager') {
            return true
        }
        return false
    } catch(err) {
        console.error(err);
        return false
    }
}
