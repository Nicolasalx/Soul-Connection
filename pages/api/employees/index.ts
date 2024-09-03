import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '@/app/back/services/database.service';
import { ObjectId } from 'mongodb';

async function handleGet(req: NextApiRequest, res: NextApiResponse)
{
  try {
    const db = await connectToDatabase();
    const employeesCollection = db.collection('employees');
    const employees = await employeesCollection.find({}).toArray();
    res.status(200).json(employees);
  } catch (error) {
    console.error('Error fetching employees:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function handlePost(req: NextApiRequest, res: NextApiResponse)
{
  try {
    const db = await connectToDatabase();
    const employeesCollection = db.collection('employees');

    const result = await employeesCollection.insertOne(req.body);
    res.status(201).json(result);
  } catch (error) {
    console.error('Error creating employee:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function handlePut(req: NextApiRequest, res: NextApiResponse)
{
  try {
    const db = await connectToDatabase();
    const employeesCollection = db.collection('employees');
    const { id, ...updateFields } = req.body;

    if (!id) {
      return res.status(400).json({ message: 'ID is required for updating an employee' });
    }

    const updateResult = await employeesCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateFields }
    );

    if (updateResult.matchedCount === 0) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.status(200).json({ message: 'Employee updated successfully' });
  } catch (error) {
    console.error('Error updating employee:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function handleDelete(req: NextApiRequest, res: NextApiResponse)
{
  try {
    const db = await connectToDatabase();
    const employeesCollection = db.collection('employees');
    const { deleteId } = req.query;

    if (!deleteId) {
      return res.status(400).json({ message: 'ID is required for deleting an employee' });
    }

    const deleteResult = await employeesCollection.deleteOne({ _id: new ObjectId(deleteId as string) });

    if (deleteResult.deletedCount === 0) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (error) {
    console.error('Error deleting employee:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      await handleGet(req, res);
      break;
    case 'POST':
      await handlePost(req, res);
      break;
    case 'PUT':
      await handlePut(req, res);
      break;
    case 'DELETE':
      await handleDelete(req, res);
      break;
    default:
      res.status(405).json({ message: 'Method not allowed' });
  }
}
