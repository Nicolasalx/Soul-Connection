import Msg from "@/app/back/models/conv";

export async function getConv(id: string): Promise<any | null>
{
  try {
    const response = await fetch(`/api/back/chat?id=${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch conv');
    }
    const convData = await response.json();
    
    if (!convData || !convData.conv) {
      throw new Error('Image data is missing');
    }
    return await convData.conv;
  } catch (error) {
    console.error('Error fetching conv:', error);
    return null;
  }
}

export async function createConv(id: string, conv: Msg[]): Promise<void>
{
  try {
    const response = await fetch('/api/back/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
        conv: conv,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to upload conv');
    }

  } catch (error) {
    console.error('Error creating conv:', error);
  }
}

export async function updateConv(id: string, conv: Msg[]): Promise<void> {
  try {
    const response = await fetch('/api/back/chat', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
        conv: conv,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to update conv');
    }

  } catch (error) {
    console.error('Error updating conv:', error);
  }
}

export async function deleteConv(id: string): Promise<void> {
  try {
    const response = await fetch(`/api/back/chat?id=${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to delete conv');
    }

  } catch (error) {
    console.error('Error deleting conv:', error);
  }
}
