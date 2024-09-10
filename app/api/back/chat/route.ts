import { connectToDatabase } from "@/app/back/services/database.service";
import { fromUTF8Array, toUTF8Array } from "@/app/lib/dbhelper/utf_encoder";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

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

        // convert to utf8

        return NextResponse.json(conv, { status: 200 });
    } catch (error) {
        console.error('Error fetching conv:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}

export async function POST(request: NextRequest)
{
  try {
    const db = await connectToDatabase();
    const convCollection = db.collection('conv');

    const body = await request.json();
    
    const newCustomer = {
      ...body,
      email: toUTF8Array(body.email),
      password: body.password ? toUTF8Array(body.password) : null,
      name: toUTF8Array(body.name),
      surname: toUTF8Array(body.surname),
      birth_date: toUTF8Array(body.birth_date),
      gender: toUTF8Array(body.gender),
      description: toUTF8Array(body.description),
      astrological_sign: toUTF8Array(body.astrological_sign),
      phone_number: toUTF8Array(body.phone_number),
      address: toUTF8Array(body.address)
    };
    
    const result = await convCollection.insertOne(newCustomer);
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error('Error creating customer:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest)
{
  try {
    const db = await connectToDatabase();
    const convCollection = db.collection('conv');

    const body = await request.json();
    const { _id, ...updateFields } = body;

    if (!_id) {
      return NextResponse.json({ message: 'ID is required for updating a customer' }, { status: 400 });
    }

    const updateResult = await convCollection.updateOne(
      { _id: new ObjectId(_id) },
      { $set: updateFields }
    );

    if (updateResult.matchedCount === 0) {
      return NextResponse.json({ message: 'Customer not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Customer updated successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error updating customer:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest)
{
  try {
    const db = await connectToDatabase();
    const convCollection = db.collection('conv');

    const { searchParams } = new URL(request.url);
    const deleteId = searchParams.get('deleteId');

    if (!deleteId) {
      return NextResponse.json({ message: 'ID is required for deleting a customer' }, { status: 400 });
    }

    const deleteResult = await convCollection.deleteOne({ _id: new ObjectId(deleteId) });

    if (deleteResult.deletedCount === 0) {
      return NextResponse.json({ message: 'Customer not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Customer deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting customer:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
