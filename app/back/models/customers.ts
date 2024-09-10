import { ObjectId } from "mongodb";

export class Clothes
{
    constructor(
        public id: number,
        public type: string)
    {
    }
}

export default class Customers
{
    constructor(
        public id: number,
        public email: string,
        public password: string | null,
        public name: string,
        public surname: string,
        public birth_date: string,
        public gender: string,
        public description: string,
        public astrological_sign: string,
        public phone_number: string,
        public address: string,
        public clothes: Clothes[] = [],
        public coach_id: number = 0,
        public _id?: ObjectId)
    {
    }
}
