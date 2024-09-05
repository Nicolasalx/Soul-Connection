import Events from "@/app/back/models/events";
import { sc_db_api } from "./db_api_instance";

export async function getEvents(): Promise<Events[]> {
  try {
    const response = await sc_db_api.get('/events');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch events');
  }
}

export async function createEvent(event: Events): Promise<Events> {
  try {
    const response = await sc_db_api.post('/events', event);
    return response.data;
  } catch (error) {
    throw new Error('Failed to create event');
  }
}

export async function updateEvent(_id: string, event: Partial<Events>): Promise<void> {
  try {
    const response = await sc_db_api.put('/events', { _id, ...event });
    if (response.status !== 200) {
      throw new Error('Failed to update event');
    }
  } catch (error) {
    throw new Error('Failed to update event');
  }
}

export async function deleteEvent(_id: string): Promise<void> {
  try {
    const response = await sc_db_api.delete('/events', {
      params: { deleteId: _id }
    });
    if (response.status !== 200) {
      throw new Error('Failed to delete event');
    }
  } catch (error) {
    throw new Error('Failed to delete event');
  }
}
