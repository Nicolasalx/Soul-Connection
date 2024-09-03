import Payments from "@/app/back/models/payments";

export async function getPayments(): Promise<Payments[]>
{
  const response = await fetch('http://localhost:3000/api/back/payments', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch payments');
  }

  return await response.json();
}

export async function createPayment(payment: Payments): Promise<Payments>
{
  const response = await fetch('http://localhost:3000/api/back/payments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payment),
  });

  if (!response.ok) {
    throw new Error('Failed to create payment');
  }

  return await response.json();
}

export async function updatePayment(_id: string, payment: Partial<Payments>): Promise<void>
{
  const response = await fetch('http://localhost:3000/api/back/payments', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ _id, ...payment }),
  });

  const responseData = await response.json();

  if (!response.ok) {
    console.error('API response:', responseData);
    throw new Error('Failed to update payment');
  }
}

export async function deletePayment(_id: string): Promise<void>
{
  const response = await fetch(`${'http://localhost:3000/api/back/payments'}?deleteId=${_id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to delete payment');
  }
}
