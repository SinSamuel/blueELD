const express = require("express");
const expenseRoutes = require("./expenseRoutes");
const columnRoutes = require("./columnRoutes");
const employeeRoutes = require("./employeeRoutes");
const documentRoutes = require("./documentRoutes");
const companyRoutes = require("./companyRoutes");
const tripRoutes = require("./tripRoutes");

let router = express.Router();

router.use("/expense", expenseRoutes);
router.use("/column", columnRoutes);
router.use("/employee", employeeRoutes);
router.use("/document", documentRoutes);
router.use("/company", companyRoutes);
router.use("/trip", tripRoutes);

module.exports = router;
