import { ObjectId } from "mongodb";

export default class Employees
{
    constructor(public name: string,
        public surname: string,
        public id?: ObjectId)
    {
    }
}
