// database.service.ts
import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

export const collections: { employees?: mongoDB.Collection } = {}

export async function connectToDatabase()
{
    dotenv.config();

    if (!process.env.MONGO_URL) {
        throw new Error('MONGO_URL environment variable is not defined');
    }

    const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.MONGO_URL);

    await client.connect();

    const db: mongoDB.Db = client.db(process.env.DB_NAME);

    const employeesCollection: mongoDB.Collection = db.collection("employees");

    collections.employees = employeesCollection;

    console.log(`Successfully connected to database: ${db.databaseName} and collection: ${employeesCollection.collectionName}`);
}
