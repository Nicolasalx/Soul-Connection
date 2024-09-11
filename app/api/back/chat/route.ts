import { connectToDatabase } from "@/app/back/services/database.service";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest)
{
  try {
      const db = await connectToDatabase();
      const convCollection = db.collection('conv');
  
      const { id, conv } = await request.json();
  
      if (!id || !conv) {
        return NextResponse.json({ message: 'Missing id or conv data' }, { status: 400 });
      }
  
      const result = await convCollection.insertOne({
        conv,
        id: id,
      });
  
      if (result.acknowledged) {
        return NextResponse.json({ message: 'Conv uploaded successfully' }, { status: 201 });
      } else {
        return NextResponse.json({ message: 'Failed to upload conv' }, { status: 500 });
      }
    } catch (error) {
      console.error('Error creating the conv in the db:', error);
      return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}

export async function PUT(request: NextRequest)
{
  try {
    const db = await connectToDatabase();
    const convCollection = db.collection('conv');

    const { id, conv } = await request.json();

    if (!id || !conv) {
      return NextResponse.json({ message: 'Missing id or conv data' }, { status: 400 });
    }

    const result = await convCollection.updateOne(
      { id: id },
      { $set: { conv: conv } }
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
    console.error('Error updating the conv in the db:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(request: NextRequest)
{
try {
    const db = await connectToDatabase();
    const convCollection = db.collection('conv');

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ message: 'Missing id parameter' }, { status: 400 });
    }

    const conv = await convCollection.findOne({ id: id });

    if (!conv) {
      return NextResponse.json({ message: 'Conv not found' }, { status: 404 });
    }

    return NextResponse.json(conv, { status: 200 });
  } catch (error) {
    console.error('Error fetching conv:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
      const db = await connectToDatabase();
      const convCollection = db.collection('conv');

      const { searchParams } = new URL(request.url);
      const id = searchParams.get('id');

      if (!id) {
        return NextResponse.json({ message: 'Missing id parameter' }, { status: 400 });
      }

      const result = await convCollection.deleteOne({ id: id });

      if (result.deletedCount === 1) {
        return NextResponse.json({ message: 'Conv deleted successfully' }, { status: 200 });
      } else {
        return NextResponse.json({ message: 'Conv not found' }, { status: 404 });
      }
    } catch (error) {
      console.error('Error deleting conv:', error);
      return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
