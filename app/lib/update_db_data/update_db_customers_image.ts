import { getCustomers } from "../dbhelper/customers";
import { createCustomersImage, deleteCustomersImage, getCustomersImage } from "../dbhelper/customers_image";

export async function delete_db_customers_image()
{
    try {
        const all_customers = await getCustomers();

        for (const customer of all_customers) {
            await deleteCustomersImage(customer.id.toString());
        }
    } catch (error) {
      console.error('Error deleting all images:', error);
    }
    alert("Customers Image Deleted !");
}

export async function update_db_customers_image()
{
    try {
        const all_customers = await getCustomers();

        for (const customer of all_customers) {
            if (!await getCustomersImage(customer.id.toString())) {
                try {
                
                    const imageResponse = await fetch(`/api/customers/${customer.id.toString()}/image`);
                    if (!imageResponse.ok) {
                      throw new Error('Failed to fetch image');
                    }
                    const imageBlob = await imageResponse.blob();
                    createCustomersImage(customer.id.toString(), imageBlob);
                } catch {}
            }
        }
    } catch (error) {
        console.error('Error fetching or updating customer_image:', error);
    }
    alert("customers Image Updated !");
}
