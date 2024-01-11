const express = require("express");
const expenseRoutes = require("./expenseRoutes");
const columnRoutes = require("./columnRoutes");

let router = express.Router();

router.use("/expense", expenseRoutes);
router.use("/column", columnRoutes);

module.exports = router;
