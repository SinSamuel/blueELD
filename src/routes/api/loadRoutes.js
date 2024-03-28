const express = require("express");
const Router = express.Router();
const controller = require("../../controllers/loads/controller");

Router.get("/:id", controller.getLoads);
Router.post("/:id", controller.addLoad);
Router.patch("/:id", controller.editLoad);
Router.delete("/:id", controller.deleteLoad);
Router.patch("/change-disable/:id", controller.changeDisable);
// Router.patch("/edit/:id", controller.editMaintenance);
// Router.patch("/delete", controller.deleteMaintenance);

module.exports = Router;
