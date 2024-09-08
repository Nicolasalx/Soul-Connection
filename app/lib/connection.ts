import { deleteToken } from './token'

export async function logout() {
    deleteToken()
}

export async function isConnected() {
    try {
        const result = await fetch('/api/employees/status', { method: 'GET' })

        if (result.ok) {
            return true
        }
    } catch(err) {
        console.error(err);
    }
    return false
}
