import {
  Query,
  SelectAll,
  Check,
  Transaction,
} from "../database/sql.database.js";
import { Encrypter } from "../helper/cryptography.js";
import { InsertStatement, SelectStatement } from "../helper/helper.js";
import { logger } from "../util/logger.util.js";

export const getAnnouncement = async (req, res) => {
  try {
    const announcement = await SelectAll("announcement");
    res.status(200).json(announcement);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createAnnouncement = async (req, res) => {
  try {
    const { ...announcement } = req.body;

    let sql = InsertStatement("announcement", "a", [
      "title",
      "content",
      "date",
      "status",
    ]);

    let data = [announcement];

    for (const key in data) {
      const { title, content, date, status } = data[key];

      let values = [[title, content, date, status]];

      logger.info(`${title}, ${content}, ${date}, ${status}`);

      const exist = await Check(
        "select * from announcement where a_title = ?",
        [title]
      );

      if (exist) {
        return res.status(400).json({ message: "announcement already exists" });
      }

      await Query(sql, values);
    }

    res.status(200).json({ message: "announcement created successfully" });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateAnnouncement = async (req, res) => {
  try {
    const { ...announcement } = req.body;
    let data = [announcement];

    for (const key in data) {
      const { id, status } = data[key];
      logger.info(`${id}, ${status}`);
      await Query(
        `UPDATE announcement SET a_status = ? WHERE a_id = ?`,
        [status, id]
      );
    }

    res.status(200).json({ message: "announcement updated successfully" });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteAnnouncement = async (req, res) => {
  try {
    const { ...announcement } = req.body;
    let data = [announcement];
    const { id } = data[0];

    await Query(`DELETE FROM announcement WHERE a_id = ?`, [
      id,
    ]);
    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
