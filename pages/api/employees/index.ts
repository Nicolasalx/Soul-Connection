// app/api/employees/index.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '@/app/back/services/database.service';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const db = await connectToDatabase();
    const employeesCollection = db.collection('employees');

    if (req.method === 'GET') {
      const employees = await employeesCollection.find({}).toArray();
      res.status(200).json(employees);
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Database connection failed:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
