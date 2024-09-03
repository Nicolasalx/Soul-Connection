// employees.router.ts
import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";
import Employees from "../models/employees";

export const employeesRouter = express.Router();

employeesRouter.use(express.json());

employeesRouter.get("/", async (req: Request, res: Response) => {
    try {
        const employees = await collections.employees?.find({}).toArray();
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch employees" });
    }
});
