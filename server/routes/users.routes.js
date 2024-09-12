import express from "express";
import {
    getUsers,
    createUsers,
    updateUsers,
    deleteUsers,
} from "../controller/users.controller.js";

export const usersRouter = express.Router();

usersRouter.get("/read", getUsers);

usersRouter.post("/create", createUsers);

usersRouter.put("/update", updateUsers);

usersRouter.delete("/delete", deleteUsers);
