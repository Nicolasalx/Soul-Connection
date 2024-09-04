import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/app/back/services/database.service';
import { ObjectId } from 'mongodb';

export async function GET(request: NextRequest)
{
  try {
    const db = await connectToDatabase();
    const employeesCollection = db.collection('employees');
    const employees = await employeesCollection.find({}).toArray();
    return NextResponse.json(employees, { status: 200 });
  } catch (error) {
    console.error('Error fetching employees:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest)
{
  try {
    const db = await connectToDatabase();
    const employeesCollection = db.collection('employees');

    const body = await request.json();
    const result = await employeesCollection.insertOne(body);
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error('Error creating employee:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest)
{
  try {
    const db = await connectToDatabase();
    const employeesCollection = db.collection('employees');

    const body = await request.json();
    const { _id, ...updateFields } = body;

    if (!_id) {
      return NextResponse.json({ message: 'ID is required for updating an employee' }, { status: 400 });
    }

    const updateResult = await employeesCollection.updateOne(
      { _id: new ObjectId(_id) },
      { $set: updateFields }
    );

    if (updateResult.matchedCount === 0) {
      return NextResponse.json({ message: 'Employee not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Employee updated successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error updating employee:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest)
{
  try {
    const db = await connectToDatabase();
    const employeesCollection = db.collection('employees');

    const { searchParams } = new URL(request.url);
    const deleteId = searchParams.get('deleteId');

    if (!deleteId) {
      return NextResponse.json({ message: 'ID is required for deleting a employee' }, { status: 400 });
    }

    const deleteResult = await employeesCollection.deleteOne({ _id: new ObjectId(deleteId) });

    if (deleteResult.deletedCount === 0) {
      return NextResponse.json({ message: 'employee not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'employee deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting employee:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
