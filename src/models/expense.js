const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      default: "123",
    },
    table: {
      type: String,
      default: "expense",
    },
    data: {
      type: Object,
    },
  },
  { timestamps: true }
);

const Expense = mongoose.model("Expense", expenseSchema);

module.exports = Expense;
