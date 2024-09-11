import Customers from "@/app/back/models/customers";
import Encounters from "@/app/back/models/encounters";
import { getEncounters } from "./encounters";
import Payments from "@/app/back/models/payments";
import { getPayments } from "./payments";
import { ObjectId } from "mongodb";
import { sc_db_api } from "./db_api_instance";

export async function getCustomers(): Promise<Customers[]> {
  try {
    const response = await sc_db_api.get('/customers');
    console.log('getCustomers response', response.data)
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch customers');
  }
}

export async function createCustomer(customer: Customers): Promise<Customers> {
  try {
    const response = await sc_db_api.post('/customers', customer);
    return response.data;
  } catch (error) {
    throw new Error('Failed to create customer');
  }
}

export async function updateCustomer(_id: string, customer: Partial<Customers>): Promise<void> {
  try {
    const response = await sc_db_api.put('/customers', { _id, ...customer });
    if (response.status !== 200) {
      throw new Error('Failed to update customer');
    }
  } catch (error) {
    throw new Error('Failed to update customer');
  }
}

export async function deleteCustomer(_id: string): Promise<void> {
  try {
    const response = await sc_db_api.delete('/customers', {
      params: { deleteId: _id }
    });
    if (response.status !== 200) {
      throw new Error('Failed to delete customer');
    }
  } catch (error) {
    throw new Error('Failed to delete customer');
  }
}

export async function getCoachCustomers(coach_id: number): Promise<Customers[]>
{
  const customers = await getCustomers();

  return customers.filter(customer => customer.coach_id == coach_id);
}

export async function getCustomerEncounters(customer_id: number): Promise<Encounters[]>
{
  const encounters = await getEncounters();

  return encounters.filter(encounter => encounter.customer_id == customer_id);
}

export async function getCustomerPayments(customer_id: number): Promise<Payments[]>
{
  const payments = await getPayments();

  return payments.filter(payment => payment.customer_id == customer_id);
}

export async function assignCoachToCustomer(coach_id: number, customer_mongo_id: ObjectId): Promise<void>
{
  const newCustomerData: Partial<Customers> = {
    coach_id: coach_id,
  };

  await updateCustomer(customer_mongo_id.toString(), newCustomerData);
}

export async function unassignCoachToCustomer(customer_mongo_id: ObjectId): Promise<void>
{
  const newCustomerData: Partial<Customers> = {
    coach_id: 0,
  };

  await updateCustomer(customer_mongo_id.toString(), newCustomerData);
}
