import Employees from "../back/models/employees";
import { verifyToken } from "./dal";

export async function isManager() {
    const employeeInfos = await verifyToken()
    return employeeInfos ? (employeeInfos.infos as Employees).work !== 'Coach' : false
}

export async function getSelfId()
{
    const employeeInfos = await verifyToken()
    return employeeInfos ? (employeeInfos.infos as Employees).id : 0
}

export async function getEmployeeInfos(access_token: string) {
    try {
        const api_token = process.env.API_TOKEN
        if (!api_token) {
            console.error("Missing API token.")
            return null
        }
        const result = await fetch('https://soul-connection.fr/api/employees/me', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-Group-Authorization': api_token,
                'Authorization': `Bearer ${access_token}`,
            },
        })
        if (!result.ok) {
            return null
        }
        const infos = await result.json() as Employees
        return infos
    } catch(err) {
        console.error(err)
        return null
    }
}
