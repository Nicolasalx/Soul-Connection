import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/app/back/services/database.service';
import { ObjectId } from 'mongodb';
import { fromUTF8Array, toUTF8Array } from '../employees/route';

export async function GET(request: NextRequest)
{
  try {
    const db = await connectToDatabase();
    const tipsCollection = db.collection('tips');
    const tips = await tipsCollection.find({}).toArray();

    const convertedTips = tips.map(tip => ({
      ...tip,
      title: fromUTF8Array(tip.title),
      tip: fromUTF8Array(tip.tip)
    }));

    return NextResponse.json(convertedTips, { status: 200 });
  } catch (error) {
    console.error('Error fetching tips:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest)
{
  try {
    const db = await connectToDatabase();
    const tipsCollection = db.collection('tips');

    const body = await request.json();

    const newTips = {
      ...body,
      title: toUTF8Array(body.title),
      tip: toUTF8Array(body.tip),
    };

    const result = await tipsCollection.insertOne(newTips);
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error('Error creating tip:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest)
{
  try {
    const db = await connectToDatabase();
    const tipsCollection = db.collection('tips');

    const body = await request.json();
    const { _id, ...updateFields } = body;

    if (!_id) {
      return NextResponse.json({ message: 'ID is required for updating a tip' }, { status: 400 });
    }

    const updateResult = await tipsCollection.updateOne(
      { _id: new ObjectId(_id) },
      { $set: updateFields }
    );

    if (updateResult.matchedCount === 0) {
      return NextResponse.json({ message: 'Tip not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Tip updated successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error updating tip:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest)
{
  try {
    const db = await connectToDatabase();
    const tipsCollection = db.collection('tips');

    const { searchParams } = new URL(request.url);
    const deleteId = searchParams.get('deleteId');

    if (!deleteId) {
      return NextResponse.json({ message: 'ID is required for deleting a tip' }, { status: 400 });
    }

    const deleteResult = await tipsCollection.deleteOne({ _id: new ObjectId(deleteId) });

    if (deleteResult.deletedCount === 0) {
      return NextResponse.json({ message: 'Tip not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Tip deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting tip:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
