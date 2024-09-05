import Tips from "@/app/back/models/tips";
import { sc_db_api } from "./db_api_instance";

export async function getTips(): Promise<Tips[]> {
  try {
    const response = await sc_db_api.get('/tips');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch tips');
  }
}

export async function createTip(tip: Tips): Promise<Tips> {
  try {
    const response = await sc_db_api.post('/tips', tip);
    return response.data;
  } catch (error) {
    throw new Error('Failed to create tip');
  }
}

export async function updateTip(_id: string, tip: Partial<Tips>): Promise<void> {
  try {
    const response = await sc_db_api.put('/tips', { _id, ...tip });
    if (response.status !== 200) {
      throw new Error('Failed to update tip');
    }
  } catch (error) {
    throw new Error('Failed to update tip');
  }
}

export async function deleteTip(_id: string): Promise<void> {
  try {
    const response = await sc_db_api.delete('/tips', {
      params: { deleteId: _id }
    });
    if (response.status !== 200) {
      throw new Error('Failed to delete tip');
    }
  } catch (error) {
    throw new Error('Failed to delete tip');
  }
}
