const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema(
  {
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
    },
    companyRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
    },
    employeeRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
    },
    equipmentRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Equipment",
    },
    title: {
      type: String,
    },
    enteredDate: {
      type: String,
    },
    expirationDate: {
      type: String,
    },
    inputArr: [{ type: Object }],
    archive: { type: Boolean, default: false },
    size: { type: Number },
    documents: [
      {
        type: { type: String },
        url: { type: String },
        name: { type: String },
        id: { type: String },
        kbSize: { type: Number },
      },
    ],
  },
  { timestamps: true }
);

const Document = mongoose.model("Document", documentSchema);

module.exports = Document;
