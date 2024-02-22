const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({
  refId: {
    type: String,
  },

  token: {
    type: String,
    required: true,
  },
  createdAt: { type: Date, default: Date.now, expires: "10m" },
});

const Token = mongoose.model("Token", tokenSchema);

module.exports = Token;
