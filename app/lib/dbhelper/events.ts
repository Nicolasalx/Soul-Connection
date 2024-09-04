import Events from "@/app/back/models/events";

export async function getEvents(): Promise<Events[]>
{
  const response = await fetch('http://localhost:3000/api/back/events', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch events');
  }

  return await response.json();
}

export async function createEvent(event: Events): Promise<Events>
{
  const response = await fetch('http://localhost:3000/api/back/events', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(event),
  });

  if (!response.ok) {
    throw new Error('Failed to create event');
  }

  return await response.json();
}

export async function updateEvent(_id: string, event: Partial<Events>): Promise<void>
{
  const response = await fetch('http://localhost:3000/api/back/events', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ _id, ...event }),
  });

  const responseData = await response.json();

  if (!response.ok) {
    console.error('API response:', responseData);
    throw new Error('Failed to update event');
  }
}

export async function deleteEvent(_id: string): Promise<void>
{
  const response = await fetch(`${'http://localhost:3000/api/back/events'}?deleteId=${_id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to delete event');
  }
}
