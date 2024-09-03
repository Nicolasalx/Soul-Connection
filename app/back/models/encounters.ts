import { ObjectId } from "mongodb";

export default class Encounters
{
    constructor(
        public id: number,
        public customer_id: number,
        public date: string,
        public rating: number,
        public comment: string,
        public source: string,
        public _id?: ObjectId)
    {
    }
}
