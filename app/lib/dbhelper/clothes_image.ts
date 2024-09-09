export async function getClothesImage(id: string): Promise<any | null> {
  try {
    const response = await fetch(`/api/back/clothes_image?id=${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch image');
    }
    const imageData = await response.json();
    
    if (!imageData || !imageData.image) {
      throw new Error('Image data is missing');
    }
    return imageData;
  } catch (error) {
    // console.error('Error fetching image:', error);
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

export async function deleteClothesImage(id: string): Promise<void> {
  try {
    const response = await fetch(`/api/back/clothes_image?id=${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to delete image');
    }

    console.log('Image deleted successfully');
  } catch (error) {
    console.error('Error deleting image:', error);
  }
}
