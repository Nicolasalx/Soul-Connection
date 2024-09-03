import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/app/back/services/database.service';
import { ObjectId } from 'mongodb';

export async function GET(request: NextRequest)
{
  try {
    const db = await connectToDatabase();
    const eventsCollection = db.collection('events');
    const events = await eventsCollection.find({}).toArray();
    return NextResponse.json(events, { status: 200 });
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest)
{
  try {
    const db = await connectToDatabase();
    const eventsCollection = db.collection('events');

    const body = await request.json();
    const result = await eventsCollection.insertOne(body);
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error('Error creating events:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest)
{
  try {
    const db = await connectToDatabase();
    const eventsCollection = db.collection('events');

    const body = await request.json();
    const { _id, ...updateFields } = body;

    if (!_id) {
      return NextResponse.json({ message: 'ID is required for updating a events' }, { status: 400 });
    }

    const updateResult = await eventsCollection.updateOne(
      { _id: new ObjectId(_id) },
      { $set: updateFields }
    );

    if (updateResult.matchedCount === 0) {
      return NextResponse.json({ message: 'events not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'events updated successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error updating events:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest)
{
  try {
    const db = await connectToDatabase();
    const eventsCollection = db.collection('events');

    const { searchParams } = new URL(request.url);
    const deleteId = searchParams.get('deleteId');

    if (!deleteId) {
      return NextResponse.json({ message: 'ID is required for deleting a events' }, { status: 400 });
    }

    const deleteResult = await eventsCollection.deleteOne({ _id: new ObjectId(deleteId) });

    if (deleteResult.deletedCount === 0) {
      return NextResponse.json({ message: 'events not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'events deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting events:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
