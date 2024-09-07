import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/app/back/services/database.service';
import { ObjectId, Binary } from 'mongodb';

export async function POST(request: NextRequest) {
    try {
        const db = await connectToDatabase();
        const clothesCollection = db.collection('clothes_image');
    
        const { id, image } = await request.json();
    
        if (!id || !image) {
          return NextResponse.json({ message: 'Missing id or image data' }, { status: 400 });
        }
    
        const result = await clothesCollection.insertOne({
          image,
          id: id,
        });
    
        if (result.acknowledged) {
          return NextResponse.json({ message: 'Image uploaded successfully' }, { status: 201 });
        } else {
          return NextResponse.json({ message: 'Failed to upload image' }, { status: 500 });
        }
      } catch (error) {
        console.error('Error creating the image in the db:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
      }
}

export async function GET(request: NextRequest)
{
try {
    const db = await connectToDatabase();
    const clothesCollection = db.collection('clothes_image');

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ message: 'Missing id parameter' }, { status: 400 });
    }

    const image = await clothesCollection.findOne({ id: id });

    if (!image) {
      return NextResponse.json({ message: 'Image not found' }, { status: 404 });
    }

    return NextResponse.json(image, { status: 200 });
  } catch (error) {
    console.error('Error fetching image:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
