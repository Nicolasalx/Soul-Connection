import Encounters from "@/app/back/models/encounters";
import { sc_db_api } from "./db_api_instance";

export async function getEncounters(): Promise<Encounters[]> {
  try {
    const response = await sc_db_api.get('/encounters');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch encounters');
  }
}

export async function createEncounter(encounter: Encounters): Promise<Encounters> {
  try {
    const response = await sc_db_api.post('/encounters', encounter);
    return response.data;
  } catch (error) {
    throw new Error('Failed to create encounter');
  }
}

export async function updateEncounter(_id: string, encounter: Partial<Encounters>): Promise<void> {
  try {
    const response = await sc_db_api.put('/encounters', { _id, ...encounter });
    if (response.status !== 200) {
      throw new Error('Failed to update encounter');
    }
  } catch (error) {
    throw new Error('Failed to update encounter');
  }
}

export async function deleteEncounter(_id: string): Promise<void> {
  try {
    const response = await sc_db_api.delete('/encounters', {
      params: { deleteId: _id }
    });
    if (response.status !== 200) {
      throw new Error('Failed to delete encounter');
    }
  } catch (error) {
    throw new Error('Failed to delete encounter');
  }
}
