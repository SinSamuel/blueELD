const mongoose = require("mongoose");

const tableSchema = new mongoose.Schema(
  {
    refId: {
      type: String,
    },
    table: {
      type: String,
    },
    index: { type: Number },
    disable: { type: Boolean, default: false },
    data: {
      type: Object,
    },
  },
  { timestamps: true }
);

const TableData = mongoose.model("TableData", tableSchema);

module.exports = TableData;
