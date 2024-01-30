const Document = require("../../models/document");
const Equipment = require("../../models/equipment");

class EquipmentClass {
  //get all equipments
  getEquipments = async (req, res) => {
    try {
      const data = await Equipment.find();
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  };

  // get equipment by id
  getEquipmentById = async (req, res) => {
    try {
      const data = await Equipment.findById(req.params.id);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  };

  // add document
  addEquipment = async (req, res) => {
    try {
      console.log(req.body);
      const data = await Equipment.create(req.body);
      res.status(201).json({ message: "Equipment Added!", data: data });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  };

  //delete equipments
  deleteEquipments = async (req, res) => {
    try {
      const condition = {
        _id: req.body,
      };
      const data = await Equipment.deleteMany(condition);
      res.status(200).json({ data: req.body, message: "Equipment Deleted!" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  };

  // equipment edited
  editEquipment = async (req, res) => {
    try {
      const { id } = req.params;
      const data = await Equipment.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.status(200).json({ data, message: "Equipment Edited!" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  };
}

module.exports = new EquipmentClass();
