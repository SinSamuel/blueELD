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
    driverLicense: [
      {
        type: String,
      },
    ],
    profilePicture: [{ type: String }],
    medicalExam: [{ type: String }],
    employmentContract: [{ type: String }],
    irs: [{ type: String }],
    title: [{ type: String }],
  },
  { timestamps: true }
);

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
