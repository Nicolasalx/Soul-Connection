import Encounters from "@/app/back/models/encounters";

export async function getEncounters(): Promise<Encounters[]>
{
  const response = await fetch('http://localhost:3000/api/back/encounters', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch encounters');
  }

  return await response.json();
}

export async function createEncounter(encounter: Encounters): Promise<Encounters>
{
  const response = await fetch('http://localhost:3000/api/back/encounters', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(encounter),
  });

  if (!response.ok) {
    throw new Error('Failed to create encounter');
  }

  return await response.json();
}

export async function updateEncounter(_id: string, encounter: Partial<Encounters>): Promise<void>
{
  const response = await fetch('http://localhost:3000/api/back/encounters', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ _id, ...encounter }),
  });

  const responseData = await response.json();

  if (!response.ok) {
    console.error('API response:', responseData);
    throw new Error('Failed to update encounter');
  }
}

export async function deleteEncounter(_id: string): Promise<void>
{
  const response = await fetch(`${'http://localhost:3000/api/back/encounters'}?deleteId=${_id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to delete encounter');
  }
}
