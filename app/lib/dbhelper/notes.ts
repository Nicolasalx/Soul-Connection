import Advices from "@/app/back/models/advices";

export async function getNote(id: string): Promise<any | null>
{
  try {
    const response = await fetch(`/api/back/notes?id=${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch notes');
    }
    const notesData = await response.json();

    if (!notesData || !notesData.notes) {
      throw new Error('Advices data is missing');
    }
    return await notesData.notes;
  } catch (error) {
    return null;
  }
}

export async function createNote(id: string, notes: Advices[]): Promise<void>
{
  try {
    const response = await fetch('/api/back/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
        notes: notes,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to upload notes');
    }

  } catch (error) {
    console.error('Error creating notes:', error);
  }
}

export async function updateNote(id: string, notes: Advices[]): Promise<void> {
  try {
    const response = await fetch('/api/back/notes', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
        notes: notes,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to update notes');
    }

  } catch (error) {
    console.error('Error updating notes:', error);
  }
}

export async function deleteNote(id: string): Promise<void> {
  try {
    const response = await fetch(`/api/back/notes?id=${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to delete notes');
    }

  } catch (error) {
    console.error('Error deleting notes:', error);
  }
}
