import express from "express";
import {
  getAnnouncement,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
} from "../controller/announcement.controller.js";

export const announcementRouter = express.Router();

announcementRouter.get("/read", getAnnouncement);

announcementRouter.post("/create", createAnnouncement);

announcementRouter.put("/update", updateAnnouncement);

announcementRouter.delete("/delete", deleteAnnouncement);
