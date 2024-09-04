import Customers from "@/app/back/models/customers";

export async function getCustomers(): Promise<Customers[]>
{
  const response = await fetch('http://localhost:3000/api/back/customers', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch customers');
  }

  return await response.json();
}

export async function createCustomer(customer: Customers): Promise<Customers>
{
  const response = await fetch('http://localhost:3000/api/back/customers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(customer),
  });

  if (!response.ok) {
    throw new Error('Failed to create customer');
  }

  return await response.json();
}

export async function updateCustomer(_id: string, customer: Partial<Customers>): Promise<void>
{
  const response = await fetch('http://localhost:3000/api/back/customers', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ _id, ...customer }),
  });

  const responseData = await response.json();

  if (!response.ok) {
    console.error('API response:', responseData);
    throw new Error('Failed to update customer');
  }
}

export async function deleteCustomer(_id: string): Promise<void>
{
  const response = await fetch(`${'http://localhost:3000/api/back/customers'}?deleteId=${_id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to delete customer');
  }
}
