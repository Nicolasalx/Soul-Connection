import Employees from "@/app/back/models/employees";
import { createEmployee, deleteEmployee, getEmployees, updateEmployee } from "../dbhelper/employees";

export async function delete_db_employees()
{
    const existingEmployees = await getEmployees();

    for (const employee of existingEmployees) {
        if (employee._id) {
            deleteEmployee(employee._id.toString());
        }
    }
}

export async function update_db_employees()
{
    try {
        const res = await fetch('/api/employees', { method: 'GET' });
        const data: Partial<Employees>[] = await res.json();
        
        const existingEmployees = await getEmployees();
        const existingEmployeeMap = new Map(existingEmployees.map(emp => [emp.email, emp]));
        
        const fetchFullDataPromises = data.map(async (employee) => {
            const fullRes = await fetch(`/api/employees/${employee.id}`, { method: 'GET' });
            return await fullRes.json();
        });
        
        const fullEmployees = await Promise.all(fetchFullDataPromises);
        
        for (const fullData of fullEmployees) {
            try {
                const fullEmployee = new Employees(
                    fullData.id,
                    fullData.email,
                    null,
                    fullData.name,
                    fullData.surname,
                    fullData.birth_date,
                    fullData.gender,
                    fullData.work
                );

                const existingEmployee = existingEmployeeMap.get(fullEmployee.email);

                if (existingEmployee) {
                    if (existingEmployee._id) {
                        const needsUpdate =
                        existingEmployee.name !== fullEmployee.name ||
                        existingEmployee.surname !== fullEmployee.surname ||
                        existingEmployee.birth_date !== fullEmployee.birth_date ||
                        existingEmployee.gender !== fullEmployee.gender ||
                        existingEmployee.work !== fullEmployee.work;
                        
                        if (needsUpdate) {
                            await updateEmployee(existingEmployee._id.toString(), fullEmployee);
                        }
                    }
                } else {
                    await createEmployee(fullEmployee);
                }
            } catch (error) {
                console.error(`Error processing employee ${fullData.id}:`, error);
            }
        }
    } catch (error) {
        console.error('Error fetching or updating employees:', error);
    }
}
