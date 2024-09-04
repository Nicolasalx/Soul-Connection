import Employees from '@/app/back/models/employees';

export async function getEmployees(): Promise<Employees[]>
{
  const response = await fetch('http://localhost:3000/api/back/employees', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch employees');
  }

  return await response.json();
}

export async function createEmployee(employee: Employees): Promise<Employees>
{
  const response = await fetch('http://localhost:3000/api/back/employees', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(employee),
  });

  if (!response.ok) {
    throw new Error('Failed to create employee');
  }

  return await response.json();
}

export async function updateEmployee(_id: string, employee: Partial<Employees>): Promise<void>
{
  const response = await fetch('http://localhost:3000/api/back/employees', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ _id, ...employee }),
  });

  const responseData = await response.json();

  if (!response.ok) {
    console.error('API response:', responseData);
    throw new Error('Failed to update employee');
  }
}

export async function deleteEmployee(_id: string): Promise<void>
{
  const response = await fetch(`${'http://localhost:3000/api/back/employees'}?deleteId=${_id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to delete employee');
  }
}

export async function getCoachs(): Promise<Employees[]>
{
  const employees = await getEmployees();

  return employees.filter(employee => employee.work == 'coach');
}
