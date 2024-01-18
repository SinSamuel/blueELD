const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema(
  {
    refId: {
      type: String,
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
    documents: [
      {
        type: { type: String },
        url: { type: String },
        name: { type: String },
        id: { type: String },
      },
    ],
  },
  { timestamps: true }
);

const Document = mongoose.model("Document", documentSchema);

module.exports = Document;
