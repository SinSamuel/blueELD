const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
  {
    name: { type: String },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
    timeZone: {
      type: String,
    },
    accountNumber: {
      type: String,
    },
    mcNumber: {
      type: String,
    },
    dotNumber: {
      type: String,
    },
  },
  { timestamps: true }
);

const Company = mongoose.model("Company", companySchema);

module.exports = Company;
