const express = require("express");
const Router = express.Router();
const controller = require("../../controllers/maintenance/controller");

Router.get("/:id", controller.getEquipmentMaintenance);
Router.post("/:id", controller.addMaintenance);
Router.patch("/edit/:id", controller.editMaintenance);
Router.patch("/delete", controller.deleteMaintenance);

module.exports = Router;
