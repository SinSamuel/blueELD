const express = require("express");
const Router = express.Router();
const controller = require("../../controllers/company/controller");

Router.get("/get-company", controller.getCompany);
Router.post("/add-company", controller.addCompany);

module.exports = Router;
