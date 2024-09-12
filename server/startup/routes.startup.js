import { authRouter } from "../routes/auth.routes.js";
import { auth } from "../middleware/auth.middleware.js";
import { employeesRouter } from "../routes/employee.routes.js";
import { usersRouter } from "../routes/users.routes.js";
import { announcementRouter } from "../routes/announcement.routes.js";
import { taskRouter } from "../routes/task.routes.js";
import { reminderRouter } from "../routes/reminder.routes.js";

export const initRoutes = (app) => {
  app.use("/auth", authRouter);
  // app.use(auth);
  app.use("/employee", employeesRouter);
  app.use("/users", usersRouter);
  app.use("/announcement", announcementRouter);
  app.use("/task", taskRouter);
  app.use("/reminder", reminderRouter);
};
