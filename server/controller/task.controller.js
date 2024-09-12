import {
  Query,
  SelectAll,
  Check,
  Transaction,
} from "../database/sql.database.js";
import { Encrypter } from "../helper/cryptography.js";
import {
  InsertStatement,
  SelectStatement,
  UpdateStatement,
} from "../helper/helper.js";
import { logger } from "../util/logger.util.js";

export const getTask = async (req, res) => {
  try {
    const task = await SelectAll("task");
    res.status(200).json(task);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createTask = async (req, res) => {
  try {
    const { ...task } = req.body;

    let sql = InsertStatement("task", "t", [
      "name",
      "description",
      "assignee",
      "priority",
      "status",
      "startdate",
      "duedate",
      "estimatedhours",
      "createdby",
      "createddate",
    ]);

    let data = [task];

    for (const key in data) {
      const {
        name,
        description,
        assignee,
        priority,
        status,
        startdate,
        duedate,
        estimatedhours,
        createdby,
        createddate,
      } = data[key];

      let values = [
        [
          name,
          description,
          assignee,
          priority,
          status,
          startdate,
          duedate,
          estimatedhours,
          createdby,
          createddate,
        ],
      ];

      logger.info(
        `${name}, ${description}, ${assignee}, ${priority}, ${status}, ${startdate}, ${duedate}, ${estimatedhours}, ${createdby}, ${createddate}`
      );

      //   const exist = await Check("select * from task where t_employeeid = ?", [
      //     employeeid,
      //   ]);

      //   if (exist) {
      //     return res.status(400).json({ message: "task already exists" });
      //   }

      await Query(sql, values);
    }

    res.status(200).json({ message: "Task created successfully" });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { ...task } = req.body;
    let data = [task];

    for (const key in data) {
      const { id, status, lastupdateby, lastupdatedate } = data[key];
      logger.info(`${id}, ${status}, ${lastupdateby}, ${lastupdatedate}`);

      let sql = UpdateStatement(
        "task",
        "t",
        ["status", "lastupdateby", "lastupdatedate"],
        ["id"]
      );

      logger.info(sql);
      await Query(sql, [status, lastupdateby, lastupdatedate, id]);
    }

    res.status(200).json({ message: "Task updated successfully" });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
