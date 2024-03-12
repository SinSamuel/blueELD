const Company = require("../../models/company");
const Employee = require("../../models/employee");
const { employeeInvitation } = require("../../utils/email");
const { hashString, checkEmployment } = require("../../utils/helper");

class EmployeeClass {
  // to get all employees
  getEmployees = async (req, res) => {
    try {
      const data = await Employee.find({ company: req.params.id }).populate([
        "driverLicense",
        "medicalExam",
        "employmentContract",
        "irs",
        "title",
      ]);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  };

  // get employee by id
  getEmployeeById = async (req, res) => {
    try {
      console.log(req.params);
      const data = await Employee.findById(req.params.id).populate([
        "driverLicense",
        "medicalExam",
        "employmentContract",
        "irs",
        "title",
      ]);
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
      const employee = await Employee.findOne({ email: req.body.email });
      if (employee) {
        return res.status(400).json({ message: "email already exists" });
      } else {
        let company = await Company.findById(req.body.company);
        let month = new Date(req.body.date).getMonth() + 1;
        let year = new Date(req.body.date).getFullYear() % 100;
        let { employment, permissions } = checkEmployment(req.body.employment);

        let number = `${company.accountNumber}${month}${year}${employment}${
          company.count + 1
        }`;

        console.log(number);
        const data = await Employee.create({
          ...req.body,
          accountNumber: number,
          permissions: permissions,
          count: company.count + 1,
          company: company._id,
        });
        company.count = company.count + 1;
        await company.save();
        if (data) {
          await employeeInvitation(
            {
              name: data?.firstName + " " + data?.lastName,
              id: data?._id,
              role: data?.employment,
            },
            data?.email
          );
          res.status(201).json({ message: "Employee Added!" });
        }
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  };

  // edit employee
  editEmployee = async (req, res) => {
    try {
      const { id } = req.params;
      console.log(req.body);
      let employee = await Employee.findById(id);
      let data;
      if (
        employee.date !== req.body.date ||
        employee.employment !== req.body.employment
      ) {
        console.log("running");
        let company = await Company.findById(req.body.company);
        let month = new Date(req.body.date).getMonth() + 1;
        let year = new Date(req.body.date).getFullYear() % 100;
        let { employment, permissions } = checkEmployment(req.body.employment);

        let number = `${company.accountNumber}${month}${year}${employment}${employee.count}`;
        data = await Employee.findByIdAndUpdate(
          id,
          { ...req.body, permissions: permissions, accountNumber: number },
          {
            new: true,
          }
        );
      } else {
        data = await Employee.findByIdAndUpdate(id, req.body, {
          new: true,
        });
      }
      res.status(200).json({ data, message: "Employee Edited!" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  };

  // change password
  changePassword = async (req, res) => {
    try {
      const { email, password } = req.body;
      let hashPassword = hashString(password);
      const data = await Employee.findOneAndUpdate(
        { email },
        { password: hashPassword },
        {
          new: true,
        }
      );
      res.status(200).json(data);
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
