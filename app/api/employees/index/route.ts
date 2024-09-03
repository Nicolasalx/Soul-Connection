import { connectToDatabase } from '@/app/back/services/database.service';
import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';

export async function GET(req: Request)
{
  try {
    const db = await connectToDatabase();
    const employeesCollection = db.collection('employees')
    const employees = await employeesCollection.find({}).toArray()
    return NextResponse.json(employees, { status: 200 })
  } catch (error) {
    console.error(`Error fetching employees: ${error}`)
    return NextResponse.json('Internal server error', { status: 500 })
  }
}

export async function POST(req: Request)
{
  try {
    const db = await connectToDatabase()
    const employeesCollection = db.collection('employees')
    const body = await req.json()
    const result = await employeesCollection.insertOne(body)
    return NextResponse.json(result, { status: 201 })
  } catch (error) {
    console.error('Error creating employee:', error)
    return NextResponse.json('Internal server error', { status: 500 })
  }
}

export async function PUT(req: Request)
{
  try {
    const db = await connectToDatabase();
    const employeesCollection = db.collection('employees');
    const { id, ...updateFields } = await req.json();

    if (!id) {
      return NextResponse.json('ID is required for updating an employee', { status: 400 })
    }

    const updateResult = await employeesCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateFields }
    );

    if (updateResult.matchedCount === 0) {
      return NextResponse.json('Employee not found', { status: 404 })
    }

    return NextResponse.json('Employee updated successfully', { status: 200 })
  } catch (error) {
    console.error('Error updating employee:', error)
    return NextResponse.json('Internal server error', { status: 500 })
  }
}

export async function DELETE(req: Request)
{
  try {
    const db = await connectToDatabase()
    const employeesCollection = db.collection('employees')
    const { deleteId } = await req.json()

    if (!deleteId) {
      return NextResponse.json('ID is required for deleting an employee', { status: 400 })
    }

    const deleteResult = await employeesCollection.deleteOne({ _id: new ObjectId(deleteId as string) });

    if (deleteResult.deletedCount === 0) {
      return NextResponse.json('Employee not found', { status: 404 })
    }

    return NextResponse.json('Employee deleted successfully', { status: 200 })
  } catch (error) {
    console.error('Error deleting employee:', error);
    return NextResponse.json('Internal server error', { status: 500 })
  }
}
