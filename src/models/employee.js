const mongoose = require("mongoose");
const randomstring = require("randomstring");
const Token = require("./token");
const employeeSchema = new mongoose.Schema(
  {
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
    },
    role: { type: String, default: "employee" },
    accountNumber: {
      type: String,
    },
    date: {
      type: String,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    password: {
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
      type: Object,
    },
    profilePicture: {
      type: String,
    },
    medicalExam: {
      type: Object,
    },
    employmentContract: {
      type: Object,
    },
    irs: {
      type: Object,
    },
    title: {
      type: Object,
    },
    permissions: [{ type: String }],
    count: { type: Number },
  },
  { timestamps: true }
);

employeeSchema.methods.generateVerificationToken = function () {
  let payload = {
    refId: this._id,
    token: randomstring.generate({
      length: 6,
      charset: "numeric",
    }),
  };

  return new Token(payload);
};

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
