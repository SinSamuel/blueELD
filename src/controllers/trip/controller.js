const Trip = require("../../models/trip");

class TripClass {
  // to get all emplyee trip data
  getEmployeeTrips = async (req, res) => {
    try {
      const { id } = req.params;
      const data = await Trip.find({
        employee: id,
        table: "trip",
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

  // add trip
  addTrip = async (req, res) => {
    try {
      const data = await Trip.create({
        data: req.body,
        employee: req.params.id,
      });
      res.status(201).json({ ...data.data, _id: data._id });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  };

  // edit trip
  editTrip = async (req, res) => {
    try {
      const { id } = req.params;
      console.log(id, req.body);
      const data = await Trip.findByIdAndUpdate(
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

  // delete trip
  deleteTrip = async (req, res) => {
    try {
      const condition = {
        _id: req.body,
      };
      console.log(req.body);
      await Trip.deleteMany(condition);
      res.status(200).json(req.body);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  };
}

module.exports = new TripClass();
