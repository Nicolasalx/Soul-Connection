import Customers from "@/app/back/models/customers";
import { createCustomer, deleteCustomer, getCustomers, updateCustomer } from "../dbhelper/customers";

export async function delete_db_customers()
{
    const existingCustomers = await getCustomers();

    for (const customer of existingCustomers) {
        if (customer._id) {
            console.log(customer);
            deleteCustomer(customer._id.toString());
        }
    }
}

export async function update_db_customers()
{
    try {
        const res = await fetch('/api/customers', { method: 'GET' });
        const data: Partial<Customers>[] = await res.json();
        
        const existingCustomers = await getCustomers();
        const existingCustomerMap = new Map(existingCustomers.map(cust => [cust.email, cust]));
        
        const fetchFullDataPromises = data.map(async (customer) => {
            const fullRes = await fetch(`/api/customers/${customer.id}`, { method: 'GET' });
            return await fullRes.json();
        });
        
        const fullCustomers = await Promise.all(fetchFullDataPromises);
        
        for (const fullData of fullCustomers) {
            try {
                const fullCustomer = new Customers(
                    fullData.id,
                    fullData.email,
                    fullData.name,
                    fullData.surname,
                    fullData.birth_date,
                    fullData.gender,
                    fullData.description,
                    fullData.astrological_sign,
                    fullData.phone_number,
                    fullData.address,
                    fullData.coach_id
                );

                const existingCustomer = existingCustomerMap.get(fullCustomer.email);

                if (existingCustomer) {
                    if (existingCustomer._id) {
                        const needsUpdate =

                        existingCustomer.email !== fullCustomer.email ||
                        existingCustomer.name !== fullCustomer.name ||
                        existingCustomer.surname !== fullCustomer.surname ||
                        existingCustomer.birth_date !== fullCustomer.birth_date ||
                        existingCustomer.gender !== fullCustomer.gender ||
                        existingCustomer.description !== fullCustomer.description ||
                        existingCustomer.astrological_sign !== fullCustomer.astrological_sign ||
                        existingCustomer.phone_number !== fullCustomer.phone_number ||
                        existingCustomer.address !== fullCustomer.address ||
                        existingCustomer.coach_id !== fullCustomer.coach_id;

                        if (needsUpdate) {
                            await updateCustomer(existingCustomer._id.toString(), fullCustomer);
                        }
                    }
                } else {
                    await createCustomer(fullCustomer);
                }
            } catch (error) {
                console.error(`Error processing customer ${fullData.id}:`, error);
            }
        }
    } catch (error) {
        console.error('Error fetching or updating customers:', error);
    }
}
