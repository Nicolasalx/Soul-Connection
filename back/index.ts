// index.ts
import express from "express";
import { connectToDatabase } from "./services/database.service"
import { employeesRouter } from "./routes/employees.router";

console.log("AAAAAAAAAA BACK !!!!!!!!!");

const app = express();

connectToDatabase()
    .then(() => {
        app.use("/employees", employeesRouter);

        app.listen(3000, () => {
            console.log("Server started at http://localhost:3000");
        });
    })
    .catch((error: Error) => {
        console.error("Database connection failed", error);
        process.exit(1);
    });
