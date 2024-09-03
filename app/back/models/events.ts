import { ObjectId } from "mongodb";

export default class Events
{
    constructor(
        public id: number,
        public name: string,
        public date: string,
        public max_participants: number,
        public location_x: string,
        public location_y: string,
        public type: string,
        public employee_id: number,
        public location_name: string,
        public _id?: ObjectId)
    {
    }
}
