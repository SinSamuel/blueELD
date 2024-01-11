const express = require("express");
const Router = express.Router();
const controller = require("../../controllers/expense/controller");

Router.get("/get-all-expenses", controller.getExpenses);
Router.post("/add-expense", controller.addExpense);
Router.patch("/edit-expense/:id", controller.editExpense);
Router.patch("/delete-expenses", controller.deleteExpenses);

module.exports = Router;
