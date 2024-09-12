import {
    Query,
    SelectAll,
    Check,
    Transaction,
  } from "../database/sql.database.js";
  import { Encrypter } from "../helper/cryptography.js";
  import { InsertStatement, SelectStatement } from "../helper/helper.js";
  import { logger } from "../util/logger.util.js";
  
  export const getReminder = async (req, res) => {
    try {
      const reminder = await SelectAll("reminder");
      res.status(200).json(reminder);
    } catch (error) {
      logger.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  
  export const createReminder = async (req, res) => {
    try {
      const { ...reminder } = req.body;
  
      let sql = InsertStatement("reminder", "r", [
        "title",
        "content",
        "date",
        "status",
      ]);
  
      let data = [reminder];
  
      for (const key in data) {
        const { title, content, date, status } = data[key];
  
        let values = [[title, content, date, status]];
  
        logger.info(`${title}, ${content}, ${date}, ${status}`);
  
        const exist = await Check(
          "select * from reminder where r_title = ?",
          [title]
        );
  
        if (exist) {
          return res.status(400).json({ message: "Reminder already exists" });
        }
  
        await Query(sql, values);
      }
  
      res.status(200).json({ message: "Reminder created successfully" });
    } catch (error) {
      logger.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  
  export const updateReminder = async (req, res) => {
    try {
      const { ...reminder } = req.body;
      let data = [reminder];
  
      for (const key in data) {
        const { id, status } = data[key];
        logger.info(`${id}, ${status}`);
        await Query(
          `UPDATE reminder SET r_status = ? WHERE r_id = ?`,
          [status, id]
        );
      }
  
      res.status(200).json({ message: "Reminder updated successfully" });
    } catch (error) {
      logger.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  
  export const deleteReminder = async (req, res) => {
    try {
      const { ...reminder } = req.body;
      let data = [reminder];
      const { id } = data[0];
  
      await Query(`DELETE FROM reminder WHERE r_id = ?`, [
        id,
      ]);
      res.status(200).json({ message: "Reminder deleted successfully" });
    } catch (error) {
      logger.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  