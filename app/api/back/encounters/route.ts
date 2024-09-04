import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/app/back/services/database.service';
import { ObjectId } from 'mongodb';

export async function GET(request: NextRequest)
{
  try {
    const db = await connectToDatabase();
    const encountersCollection = db.collection('encounters');
    const encounters = await encountersCollection.find({}).toArray();
    return NextResponse.json(encounters, { status: 200 });
  } catch (error) {
    console.error('Error fetching encounters:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest)
{
  try {
    const db = await connectToDatabase();
    const encountersCollection = db.collection('encounters');

    const body = await request.json();
    const result = await encountersCollection.insertOne(body);
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error('Error creating encounters:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest)
{
  try {
    const db = await connectToDatabase();
    const encountersCollection = db.collection('encounters');

    const body = await request.json();
    const { id, ...updateFields } = body;

    if (!id) {
      return NextResponse.json({ message: 'ID is required for updating a encounters' }, { status: 400 });
    }

    const updateResult = await encountersCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateFields }
    );

    if (updateResult.matchedCount === 0) {
      return NextResponse.json({ message: 'encounters not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'encounters updated successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error updating encounters:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest)
{
  try {
    const db = await connectToDatabase();
    const encountersCollection = db.collection('encounters');

    const { searchParams } = new URL(request.url);
    const deleteId = searchParams.get('deleteId');

    if (!deleteId) {
      return NextResponse.json({ message: 'ID is required for deleting a encounters' }, { status: 400 });
    }

    const deleteResult = await encountersCollection.deleteOne({ _id: new ObjectId(deleteId) });

    if (deleteResult.deletedCount === 0) {
      return NextResponse.json({ message: 'encounters not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'encounters deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting encounters:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
