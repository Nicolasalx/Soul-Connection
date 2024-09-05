import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/app/back/services/database.service';
import { ObjectId } from 'mongodb';
import { fromUTF8Array, toUTF8Array } from '../employees/route';

export async function GET(request: NextRequest)
{
  try {
    const db = await connectToDatabase();
    const customersCollection = db.collection('customers');
    const customers = await customersCollection.find({}).toArray();

    const convertedCustomers = customers.map(customer => ({
      ...customer,

      email: fromUTF8Array(customer.email),
      name: fromUTF8Array(customer.name),
      surname: fromUTF8Array(customer.surname),
      birth_date: fromUTF8Array(customer.birth_date),
      gender: fromUTF8Array(customer.gender),
      description: fromUTF8Array(customer.description),
      astrological_sign: fromUTF8Array(customer.astrological_sign),
      address: fromUTF8Array(customer.address)
    }));

    return NextResponse.json(convertedCustomers, { status: 200 });
  } catch (error) {
    console.error('Error fetching customers:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest)
{
  try {
    const db = await connectToDatabase();
    const customersCollection = db.collection('customers');

    const body = await request.json();
    
    const newCustomer = {
      ...body,
      email: toUTF8Array(body.email),
      name: toUTF8Array(body.name),
      surname: toUTF8Array(body.surname),
      birth_date: toUTF8Array(body.birth_date),
      gender: toUTF8Array(body.gender),
      description: toUTF8Array(body.description),
      astrological_sign: toUTF8Array(body.astrological_sign),
      address: toUTF8Array(body.address)
    };
    
    const result = await customersCollection.insertOne(newCustomer);
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
    const customersCollection = db.collection('customers');

    const body = await request.json();
    const { _id, ...updateFields } = body;

    if (!_id) {
      return NextResponse.json({ message: 'ID is required for updating a customer' }, { status: 400 });
    }

    const updateResult = await customersCollection.updateOne(
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
    const customersCollection = db.collection('customers');

    const { searchParams } = new URL(request.url);
    const deleteId = searchParams.get('deleteId');

    if (!deleteId) {
      return NextResponse.json({ message: 'ID is required for deleting a customer' }, { status: 400 });
    }

    const deleteResult = await customersCollection.deleteOne({ _id: new ObjectId(deleteId) });

    if (deleteResult.deletedCount === 0) {
      return NextResponse.json({ message: 'Customer not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Customer deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting customer:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
