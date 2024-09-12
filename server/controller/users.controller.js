import {
  Query,
  SelectAll,
  Check,
  Transaction,
} from "../database/sql.database.js";
import { Encrypter } from "../helper/cryptography.js";
import { InsertStatement, SelectStatement } from "../helper/helper.js";
import { logger } from "../util/logger.util.js";

export const getUsers = async (req, res) => {
  try {
    const users = await SelectAll("users");
    res.status(200).json(users);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createUsers = async (req, res) => {
  try {
    const { ...users } = req.body;

    let sql = InsertStatement("users", "u", [
      "employeeid",
      "username",
      "password",
      "access",
      "status",
    ]);

    let data = [users];

    for (const key in data) {
      const { employeeid, username, password, access, status } = data[key];

      let values = [
        [employeeid, username, Encrypter(password), access, status],
      ];

      logger.info(
        `${employeeid}, ${username}, ${Encrypter(
          password
        )}, ${access}, ${status}`
      );

      const exist = await Check("select * from users where u_employeeid = ?", [
        employeeid,
      ]);

      if (exist) {
        return res.status(400).json({ message: "Users already exists" });
      }

      await Query(sql, values);
    }

    res.status(200).json({ message: "Users created successfully" });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateUsers = async (req, res) => {
  try {
    const { ...users } = req.body;
    let data = [users];

    for (const key in data) {
      const { employeeid, status } = data[key];
      logger.info(`${employeeid}, ${status}`);
      await Query(`UPDATE users SET u_status = ? WHERE u_employeeid = ?`, [
        status,
        employeeid,
      ]);
    }

    res.status(200).json({ message: "Users updated successfully" });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteUsers = async (req, res) => {
  try {
    const { ...users } = req.body;
    let data = [users];
    const { employeeid } = data[0];

    await Query(`DELETE FROM users WHERE u_employeeid = ?`, [employeeid]);
    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
