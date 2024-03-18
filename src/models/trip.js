const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema(
  {
    employee: {
      type: String,
    },
    table: {
      type: String,
      default: "trip",
    },
    index: { type: Number },
    data: {
      type: Object,
    },
  },
  { timestamps: true }
);

const Trip = mongoose.model("Trip", tripSchema);

module.exports = Trip;
