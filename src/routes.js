const express = require("express");
const routes = express.Router();
const auth = require("./middlewares/auth");

const taskController = require("./controllers/taskController");
const authController = require("./controllers/authController");

routes.get("/tasks", auth, taskController.index);
routes.get("/tasks/:id", auth, taskController.show);
routes.post("/tasks", auth, taskController.create);
routes.put("/tasks/:id", auth, taskController.update);
routes.delete("/tasks/:id", auth, taskController.destroy);

routes.get("/profile", auth, taskController.profile);

routes.post("/register", authController.register);
routes.post("/authenticate", authController.authenticate);

module.exports = routes;
