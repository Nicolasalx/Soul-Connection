import Employees from "../back/models/employees";
import { verifyToken } from "./dal";
import { getEmployees } from "./dbhelper/employees";

export async function isManager() {
    const employeeInfos = await verifyToken()
    return employeeInfos ? (employeeInfos.infos as Employees).work !== 'Coach' : false
}

export async function getSelfId()
{
    const employeeInfos = await verifyToken()
    return employeeInfos ? (employeeInfos.infos as Employees).id : 0
}

export async function getEmployee(email: string) {
    return (await getEmployees()).find(e => e.email === email)
}
