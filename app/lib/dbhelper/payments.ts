import Payments from "@/app/back/models/payments";
import { sc_db_api } from "./db_api_instance";

export async function getPayments(): Promise<Payments[]> {
  try {
    const response = await sc_db_api.get('/payments');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch payments');
  }
}

export async function createPayment(payment: Payments): Promise<Payments> {
  try {
    const response = await sc_db_api.post('/payments', payment);
    return response.data;
  } catch (error) {
    throw new Error('Failed to create payment');
  }
}

export async function updatePayment(_id: string, payment: Partial<Payments>): Promise<void> {
  try {
    const response = await sc_db_api.put('/payments', { _id, ...payment });
    if (response.status !== 200) {
      throw new Error('Failed to update payment');
    }
  } catch (error) {
    throw new Error('Failed to update payment');
  }
}

export async function deletePayment(_id: string): Promise<void> {
  try {
    const response = await sc_db_api.delete('/payments', {
      params: { deleteId: _id }
    });
    if (response.status !== 200) {
      throw new Error('Failed to delete payment');
    }
  } catch (error) {
    throw new Error('Failed to delete payment');
  }
}
