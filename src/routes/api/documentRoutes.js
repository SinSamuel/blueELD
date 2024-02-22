const express = require("express");
const Router = express.Router();
const controller = require("../../controllers/document/controller");

Router.get("/get-employee-document/:id/:role", controller.getEmployeeDocuments);
Router.get("/get-document-byId/:id", controller.getDocumentById);
Router.post("/add-document/:id", controller.addDocument);
Router.patch("/edit-document/:id", controller.editDocuemnt);
Router.get("/get-arhvive-documents/:id", controller.archiveDocuments);
Router.patch("/move-to-archive/:id", controller.moveToArchive);

module.exports = Router;
