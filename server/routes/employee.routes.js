import express from "express";
import {
  getEmployees,
  createEmployees,
  updateEmployees,
  deleteEmployees,
} from "../controller/employees.controller.js";

export const employeesRouter = express.Router();

employeesRouter.get("/read", getEmployees);

employeesRouter.post("/create", createEmployees);

employeesRouter.put("/update", updateEmployees);

employeesRouter.delete("/delete", deleteEmployees);
