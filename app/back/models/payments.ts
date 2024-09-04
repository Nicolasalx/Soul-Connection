import { ObjectId } from "mongodb";

export default class Payments
{
    constructor(
        public id: number,
        public date: string,
        public payment_method: string,
        public amount: number,
        public comment: string,
        public customer_id: number,
        public _id?: ObjectId)
    {
    }
}
