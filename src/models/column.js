const mongoose = require("mongoose");

const columnSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      default: "123",
    },
    columns: [],
  },
  { timestamps: true }
);

const Column = mongoose.model("Column", columnSchema);

module.exports = Column;
