import { ObjectId } from "mongodb";

export default class Customers
{
    constructor(
        public id: number,
        public email: string,
        public name: string,
        public surname: string,
        public birth_date: string,
        public gender: string,
        public description: string,
        public astrological_sign: string,
        public coach_id: number,
        public _id?: ObjectId)
    {
    }
}
