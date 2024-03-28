const Table = require("../../models/table");

class LoadsClass {
  // to get all company loads
  getLoads = async (req, res) => {
    try {
      const { id } = req.params;
      const data = await Table.find({
        refId: id,
        table: "load",
      });
      let arr = [];
      await Promise.all(
        data?.map((elem) =>
          arr.push({ ...elem.data, _id: elem._id, disable: elem?.disable })
        )
      );
      res.status(200).json(arr);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  };

  // add load
  addLoad = async (req, res) => {
    try {
      let data = await Table.find({
        refId: req.params.id,
        table: "load",
      });
      data = await Table.create({
        data: req.body,
        refId: req.params.id,
        table: "load",
        index: data.length,
      });
      res.status(201).json({
        message: "Added Successfully",
        data: { ...data.data, _id: data._id, disable: data?.disable },
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  };

  // edit Table
  editLoad = async (req, res) => {
    try {
      const { id } = req.params;
      console.log(id, req.body);
      const data = await Table.findByIdAndUpdate(
        id,
        { data: { ...req.body } },
        { new: true }
      );

      console.log(data);

      res
        .status(200)
        .json({ ...data.data, _id: data._id, disable: data?.disable });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  };

  changeDisable = async (req, res) => {
    try {
      const { id } = req.params;
      console.log(req.body);
      const data = await Table.findByIdAndUpdate(id, req.body, { new: true });
      console.log(data);
      res
        .status(200)
        .json({ ...data.data, _id: data._id, disable: data?.disable });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  };

  // delete Table
  deleteLoad = async (req, res) => {
    try {
      console.log(req.params);
      const { id } = req.params;
      let result = await Table.findByIdAndDelete(id);
      console.log(result);
      res.status(200).json({ data: result, message: "Delete successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  };
}

module.exports = new LoadsClass();
