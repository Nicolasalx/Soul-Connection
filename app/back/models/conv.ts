import { ObjectId } from "mongodb";

export default class Msg
{
    constructor(
        public msg: string,
        public date: Date,
        public client_sender: boolean) // true: client, false: coach
    {
    }
}

