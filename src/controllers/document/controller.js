const Document = require("../../models/document");

class DocumentClass {
  //get all documents of employee
  getEmployeeDocuments = async (req, res) => {
    try {
      console.log(req.params.id);
      const data = await Document.find({
        refId: req.params.id,
        archive: false,
      });
      console.log(data);
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
      console.log(req.body);
      const data = await Document.create({ ...req.body, refId: req.params.id });
      res.status(201).json({ message: "Document Added!" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  };

  // document edited
  editDocuemnt = async (req, res) => {
    try {
      const { id } = req.params;
      const data = await Document.findByIdAndUpdate(id, req.body, {
        new: true,
      });
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
      const data = await Document.find({ archive: true });
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  };
}

module.exports = new DocumentClass();
