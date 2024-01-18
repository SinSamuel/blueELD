const express = require("express");
const Router = express.Router();
const controller = require("../../controllers/trip/controller");

Router.get("/get-employee-trips/:id", controller.getEmployeeTrips);
Router.post("/add-trip/:id", controller.addTrip);
Router.patch("/edit-trip/:id", controller.editTrip);
Router.patch("/delete-trips", controller.deleteTrip);

module.exports = Router;
