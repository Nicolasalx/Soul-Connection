import Employees from '../back/models/employees';
import { updateEmployee } from './dbhelper/employees';
import { deleteToken, saveToken } from './token'
import { getEmployee } from './user';
import bcrypt from 'bcryptjs'

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

export async function connectEmployee(employee: Employees, access_token: string, password: string) {
    let partialEmployee: Partial<Employees> = {
        last_connection: new Date()
    }
    if (!employee.password) {
        partialEmployee.password = await bcrypt.hash(password as string, 10)
    }
    await updateEmployee(employee._id!.toString(), partialEmployee)
    employee.last_connection = partialEmployee.last_connection as Date
    employee.password = null
    await saveToken(employee, access_token)
}

export async function checkDBForEmployee(email: string, password: string) {
    const employee = await getEmployee(email)

    if (!employee || !employee._id || !employee.password || !bcrypt.compareSync(password, employee.password as string)) {
        return false
    }
    await connectEmployee(employee, '', password)
    return true
}
