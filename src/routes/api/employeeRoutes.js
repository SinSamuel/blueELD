const express = require("express");
const Router = express.Router();
const controller = require("../../controllers/employee/controller");

Router.get("/get-all-employees/:id", controller.getEmployees);
Router.get("/:id", controller.getEmployeeById);
Router.post("/add-employee", controller.addEmployee);
Router.patch("/edit-employee/:id", controller.editEmployee);
Router.patch("/delete-employee", controller.deleteEmployees);
Router.patch("/change-password", controller.changePassword);

module.exports = Router;
