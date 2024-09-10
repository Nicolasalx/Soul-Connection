import { ObjectId } from "mongodb";

export default class Employees
{
    constructor(
        public id: number,
        public email: string,
        public password: string | null,
        public last_connection: Date | null,
        public name: string,
        public surname: string,
        public birth_date: string,
        public gender: string,
        public work: string,
        public _id?: ObjectId)
    {
    }
}
