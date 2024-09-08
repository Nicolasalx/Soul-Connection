import { sc_db_api } from "./db_api_instance";

export async function getClothesImage(id: string): Promise<string | null>
{
  try {
    const response = await sc_db_api.get(`clothes_image?id=${id}`);

    const imageBlob = await response.data.blob();

    const imageUrl = URL.createObjectURL(imageBlob);

    return imageUrl;
  } catch (error) {
    console.error('Error fetching image:', error);
    return null;
  }
}

export async function createClothesImage(id: string, imageBlob: Blob): Promise<void>
{
  try {
      const reader = new FileReader();
      reader.readAsDataURL(imageBlob);

    const base64ImagePromise = new Promise<string>((resolve, reject) => {
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
    });

    const base64Image = await base64ImagePromise;

    const response = await fetch('/api/back/clothes_image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
        image: base64Image,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to upload image');
    }

    console.log('Image uploaded successfully');
  } catch (error) {
    console.error('Error creating image:', error);
  }
}
