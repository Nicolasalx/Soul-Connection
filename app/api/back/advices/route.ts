import { connectToDatabase } from "@/app/back/services/database.service";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest)
{
  try {
      const db = await connectToDatabase();
      const advicesCollection = db.collection('advices');

      const { id, advices } = await request.json();

      if (!id || !advices) {
        return NextResponse.json({ message: 'Missing id or advices data' }, { status: 400 });
      }

      const result = await advicesCollection.insertOne({
        advices,
        id: id,
      });

      if (result.acknowledged) {
        return NextResponse.json({ message: 'Conv uploaded successfully' }, { status: 201 });
      } else {
        return NextResponse.json({ message: 'Failed to upload advices' }, { status: 500 });
      }
    } catch (error) {
      console.error('Error creating the advices in the db:', error);
      return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}

export async function PUT(request: NextRequest)
{
  try {
    const db = await connectToDatabase();
    const advicesCollection = db.collection('advices');

    const { id, advices } = await request.json();

    if (!id || !advices) {
      return NextResponse.json({ message: 'Missing id or advices data' }, { status: 400 });
    }

    const result = await advicesCollection.updateOne(
      { id: id },
      { $set: { advices: advices } }
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
    console.error('Error updating the advices in the db:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(request: NextRequest)
{
try {
    const db = await connectToDatabase();
    const advicesCollection = db.collection('advices');

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ message: 'Missing id parameter' }, { status: 400 });
    }

    const advices = await advicesCollection.findOne({ id: id });

    if (!advices) {
      return NextResponse.json({ message: 'Conv not found' }, { status: 404 });
    }

    return NextResponse.json(advices, { status: 200 });
  } catch (error) {
    console.error('Error fetching advices:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
      const db = await connectToDatabase();
      const advicesCollection = db.collection('advices');

      const { searchParams } = new URL(request.url);
      const id = searchParams.get('id');

      if (!id) {
        return NextResponse.json({ message: 'Missing id parameter' }, { status: 400 });
      }

      const result = await advicesCollection.deleteOne({ id: id });

      if (result.deletedCount === 1) {
        return NextResponse.json({ message: 'Conv deleted successfully' }, { status: 200 });
      } else {
        return NextResponse.json({ message: 'Conv not found' }, { status: 404 });
      }
    } catch (error) {
      console.error('Error deleting advices:', error);
      return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
