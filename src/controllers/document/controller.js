const { default: mongoose } = require("mongoose");
const Company = require("../../models/company");
const Document = require("../../models/document");
const Employee = require("../../models/employee");

class DocumentClass {
  //get all documents of employee
  getEmployeeDocuments = async (req, res) => {
    try {
      let { id, role } = req.params;
      let data;
      if (role == "admin") {
        data = await Document.find({
          companyRef: id,
        }).populate(["companyRef", "company"]);
      } else if (role == "employee") {
        data = await Document.find({
          employeeRef: id,
        }).populate(["employeeRef", "company"]);
      } else {
        data = await Document.find({
          equipmentRef: id,
        }).populate(["equipmentRef", "company"]);
      }
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  };

  // get document by id
  getDocumentById = async (req, res) => {
    try {
      const data = await Document.findById(req.params.id);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  };

  // add document
  addDocument = async (req, res) => {
    try {
      let totalSize = 0;
      await Promise.all(
        req.body.documents?.map((elem) => {
          totalSize = totalSize + elem?.kbSize;
        })
      );

      let data;
      let result = await Company.findById(req.params.id);
      if (!result) {
        result = await Employee.findById(req.params.id);
      }

      if (result?.role == "admin") {
        data = await Document.create({
          ...req.body,
          companyRef: req.params.id,
          size: totalSize.toFixed(2),
        });
      } else if (result?.role == "employee") {
        data = await Document.create({
          ...req.body,
          employeeRef: req.params.id,
          size: totalSize.toFixed(2),
        });
      } else {
        data = await Document.create({
          ...req.body,
          equipmentRef: req.params.id,
          size: totalSize.toFixed(2),
        });
      }

      await Company.findByIdAndUpdate(
        req.body.company,
        { $inc: { spaceOccupied: totalSize.toFixed(2) } },
        { new: true }
      );

      res.status(201).json({ message: "Document Added!", data: data });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  };

  // document edited
  editDocuemnt = async (req, res) => {
    try {
      const { id } = req.params;
      let totalSize = 0;
      await Promise.all(
        req.body.documents?.map((elem) => {
          totalSize = totalSize + elem?.kbSize;
        })
      );
      totalSize = totalSize.toFixed(2);
      let doc = await Document.findById(id);
      let company = await Company.findById(doc.company);
      let size = parseFloat(company.spaceOccupied) - parseFloat(doc.size);
      const data = await Document.findByIdAndUpdate(
        id,
        { ...req.body, size: totalSize },
        {
          new: true,
        }
      );
      size = (parseFloat(size) + parseFloat(totalSize)).toFixed(2);
      // console.log(size, "size");
      await Company.findByIdAndUpdate(
        company._id,
        { spaceOccupied: size },
        { new: true }
      );

      res.status(200).json({ data, message: "Document Edited!" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  };

  // docs move to archive
  moveToArchive = async (req, res) => {
    try {
      const data = await Document.findByIdAndUpdate(
        req.params.id,
        { archive: true },
        { new: true }
      );
      res.status(200).json({ data, message: "Move To Archive" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  };

  // get archive docs
  archiveDocuments = async (req, res) => {
    try {
      const { id } = req.params;
      console.log(id);
      const docs = await Document.find({ company: id }).populate([
        "companyRef",
        "employeeRef",
      ]);
      let employees = await Employee.find({ company: id }).select([
        "company",
        "accountNumber",
        "firstName",
        "lastName",
        "role",
      ]);
      let array = [];
      // console.log(employees);
      await Promise.all(
        employees?.map(async (elem) => {
          let data = await Document.aggregate([
            {
              $match: {
                employeeRef: elem?._id, // Match documents with the specified refId
              },
            },
            {
              $group: {
                _id: null,
                totalSize: { $sum: "$size" },
                totalCount: { $sum: 1 },
              },
            },
          ]);
          array.push({
            ...elem?._doc,
            totalSize: data[0]?.totalSize,
            count: data[0]?.totalCount,
          });
        })
      );

      let company = await Company.findById(id).select([
        "firstName",
        "lastName",
        "accountNumber",
        "spaceOccupied",
        "role",
      ]);

      let mongooseId = new mongoose.Types.ObjectId(id);

      let data = await Document.aggregate([
        {
          $match: {
            companyRef: mongooseId, // Match documents with the specified refId
          },
        },
        {
          $group: {
            _id: null,
            totalSize: { $sum: "$size" },
            totalCount: { $sum: 1 },
          },
        },
      ]);

      console.log(data);

      array.push({
        ...company._doc,
        totalSize: data[0]?.totalSize,
        count: data[0]?.totalCount,
      });

      res.status(200).json({
        docs: docs,
        folders: array,
        company: {
          ...company._doc,
          remainingSpace: (5242880 - company._doc?.spaceOccupied) / 1024 / 1024,
          percentage: (company._doc?.spaceOccupied / 5242880) * 100,
        },
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  };

  // edit docs
  editDocuuments = async (req, res) => {
    try {
      let documents = req.body;
      await Promise.all(
        documents?.map(async (doc) => {
          const data = await Document.findByIdAndUpdate(doc._id, doc, {
            new: true,
          });
        })
      );
      res.status(200).json(documents);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  };
}

module.exports = new DocumentClass();
