const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    date: {
      type: String,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    ssn: {
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
    city: {
      type: String,
    },
    zipCode: {
      type: String,
    },
    cdl: {
      type: String,
    },
    employment: {
      type: String,
    },
    payBy: {
      type: String,
    },
    rate: {
      type: String,
    },
    description: {
      type: String,
    },
    driverLicense: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Document",
    },
    profilePicture: {
      type: String,
    },
    medicalExam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Document",
    },
    employmentContract: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Document",
    },
    irs: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Document",
    },
    title: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Document",
    },
  },
  { timestamps: true }
);

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
