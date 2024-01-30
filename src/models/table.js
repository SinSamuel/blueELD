const mongoose = require("mongoose");

const tableSchema = new mongoose.Schema(
  {
    refId: {
      type: String,
    },
    table: {
      type: String,
    },
    data: {
      type: Object,
    },
  },
  { timestamps: true }
);

const TableData = mongoose.model("TableData", tableSchema);

module.exports = TableData;
