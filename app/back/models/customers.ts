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
        public phone_number: string,
        public address: string,
        public coach_id: number = 0,
        public _id?: ObjectId)
    {
    }
}
