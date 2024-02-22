const mongoose = require("mongoose");

const equipmentSchema = new mongoose.Schema(
  {
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
    },
    vin: { type: String },
    type: { type: String },
    make: { type: String },
    model: { type: String },
    engine: { type: String },
    transmissions: { type: String },
    tansmissionModel: { type: String },
    wheelbase: { type: String },
    axles: { type: String },
    steerTireSize: { type: String },
    driveTireSize: { type: String },
    tireSize: { type: String },
    grossVehicleWeight: { type: String },
    unit: { type: String },
    year: { type: String },
    color: { type: String },
    hPower: { type: String },
    ratio: { type: String },
    fuel: { type: String },
    inputArr: [{ type: Object }],
    trailerProfile: { type: String },
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

const Equipment = mongoose.model("Equipment", equipmentSchema);

module.exports = Equipment;
