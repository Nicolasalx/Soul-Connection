import Tips from "@/app/back/models/tips";

export async function getTips(): Promise<Tips[]>
{
  const response = await fetch('http://localhost:3000/api/back/tips', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch tips');
  }

  return await response.json();
}

export async function createTip(tip: Tips): Promise<Tips>
{
  const response = await fetch('http://localhost:3000/api/back/tips', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(tip),
  });

  if (!response.ok) {
    throw new Error('Failed to create tip');
  }

  return await response.json();
}

export async function updateTip(_id: string, tip: Partial<Tips>): Promise<void>
{
  const response = await fetch('http://localhost:3000/api/back/tips', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ _id, ...tip }),
  });

  const responseData = await response.json();

  if (!response.ok) {
    console.error('API response:', responseData);
    throw new Error('Failed to update tip');
  }
}

export async function deleteTip(_id: string): Promise<void>
{
  const response = await fetch(`${'http://localhost:3000/api/back/tips'}?deleteId=${_id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to delete tip');
  }
}
