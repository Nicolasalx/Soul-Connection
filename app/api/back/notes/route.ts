import { connectToDatabase } from "@/app/back/services/database.service";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest)
{
  try {
      const db = await connectToDatabase();
      const notesCollection = db.collection('notes');

      const { id, notes } = await request.json();

      if (!id || !notes) {
        return NextResponse.json({ message: 'Missing id or notes data' }, { status: 400 });
      }

      const result = await notesCollection.insertOne({
        notes,
        id: id,
      });

      if (result.acknowledged) {
        return NextResponse.json({ message: 'Conv uploaded successfully' }, { status: 201 });
      } else {
        return NextResponse.json({ message: 'Failed to upload notes' }, { status: 500 });
      }
    } catch (error) {
      console.error('Error creating the notes in the db:', error);
      return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}

export async function PUT(request: NextRequest)
{
  try {
    const db = await connectToDatabase();
    const notesCollection = db.collection('notes');

    const { id, notes } = await request.json();

    if (!id || !notes) {
      return NextResponse.json({ message: 'Missing id or notes data' }, { status: 400 });
    }

    const result = await notesCollection.updateOne(
      { id: id },
      { $set: { notes: notes } }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ message: 'Conv not found' }, { status: 404 });
    }

    if (result.modifiedCount === 1) {
      return NextResponse.json({ message: 'Conv updated successfully' }, { status: 200 });
    } else {
      return NextResponse.json({ message: 'Conv update failed' }, { status: 500 });
    }
  } catch (error) {
    console.error('Error updating the notes in the db:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(request: NextRequest)
{
try {
    const db = await connectToDatabase();
    const notesCollection = db.collection('notes');

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ message: 'Missing id parameter' }, { status: 400 });
    }

    const notes = await notesCollection.findOne({ id: id });

    if (!notes) {
      return NextResponse.json({ message: 'Conv not found' }, { status: 404 });
    }

    return NextResponse.json(notes, { status: 200 });
  } catch (error) {
    console.error('Error fetching notes:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
      const db = await connectToDatabase();
      const notesCollection = db.collection('notes');

      const { searchParams } = new URL(request.url);
      const id = searchParams.get('id');

      if (!id) {
        return NextResponse.json({ message: 'Missing id parameter' }, { status: 400 });
      }

      const result = await notesCollection.deleteOne({ id: id });

      if (result.deletedCount === 1) {
        return NextResponse.json({ message: 'Conv deleted successfully' }, { status: 200 });
      } else {
        return NextResponse.json({ message: 'Conv not found' }, { status: 404 });
      }
    } catch (error) {
      console.error('Error deleting notes:', error);
      return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
