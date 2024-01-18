const Employee = require("../../models/employee");

class EmployeeClass {
  // to get all employees
  getEmployees = async (req, res) => {
    try {
      const data = await Employee.find();
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  };

  // get employee by id
  getEmployeeById = async (req, res) => {
    try {
      console.log(req.parms);
      const data = await Employee.findById(req.params.id);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  };

  // add employee
  addEmployee = async (req, res) => {
    try {
      console.log(req.body);
      const data = await Employee.create(req.body);
      res.status(201).json({ message: "Employee Added!" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  };

  // edit employee
  editEmployee = async (req, res) => {
    try {
      const { id } = req.params;
      const data = await Employee.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.status(200).json({ data, message: "Employee Edited!" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  };

  //delete employees
  deleteEmployees = async (req, res) => {
    try {
      const condition = {
        _id: req.body,
      };
      const data = await Employee.deleteMany(condition);
      console.log(data);
      res.status(200).json({ data: req.body, message: "Employee Deleted!" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  };
}

module.exports = new EmployeeClass();
