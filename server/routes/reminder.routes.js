import express from "express";
import {
  getReminder,
  createReminder,
  updateReminder,
  deleteReminder,
} from "../controller/reminder.controller.js";

export const reminderRouter = express.Router();

reminderRouter.get("/read", getReminder);

reminderRouter.post("/create", createReminder);

reminderRouter.put("/update", updateReminder);

reminderRouter.delete("/delete", deleteReminder);
