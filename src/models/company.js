const mongoose = require("mongoose");
const randomstring = require("randomstring");
const Token = require("./token");

const companySchema = new mongoose.Schema(
  {
    name: { type: String },
    role: { type: String, default: "admin" },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    phone: {
      type: String,
    },
    password: {
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
    city: {
      type: String,
    },
    count: { type: Number, default: 0 },
    spaceOccupied: { type: Number, default: 0 },
    permissions: [{ type: String }],
  },
  { timestamps: true }
);

companySchema.methods.generateVerificationToken = function () {
  let payload = {
    refId: this._id,
    token: randomstring.generate({
      length: 6,
      charset: "numeric",
    }),
  };

  return new Token(payload);
};

const Company = mongoose.model("Company", companySchema);

module.exports = Company;
