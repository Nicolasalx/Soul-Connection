import { createClothesImage, deleteClothesImage, getClothesImage } from "../dbhelper/clothes_image";
import { getCustomers } from "../dbhelper/customers";

export async function delete_db_clothes_image()
{
    try {
        const all_customers = await getCustomers();

        for (const customer of all_customers) {
            for (const clothe of customer.clothes) {
                await deleteClothesImage(clothe.id.toString());
            }
        }
    } catch (error) {
      console.error('Error deleting all images:', error);
    }
    alert("Clothes Image Deleted !");
}

export async function update_db_clothes_image()
{
    try {
        const all_customers = await getCustomers();

        for (const customer of all_customers) {
            for (const clothe of customer.clothes) {
                if (!await getClothesImage(clothe.id.toString())) {
                    const imageResponse = await fetch(`/api/clothes/${clothe.id.toString()}/image`);
                    if (!imageResponse.ok) {
                      throw new Error('Failed to fetch image');
                    }
                    const imageBlob = await imageResponse.blob();
                    createClothesImage(clothe.id.toString(), imageBlob);
                }
            }
        }
    } catch (error) {
        console.error('Error fetching or updating clothes_image:', error);
    }
    alert("Clothes Image Updated !");
}
