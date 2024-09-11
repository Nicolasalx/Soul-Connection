import Advices from "@/app/back/models/advices";

export async function getAdvice(id: string): Promise<any | null>
{
  try {
    const response = await fetch(`/api/back/advices?id=${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch advices');
    }
    const advicesData = await response.json();

    if (!advicesData || !advicesData.advices) {
      throw new Error('Advices data is missing');
    }
    return await advicesData.advices;
  } catch (error) {
    return null;
  }
}

export async function createAdvice(id: string, advices: Advices[]): Promise<void>
{
  try {
    const response = await fetch('/api/back/advices', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
        advices: advices,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to upload advices');
    }

  } catch (error) {
    console.error('Error creating advices:', error);
  }
}

export async function updateAdvice(id: string, advices: Advices[]): Promise<void> {
  try {
    const response = await fetch('/api/back/advices', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
        advices: advices,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to update advices');
    }

  } catch (error) {
    console.error('Error updating advices:', error);
  }
}

export async function deleteAdvice(id: string): Promise<void> {
  try {
    const response = await fetch(`/api/back/advices?id=${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to delete advices');
    }

  } catch (error) {
    console.error('Error deleting advices:', error);
  }
}
