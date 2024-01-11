const Expense = require("../../models/expense");
const Column = require("../../models/column");

class Stripe {
  // to get all all expenses
  getExpenses = async (req, res) => {
    try {
      const data = await Expense.find({
        user: "123",
        table: "expense",
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

  //   add expense
  addExpense = async (req, res) => {
    try {
      const data = await Expense.create({ data: req.body });
      res.status(201).json({ ...data.data, _id: data._id });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  };

  //   edit expense
  editExpense = async (req, res) => {
    try {
      const { id } = req.params;
      console.log(id, req.body);
      const data = await Expense.findByIdAndUpdate(
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

  //   delete expense
  deleteExpenses = async (req, res) => {
    try {
      const condition = {
        _id: req.body,
      };
      console.log(req.body);
      await Expense.deleteMany(condition);
      res.status(200).json(req.body);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  };
}

module.exports = new Stripe();
