import Customers from "../back/models/customers";
import Employees from "../back/models/employees";
import { verifyToken } from "./dal";
import { getCustomers } from "./dbhelper/customers";
import { getEmployees } from "./dbhelper/employees";

export async function isManager() {
    const employeeInfos = await verifyToken()
    if (employeeInfos && employeeInfos.role !== 'employee') {
        return false
    }
    return employeeInfos ? (employeeInfos.infos as Employees).work !== 'Coach' : false
}

export async function isEmployee() {
    const infos = await verifyToken()
    return infos?.role === 'employee'
}

export async function isCustomer() {
    const infos = await verifyToken()
    return infos?.role === 'customer'
}

export async function getSelfIdCustomer() {
    const infos = await verifyToken()
    if (!infos || infos.role !== 'customer') {
        return -1
    }
    return (infos.infos as Customers).id
}

export async function getSelfId()
{
    const employeeInfos = await verifyToken()
    return employeeInfos ? (employeeInfos.infos as Employees).id : 0
}

export async function getEmployee(email: string) {
    return (await getEmployees()).find(e => e.email === email)
}

export async function getCustomer(email: string) {
    return (await getCustomers()).find(e => e.email === email)
}
