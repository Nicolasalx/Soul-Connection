import { ObjectId } from "mongodb";

export class Msg
{
    constructor(
        public msg: string,
        public date: Date,
        public client_sender: boolean) // true: client, false: coach
    {
    }
}

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
        public conv: Msg[] = [],
        public clothes: Clothes[] = [],
        public coach_id: number = 0,
        public _id?: ObjectId)
    {
    }
}
