import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/app/back/services/database.service';
import { ObjectId } from 'mongodb';
import { fromUTF8Array, toUTF8Array } from '@/app/lib/dbhelper/utf_encoder';

export async function GET(request: NextRequest)
{
  try {
    const db = await connectToDatabase();
    const employeesCollection = db.collection('employees');
    const employees = await employeesCollection.find({}).toArray();

    const convertedEmployees = employees.map(employee => ({
      ...employee,
      name: fromUTF8Array(employee.name),
      surname: fromUTF8Array(employee.surname),
      birth_date: fromUTF8Array(employee.birth_date),
      email: fromUTF8Array(employee.email),
      password: fromUTF8Array(employee.password),
      gender: fromUTF8Array(employee.gender),
      work: fromUTF8Array(employee.work),
    }));

    return NextResponse.json(convertedEmployees, { status: 200 });
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

    const newEmployee = {
      ...body,
      name: toUTF8Array(body.name),
      surname: toUTF8Array(body.surname),
      birth_date: toUTF8Array(body.birth_date),
      email: toUTF8Array(body.email),
      password: toUTF8Array(body.password),
      gender: toUTF8Array(body.gender),
      work: toUTF8Array(body.work),
    };

    const result = await employeesCollection.insertOne(newEmployee);
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
