const express = require("express");
const Router = express.Router();
const controller = require("../../controllers/column/controller");

Router.get("/get-all-columns/:userId", controller.getColumns);
Router.post("/add-column/:userId", controller.addColumn);
Router.delete("/delete-column/:index/:userId", controller.deleteColumn);
Router.patch("/move-column/:index/:move/:userId", controller.moveColumn);
Router.patch("/hide-column/:index/:userId", controller.hideColumn);
Router.patch("/shrink-column/:index/:userId", controller.shrinkColumn);
Router.patch("/duplicate-column/:index/:userId", controller.duplicateColumn);
Router.patch("/edit-column/:index/:userId", controller.editColumn);

module.exports = Router;
