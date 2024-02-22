const express = require("express");
const Router = express.Router();
const controller = require("../../controllers/company/controller");

Router.get("/:id", controller.getCompany);
Router.post("/", controller.addCompany);
Router.post("/security-code", controller.handleSecurityCode);
Router.patch("/resend-code/:id", controller.resendCode);
Router.patch("/reset-password", controller.resetPassword);
Router.patch("/forget-password", controller.forgetPassword);
Router.post("/login", controller.login);

module.exports = Router;
