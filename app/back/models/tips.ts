import { ObjectId } from "mongodb";

export default class Tips
{
    constructor(
        public id: number,
        public title: string,
        public tip: string,
        public _id?: ObjectId)
    {
    }
}
