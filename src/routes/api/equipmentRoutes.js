const express = require("express");
const Router = express.Router();
const controller = require("../../controllers/equipment/controller");

Router.get("/get-equipment-byId/:id", controller.getEquipmentById);
Router.get("/:id", controller.getEquipments);
Router.post("/", controller.addEquipment);
Router.patch("/delete-equipment", controller.deleteEquipments);
Router.patch("/:id", controller.editEquipment);

module.exports = Router;
