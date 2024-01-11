require("dotenv").config();
const express = require("express");
const cors = require("cors");
require("dotenv").config({ path: "src/.env" });
const app = express();
require("./src/db/connection");
const routes = require("./src/routes");
const Column = require("./src/models/column");

app.use(cors());

app.use(express.json({ limit: "25mb" }));

app.use(express.urlencoded({ limit: "25mb", extended: true }));

app.use(express.static("build"));
app.use("/public", express.static("public"));
app.use("/api", routes);

app.get("/", (req, res) => {
  res.send("hi there");
  res.end();
});

let data = [
  {
    title: "Date Paid",
    dataIndex: "date_paid",
    dataType: "date",
    key: "date_paid",
    editable: false,
    index: 0,
  },
  {
    title: "Category",
    dataIndex: "category",
    dataType: "text",
    key: "category",
    editable: false,
    index: 1,
    editable: false,
  },
  {
    title: "Expense",
    dataIndex: "expense",
    dataType: "text",
    key: "expense",
    index: 2,
    editable: false,
  },
  {
    title: "Type",
    dataIndex: "type",
    dataType: "select",
    key: "type",
    index: 3,
    editable: false,
  },
  {
    title: "Unit",
    dataIndex: "unit",
    dataType: "number",
    key: "unit",
    index: 4,
    editable: false,
  },
  {
    title: "Cost",
    dataIndex: "cost",
    dataType: "number",
    key: "cost",
    index: 5,
    editable: false,
  },
  {
    title: "Paid With",
    dataIndex: "paid_with",
    dataType: "text",
    key: "paid_with",
    index: 6,
    editable: false,
  },
  {
    title: "Seller",
    dataIndex: "seller",
    dataType: "text",
    key: "seller",
    index: 7,
    editable: false,
  },
  {
    title: "Notes",
    dataIndex: "notes",
    dataType: "text",
    key: "notes",
    index: 8,
    editable: false,
  },
];

Column.create({ user: "123", columns: data });

const PORT = process.env.PORT || 4004;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
