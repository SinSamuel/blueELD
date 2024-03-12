const Company = require("../../models/company");
const Employee = require("../../models/employee");
const Token = require("../../models/token");
const {
  sendEmailVerification,
  resetPasswordVerification,
} = require("../../utils/email");
const { hashString, compareString } = require("../../utils/helper");

class CompanyClass {
  //get company
  getCompany = async (req, res) => {
    try {
      const data = await Company.findById(req.params.id);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  };

  // add Company
  addCompany = async (req, res) => {
    try {
      const company = await Company.findOne({ email: req.body.email });

      if (company) {
        return res.status(400).json({ message: "email already exist" });
      }
      let allCompanies = await Company.find();
      let length = allCompanies.length + 1;
      const passwordHash = hashString(req.body.password);
      const data = await Company.create({
        ...req.body,
        password: passwordHash,
        accountNumber: `${length}${req.body.name}`,
        permissions: [
          "company",
          "equipment",
          "maps",
          "loads",
          "logs",
          "accounting",
          "archive",
          "settings",
        ],
      });
      let token = data.generateVerificationToken();
      await token.save();
      await sendEmailVerification(
        {
          code: token.token,
        },
        data?.email
      );
      res.status(201).json({ message: "Company Added!", data: data });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  };

  login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const company = await Company.findOne({ email });
      let employee = await Employee.findOne({ email });
      console.log(company, employee, "answer");
      if (company) {
        const result = compareString(password, company?.password);
        if (result) {
          return res
            .status(200)
            .json({ message: "Login success", data: company });
        } else {
          return res.status(401).json({ message: "invalid credentials" });
        }
      } else if (employee) {
        const result = compareString(password, employee?.password);
        console.log(result);
        if (result) {
          employee = await Employee.findOne({ email }).populate("company");
          return res
            .status(200)
            .json({ message: "Login success", data: employee });
        } else {
          return res.status(401).json({ message: "invalid credentials" });
        }
      } else {
        return res.status(401).json({ message: "invalid credentials" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  };

  // forget password
  forgetPassword = async (req, res) => {
    try {
      const { email } = req.body;
      const company = await Company.findOne({ email });
      const employee = await Employee.findOne({ email });

      if (company) {
        let token = company.generateVerificationToken();
        await token.save();
        await resetPasswordVerification(
          {
            code: token.token,
          },
          company?.email
        );
        return res
          .status(200)
          .json({ message: "Please verify email", data: company?._id });
      } else if (employee) {
        let token = employee.generateVerificationToken();
        await token.save();
        await resetPasswordVerification(
          {
            code: token.token,
          },
          employee?.email
        );
        return res
          .status(200)
          .json({ message: "Please verify email", data: employee?._id });
      } else {
        return res.status(400).json({ message: "email not exist" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  };

  // reset password
  resetPassword = async (req, res) => {
    try {
      const { password, token } = req.body;
      const result = await Token.findOne({ token });

      if (!result) {
        return res.status(400).json({
          message: "invalid Token",
        });
      }
      const passwordHash = hashString(password);
      let company = await Company.findById(result?.refId);
      let employee = await Employee.findById(result?.refId);
      if (company) {
        await Company.findByIdAndUpdate(
          result?.refId,
          { password: passwordHash },
          { new: true }
        );
        return res.status(200).json({ message: "Password Reset Success" });
      } else if (employee) {
        await Employee.findByIdAndUpdate(
          result?.refId,
          { password: passwordHash },
          { new: true }
        );
        return res.status(200).json({ message: "Password Reset Success" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  };

  // security code
  handleSecurityCode = async (req, res) => {
    try {
      const { password, token } = req.body;
      const result = await Token.findOne({ token });

      if (!result) {
        return res.status(400).json({
          message: "invalid Token",
        });
      }
      if (password) {
        const passwordHash = hashString(password);
        let company = await Company.findByIdAndUpdate(
          result?.refId,
          { password: passwordHash },
          { new: true }
        );

        let employee = await Employee.findByIdAndUpdate(
          result?.refId,
          { password: passwordHash },
          { new: true }
        );

        res.status(200).json({ message: "Password Reset Success" });
      } else {
        let c_data = await Company.findById(result?.refId);
        let e_data = await Employee.findById(result?.refId);
        if (c_data)
          return res
            .status(200)
            .json({ message: "Login Success", data: c_data });
        else if (e_data) {
          return res
            .status(200)
            .json({ message: "Login Success", data: e_data });
        }
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  };

  // resend code
  resendCode = async (req, res) => {
    try {
      const { target } = req.body;
      let company = await Company.findById(req.params.id);
      let employee = await Employee.findById(req.params.id);
      if (company) {
        let token = company.generateVerificationToken();
        await token.save();
        if (target == "email-verify") {
          await sendEmailVerification(
            {
              code: token.token,
            },
            company?.email
          );
        } else {
          await resetPasswordVerification(
            {
              code: token.token,
            },
            company?.email
          );
        }
        res.status(200).json({ message: "Security Code Send!" });
      } else if (employee) {
        let token = employee.generateVerificationToken();
        await token.save();
        if (target == "email-verify") {
          await sendEmailVerification(
            {
              code: token.token,
            },
            company?.email
          );
        } else {
          await resetPasswordVerification(
            {
              code: token.token,
            },
            company?.email
          );
        }
        res.status(200).json({ message: "Security Code Send!" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  };
}

module.exports = new CompanyClass();
