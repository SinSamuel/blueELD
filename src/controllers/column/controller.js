const Column = require("../../models/column");
const Expense = require("../../models/expense");

class Stripe {
  // to get all all expenses
  getColumns = async (req, res) => {
    try {
      const data = await Column.findOne({ user: "123" });
      if (data) res.status(200).json(data.columns);
      else res.status(200).json([]);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  };

  // add column
  addColumn = async (req, res) => {
    try {
      console.log(req.body);
      const data = await Column.findOneAndUpdate(
        { user: "123" },
        { $push: { columns: req.body } },
        { new: true }
      );

      res.status(201).json({
        data: data.columns[data.columns.length - 1],
        message: "column added successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  };

  // delete column
  deleteColumn = async (req, res) => {
    try {
      const { index } = req.params;
      let column = await Column.findOne({ user: "123" });
      column = column?.columns?.find((el) => el.index == index);
      let data = await Column.findOneAndUpdate(
        { user: "123" },
        { $pull: { columns: { index: parseInt(index) } } },
        { new: true }
      );

      let arr = data.columns;
      // Update the indexes of the remaining objects

      arr.forEach((customer, index) => {
        customer.index = index;
      });

      data = await Column.findOneAndUpdate(
        { user: "123" },
        { columns: arr },
        { new: true }
      );

      let expenses = await Expense.find({ user: "123" });
      await Promise.all(
        expenses.map(async (elem) => {
          let object = elem.data;
          delete object[column.title];
          await Expense.findByIdAndUpdate(
            elem._id,
            { data: object },
            { new: true }
          );
        })
      );

      res.status(201).json({
        data: data.columns,
        message: "column delete successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  };

  moveColumn = async (req, res) => {
    try {
      let { index, move } = req.params;
      index = parseInt(index);
      console.log(req.params);
      let data = await Column.findOne({ user: "123" });
      let arr = data?.columns;

      const targetIndex = arr.findIndex((obj) => obj.index == index);

      console.log(targetIndex);

      // Check if the target object is not the first object in the array
      if (move == "left") {
        if (targetIndex > 0) {
          // Replace the id with the id from the previous object
          arr[targetIndex].index = arr[targetIndex - 1].index;
          arr[targetIndex - 1].index = index;
          arr.sort((a, b) => a.index - b.index);
          data = await Column.findOneAndUpdate(
            { user: "123" },
            { columns: arr },
            { new: true }
          );
          // let expenses = await Expense.find({ user: "123" });
          // console.log(expenses.data, "before");
          // await Promise.all(
          //   expenses?.map(async (elem) => {
          //     let obj = elem?.data;
          //     let temp = obj[index];
          //     obj[index] = obj[index - 1];
          //     obj[index - 1] = temp;
          //     let update = await Expense.findByIdAndUpdate(
          //       elem?._id,
          //       { data: obj },
          //       { new: true }
          //     );
          //   })
          // );
          // console.log(expenses.data, "after");
          return res.status(200).json(data.columns);
        }
      } else {
        console.log("enter");
        arr[targetIndex].index = arr[targetIndex + 1].index;
        arr[targetIndex + 1].index = index;
        console.log(arr, "arr");
        arr.sort((a, b) => a.index - b.index);
        data = await Column.findOneAndUpdate(
          { user: "123" },
          { columns: arr },
          { new: true }
        );
        // let expenses = await Expense.find({ user: "123" });
        // await Promise.all(
        //   expenses?.map(async (elem) => {
        //     let obj = elem?.data;
        //     let temp = obj[index];
        //     obj[index] = obj[index + 1];
        //     obj[index + 1] = temp;
        //     let update = await Expense.findByIdAndUpdate(
        //       elem?._id,
        //       { data: obj },
        //       { new: true }
        //     );
        //   })
        // );
        return res.status(200).json(data.columns);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  };

  hideColumn = async (req, res) => {
    try {
      let { index } = req.params;
      console.log(req.params);
      let data = await Column.findOne({ user: "123" });
      let arr = data?.columns;
      arr = await Promise.all(
        arr?.map((elem) =>
          elem.index == parseInt(index)
            ? { ...elem, hide: elem.hide == false ? true : false }
            : elem
        )
      );
      console.log(arr);
      data = await Column.findOneAndUpdate(
        { user: "123" },
        { columns: arr },
        { new: true }
      );
      return res.status(200).json(data.columns);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  };

  shrinkColumn = async (req, res) => {
    try {
      let { index } = req.params;
      console.log(req.params);
      let data = await Column.findOne({ user: "123" });
      let arr = data?.columns;
      arr = await Promise.all(
        arr?.map((elem) =>
          elem.index == parseInt(index)
            ? { ...elem, shrink: elem.shrink == false ? true : false }
            : elem
        )
      );
      console.log(arr);
      data = await Column.findOneAndUpdate(
        { user: "123" },
        { columns: arr },
        { new: true }
      );
      return res.status(200).json(data.columns);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  };

  duplicateColumn = async (req, res) => {
    try {
      let { index } = req.params;
      let data = await Column.findOne({ user: "123" });
      let arr = data?.columns;
      let obj = arr?.find((elem) => elem.index == index);
      arr = [
        ...arr,
        {
          ...obj,
          index: arr.length + 1,
          title: obj.title + " (2)",
          dataIndex: obj.title.replace(/\s/g, "") + "(2)",
          key: obj.key.replace(/\s/g, "") + "(2)",
        },
      ];
      data = await Column.findOneAndUpdate(
        { user: "123" },
        { columns: arr },
        { new: true }
      );
      return res
        .status(200)
        .json({ data: data.columns, message: "column duplicate successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  };

  editColumn = async (req, res) => {
    try {
      // console.log(req.body);
      let { index } = req.params;
      let data = await Column.findOne({ user: "123" });
      let arr = data?.columns;
      let dup = arr.filter(
        (el) => el.title == req.body.title && el.index !== parseInt(index)
      );
      if (dup.length > 0) {
        return res.status(400).json({ message: "column name already exist" });
      } else {
        let object;
        arr = await Promise.all(
          arr?.map((elem) => {
            if (elem.index == parseInt(index)) {
              object = elem;
              return { ...req.body };
            } else {
              return elem;
            }
          })
        );
        console.log(object, "object");
        data = await Column.findOneAndUpdate(
          { user: "123" },
          { columns: arr },
          { new: true }
        );
        let expenses = await Expense.find({ user: "123" });
        await Promise.all(
          expenses.map(async (elem, key) => {
            let OBJ = elem.data;
            OBJ = { ...OBJ, [req.body.title]: OBJ[object.title] };
            let { [object.title]: oldName, ...rest } = OBJ;
            await Expense.findByIdAndUpdate(
              elem._id,
              { data: rest },
              { new: true }
            );
          })
        );
        // console.log(expenses);

        return res
          .status(201)
          .json({ data: data.columns, message: "column edit successfully" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  };
}

module.exports = new Stripe();
