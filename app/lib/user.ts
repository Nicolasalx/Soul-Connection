export async function isManagerMiddleware() {
    try {
        const result = await fetch('http://localhost:3000/api/employees/me', { method: 'GET' })
        if (!result.ok) {
            return false;
        }
        const { work } = await result.json()
        if (work !== 'Coach') {
            return true
        }
        return false
    } catch(err) {
        console.error(err);
        return false
    }
}

export async function isManager() {
    try {
        const result = await fetch('/api/employees/me', { method: 'GET' })
        if (!result.ok) {
            return false;
        }
        const { work } = await result.json()
        if (work !== 'Coach') {
            return true
        }
        return false
    } catch(err) {
        console.error(err);
        return false
    }
}

export async function getSelfId()
{
    try {
        const result = await fetch('/api/employees/me', { method: 'GET' })
        if (!result.ok) {
            return 0;
        }
        const { id } = await result.json()
        return id;
    } catch(err) {
        console.error(err)
        return 0;
    }
}
