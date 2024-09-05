import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/app/back/services/database.service';
import { ObjectId } from 'mongodb';
import { fromUTF8Array, toUTF8Array } from '@/app/lib/dbhelper/utf_encoder';

export async function GET(request: NextRequest)
{
  try {
    const db = await connectToDatabase();
    const paymentsCollection = db.collection('payments');
    const payments = await paymentsCollection.find({}).toArray();

    const convertedPayments = payments.map(payment => ({
      ...payment,
      date: fromUTF8Array(payment.date),
      payment_method: fromUTF8Array(payment.payment_method),
      comment: fromUTF8Array(payment.comment)
    }));

    return NextResponse.json(convertedPayments, { status: 200 });
  } catch (error) {
    console.error('Error fetching payments:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest)
{
  try {
    const db = await connectToDatabase();
    const paymentsCollection = db.collection('payments');

    const body = await request.json();

    const newPayments = {
      ...body,
      date: toUTF8Array(body.date),
      payment_method: toUTF8Array(body.payment_method),
      comment: toUTF8Array(body.comment)
    };

    const result = await paymentsCollection.insertOne(newPayments);
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error('Error creating payments:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest)
{
  try {
    const db = await connectToDatabase();
    const paymentsCollection = db.collection('payments');

    const body = await request.json();
    const { _id, ...updateFields } = body;

    if (!_id) {
      return NextResponse.json({ message: 'ID is required for updating a payments' }, { status: 400 });
    }

    const updateResult = await paymentsCollection.updateOne(
      { _id: new ObjectId(_id) },
      { $set: updateFields }
    );

    if (updateResult.matchedCount === 0) {
      return NextResponse.json({ message: 'payments not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'payments updated successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error updating payments:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest)
{
  try {
    const db = await connectToDatabase();
    const paymentsCollection = db.collection('payments');

    const { searchParams } = new URL(request.url);
    const deleteId = searchParams.get('deleteId');

    if (!deleteId) {
      return NextResponse.json({ message: 'ID is required for deleting a payments' }, { status: 400 });
    }

    const deleteResult = await paymentsCollection.deleteOne({ _id: new ObjectId(deleteId) });

    if (deleteResult.deletedCount === 0) {
      return NextResponse.json({ message: 'payments not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'payments deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting payments:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
