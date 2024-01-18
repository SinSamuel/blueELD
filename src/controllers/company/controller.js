const Company = require("../../models/company");

class CompanyClass {
  //get company
  getCompany = async (req, res) => {
    try {
      const data = await Company.find();
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  };

  // add Company
  addCompany = async (req, res) => {
    try {
      const data = await Company.create(req.body);
      res.status(201).json({ message: "Company Added!" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  };
}

module.exports = new CompanyClass();
