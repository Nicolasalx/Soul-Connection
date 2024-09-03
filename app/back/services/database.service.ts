// app/back/services/database.service.ts
import { MongoClient, Db } from 'mongodb';

let db: Db;

export const connectToDatabase = async (): Promise<Db> =>
{
    if (db) {
        return db;
    }
    
    const client = new MongoClient(process.env.MONGODB_URL as string);
    
    await client.connect();
    
    db = client.db(process.env.MONGODB_DB as string);
    console.log('Successfully connected to the database !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');

    return db;
};
