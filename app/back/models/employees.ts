import { ObjectId } from "mongodb";

export default class Employees
{
    constructor(
        public id: number,
        public email: string,
        public name: string,
        public surname: string,
        public birth_date: string,
        public gender: string,
        public work: string,
        public _id?: ObjectId)
    {
    }
}
