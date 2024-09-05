import Customers from "@/app/back/models/customers";
import Encounters from "@/app/back/models/encounters";
import { getEncounters } from "./encounters";
import Payments from "@/app/back/models/payments";
import { getPayments } from "./payments";
import { ObjectId } from "mongodb";

export async function getCustomers(): Promise<Customers[]>
{
  const response = await fetch('http://localhost:3000/api/back/customers', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch customers');
  }

  return await response.json();
}

export async function createCustomer(customer: Customers): Promise<Customers>
{
  const response = await fetch('http://localhost:3000/api/back/customers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(customer),
  });

  if (!response.ok) {
    throw new Error('Failed to create customer');
  }

  return await response.json();
}

export async function updateCustomer(_id: string, customer: Partial<Customers>): Promise<void>
{
  const response = await fetch('http://localhost:3000/api/back/customers', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ _id, ...customer }),
  });

  const responseData = await response.json();

  if (!response.ok) {
    console.error('API response:', responseData);
    throw new Error('Failed to update customer');
  }
}

export async function deleteCustomer(_id: string): Promise<void>
{
  const response = await fetch(`${'http://localhost:3000/api/back/customers'}?deleteId=${_id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
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
