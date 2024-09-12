import express from "express";
import {
  getTask,
  createTask,
  updateTask,
} from "../controller/task.controller.js";

export const taskRouter = express.Router();

taskRouter.get("/read", getTask);

taskRouter.post("/create", createTask);

taskRouter.put("/update", updateTask);
