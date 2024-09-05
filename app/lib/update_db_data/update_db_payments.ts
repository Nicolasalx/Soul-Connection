import Payments from "@/app/back/models/payments";
import { createPayment, deletePayment, getPayments, updatePayment } from "../dbhelper/payments";
import { getCustomers } from "../dbhelper/customers";

export async function delete_db_payments()
{
    const existingPayments = await getPayments();

    for (const payment of existingPayments) {
        if (payment._id) {
            deletePayment(payment._id.toString());
        }
    }
}

export async function update_db_payments()
{
    try {
        const customer = await getCustomers();
        let fullPayments: Payments[] = [];

        for (const currentCustomer of customer) {
            fullPayments = fullPayments.concat(await (await fetch(`/api/customers/${currentCustomer.id}/payments_history`, { method: 'GET' })).json());
        }

        const existingPayments = await getPayments();
        const existingPaymentMap = new Map(existingPayments.map(emp => [emp.id, emp]));

        for (const current of fullPayments) {
            try {
                const existingPayment = existingPaymentMap.get(current.id);

                if (existingPayment) {
                    if (existingPayment._id) {
                        const needsUpdate =
                        existingPayment.date !== current.date ||
                        existingPayment.payment_method !== current.payment_method ||
                        existingPayment.amount !== current.amount ||
                        existingPayment.comment !== current.comment ||
                        existingPayment.customer_id !== current.customer_id;

                        if (needsUpdate) {
                            await updatePayment(existingPayment._id.toString(), current);
                        }
                    }
                } else {
                    await createPayment(current);
                }
            } catch (error) {
                console.error(`Error processing payment ${current.id}:`, error);
            }
        }
    } catch (error) {
        console.error('Error fetching or updating payments:', error);
    }
}
