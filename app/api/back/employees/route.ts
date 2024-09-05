import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/app/back/services/database.service';
import { ObjectId } from 'mongodb';

export function toUTF8Array(str: string)
{
  var utf8 = [];
  for (var i=0; i < str.length; i++) {
      var charcode = str.charCodeAt(i);
      if (charcode < 0x80) utf8.push(charcode);
      else if (charcode < 0x800) {
          utf8.push(0xc0 | (charcode >> 6),
                    0x80 | (charcode & 0x3f));
      }
      else if (charcode < 0xd800 || charcode >= 0xe000) {
          utf8.push(0xe0 | (charcode >> 12),
                    0x80 | ((charcode>>6) & 0x3f),
                    0x80 | (charcode & 0x3f));
      }
      else {
          i++;
          charcode = ((charcode&0x3ff)<<10)|(str.charCodeAt(i)&0x3ff)
          utf8.push(0xf0 | (charcode >>18),
                    0x80 | ((charcode>>12) & 0x3f),
                    0x80 | ((charcode>>6) & 0x3f),
                    0x80 | (charcode & 0x3f));
      }
  }
  return utf8;
}

export function fromUTF8Array(data: number[])
{
  var str = '',
      i;

  for (i = 0; i < data.length; i++) {
      var value = data[i];

      if (value < 0x80) {
          str += String.fromCharCode(value);
      } else if (value > 0xBF && value < 0xE0) {
          str += String.fromCharCode((value & 0x1F) << 6 | data[i + 1] & 0x3F);
          i += 1;
      } else if (value > 0xDF && value < 0xF0) {
          str += String.fromCharCode((value & 0x0F) << 12 | (data[i + 1] & 0x3F) << 6 | data[i + 2] & 0x3F);
          i += 2;
      } else {
          var charCode = ((value & 0x07) << 18 | (data[i + 1] & 0x3F) << 12 | (data[i + 2] & 0x3F) << 6 | data[i + 3] & 0x3F) - 0x010000;

          str += String.fromCharCode(charCode >> 10 | 0xD800, charCode & 0x03FF | 0xDC00);
          i += 3;
      }
  }

  return str;
}

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
