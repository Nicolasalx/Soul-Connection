import { sc_db_api } from "./db_api_instance";


export async function getClothesImage(id: string): Promise<Blob | null>
{
  try {
    const response = await sc_db_api.get(`/api/back/clothes_image?id=${id}`);

    const imageBlob = await response.data.blob();
    return imageBlob;
  } catch (error) {
    console.error('Error fetching image:', error);
    return null;
  }
}

export async function createClothesImage(id: string, imageBlob: Blob): Promise<void> {
    try {
        const reader = new FileReader();
        reader.readAsDataURL(imageBlob);

      // Use a promise to wait until the conversion is complete
      const base64ImagePromise = new Promise<string>((resolve, reject) => {
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
      });

      const base64Image = await base64ImagePromise;

      // Send the base64 image to your API
      const response = await fetch('/api/back/clothes_image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: id,
          image: base64Image, // Base64 encoded image
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
  