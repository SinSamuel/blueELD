const Table = require("../../models/table");

class MaintenanceClass {
  // to get all emplyee Table data
  getEquipmentMaintenance = async (req, res) => {
    try {
      const { id } = req.params;
      const data = await Table.find({
        refId: id,
        table: "maintenance",
      });
      let arr = [];
      await Promise.all(
        data?.map((elem) => arr.push({ ...elem.data, _id: elem._id }))
      );
      res.status(200).json(arr);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  };

  // add Table
  addMaintenance = async (req, res) => {
    try {
      const data = await Table.create({
        data: req.body,
        refId: req.params.id,
        table: "maintenance",
      });
      res.status(201).json({
        message: "maintenance Added!",
        data: { ...data.data, _id: data._id },
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  };

  // edit Table
  editMaintenance = async (req, res) => {
    try {
      const { id } = req.params;
      console.log(id, req.body);
      const data = await Table.findByIdAndUpdate(
        id,
        { data: { ...req.body } },
        { new: true }
      );

      res.status(200).json({ ...data.data, _id: data._id });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  };

  // delete Table
  deleteMaintenance = async (req, res) => {
    try {
      const condition = {
        _id: req.body,
      };
      console.log(req.body);
      await Table.deleteMany(condition);
      res.status(200).json(req.body);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  };
}

module.exports = new MaintenanceClass();
