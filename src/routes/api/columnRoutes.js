const express = require("express");
const Router = express.Router();
const controller = require("../../controllers/column/controller");

Router.get("/get-all-columns", controller.getColumns);
Router.post("/add-column", controller.addColumn);
Router.delete("/delete-column/:index", controller.deleteColumn);
Router.patch("/move-column/:index/:move", controller.moveColumn);
Router.patch("/hide-column/:index", controller.hideColumn);
Router.patch("/shrink-column/:index", controller.shrinkColumn);
Router.patch("/duplicate-column/:index", controller.duplicateColumn);
Router.patch("/edit-column/:index", controller.editColumn);

module.exports = Router;
