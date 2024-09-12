import {
  Query,
  SelectAll,
  Check,
  Transaction,
} from "../database/sql.database.js";
import { InsertStatement, SelectStatement } from "../helper/helper.js";
import { logger } from "../util/logger.util.js";

export const getEmployees = async (req, res) => {
  try {
    const employees = await SelectAll("employee");
    res.status(200).json(employees);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createEmployees = async (req, res) => {
  try {
    const { ...employee } = req.body;

    let sql = InsertStatement("employee", "e", [
      "id",
      "fullname",
      "department",
      "position",
      "email",
      "mobile",
      "status",
    ]);

    let data = [employee];

    for (const key in data) {
      const { id, fullname, department, position, email, mobile, status } =
        data[key];

      let values = [
        [id, fullname, department, position, email, mobile, status],
      ];

      const exist = await Check("select * from employee where e_id = ?", [id]);

      if (exist) {
        return res.status(400).json({ message: "Employee already exists" });
      }

      await Query(sql, values);
    }

    res.status(200).json({ message: "Employee created successfully" });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateEmployees = async (req, res) => {
  try {
    const { ...employee } = req.body;
    let data = [employee];

    for (const key in data) {
      const { id, status } = data[key];
      logger.info(`${id}, ${status}`);
      await Query(`UPDATE employee SET e_status = ? WHERE e_id = ?`, [
        status,
        id,
      ]);
    }

    res.status(200).json({ message: "Employee updated successfully" });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteEmployees = async (req, res) => {
  try {
    const { ...employee } = req.body;
    let data = [employee];
    const { id } = data[0];

    await Query(`DELETE FROM employee WHERE e_id = ?`, [id]);
    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
