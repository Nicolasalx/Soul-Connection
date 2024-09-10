import Employees from '@/app/back/models/employees';
import { sc_db_api } from "./db_api_instance";

export async function getEmployees(): Promise<Employees[]> {
  try {
    const response = await sc_db_api.get('/employees');
    // console.log('getEmployees Response:', response.data);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch employees');
  }
}

export async function createEmployee(employee: Employees): Promise<Employees> {
  try {
    const response = await sc_db_api.post('/employees', employee);
    return response.data;
  } catch (error) {
    throw new Error('Failed to create employee');
  }
}

export async function updateEmployee(_id: string, employee: Partial<Employees>): Promise<void> {
  try {
    const response = await sc_db_api.put('/employees', { _id, ...employee });
    if (response.status !== 200) {
      throw new Error('Failed to update employee');
    }
  } catch (error) {
    throw new Error('Failed to update employee');
  }
}

export async function deleteEmployee(_id: string): Promise<void> {
  try {
    const response = await sc_db_api.delete('/employees', {
      params: { deleteId: _id }
    });
    if (response.status !== 200) {
      throw new Error('Failed to delete employee');
    }
  } catch (error) {
    throw new Error('Failed to delete employee');
  }
}

export async function getCoachs(): Promise<Employees[]>
{
  const employees = await getEmployees();

  return employees.filter(employee => employee.work == 'Coach');
}
