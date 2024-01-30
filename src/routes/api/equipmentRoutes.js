const express = require("express");
const Router = express.Router();
const controller = require("../../controllers/equipment/controller");

Router.get("/get-equipment-byId/:id", controller.getEquipmentById);
Router.get("/get-equipments", controller.getEquipments);
Router.post("/add-equipment", controller.addEquipment);
Router.patch("/delete-equipment", controller.deleteEquipments);
Router.patch("/edit-equipment/:id", controller.editEquipment);

module.exports = Router;
