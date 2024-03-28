require("dotenv").config();
const express = require("express");
const cors = require("cors");
require("dotenv").config({ path: "src/.env" });
const app = express();
require("./src/db/connection");
const routes = require("./src/routes");
const Column = require("./src/models/column");
const fs = require("fs");
const path = require("path");

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

let data2 = [
  {
    title: "Unit #",
    dataIndex: "unit",
    dataType: "text",
    key: "unit",
    index: 0,
    max: 20,
    editable: true,
    hide: false,
    shrink: false,
    selectedType: "Single Text",
    className: "header-table",
  },
  {
    title: "Driver",
    dataIndex: "driver",
    dataType: "text",
    key: "driver",
    index: 1,
    max: 20,
    editable: true,
    hide: false,
    shrink: false,
    selectedType: "Single Text",
    className: "header-table",
  },
  {
    title: "Start Date",
    dataIndex: "start_date",
    dataType: "date",
    key: "start_date",
    index: 2,
    editable: true,
    hide: false,
    shrink: false,
    selectedType: "Date",
    className: "header-table",
  },
  {
    title: "End Date",
    dataIndex: "end_date",
    dataType: "date",
    key: "end_date",
    index: 3,
    editable: true,
    hide: false,
    shrink: false,
    selectedType: "Date",
    className: "header-table",
  },
  {
    title: "Miles",
    dataIndex: "miles",
    dataType: "text",
    key: "miles",
    index: 4,
    max: 20,
    editable: true,
    hide: false,
    shrink: false,
    selectedType: "Single Text",
    className: "header-table",
  },
  {
    title: "Net",
    dataIndex: "net",
    dataType: "text",
    key: "net",
    index: 5,
    max: 20,
    editable: true,
    hide: false,
    shrink: false,
    selectedType: "Single Text",
    className: "header-table",
  },
  {
    title: "Status",
    dataIndex: "status",
    dataType: "select",
    key: "status",
    index: 6,
    max: 20,
    editable: true,
    hide: false,
    shrink: false,
    selectedType: "Multiselect",
    className: "header-table",
  },
  {
    title: "Notes",
    dataIndex: "notes",
    dataType: "text",
    key: "notes",
    index: 7,
    editable: true,
    hide: false,
    shrink: false,
    selectedType: "Single Text",
    className: "header-table",
  },
];

let data3 = [
  {
    title: "Unit #",
    dataIndex: "unit",
    dataType: "text",
    key: "unit",
    index: 0,
    max: 20,
    editable: true,
    hide: false,
    shrink: false,
    selectedType: "Single Text",
    className: "header-table",
  },
  {
    title: "Date",
    dataIndex: "date",
    dataType: "date",
    key: "date",
    index: 1,
    max: 20,
    editable: true,
    hide: false,
    shrink: false,
    selectedType: "Date",
    className: "header-table",
  },
  {
    title: "Odometer",
    dataIndex: "odometer",
    dataType: "text",
    key: "odometer",
    index: 2,
    max: 20,
    editable: true,
    hide: false,
    shrink: false,
    selectedType: "Single Text",
    className: "header-table",
  },
  {
    title: "Part",
    dataIndex: "part",
    dataType: "text",
    key: "part",
    index: 3,
    max: 20,
    editable: true,
    hide: false,
    shrink: false,
    selectedType: "Single Text",
    className: "header-table",
  },
  {
    title: "Cost",
    dataIndex: "cost",
    dataType: "text",
    key: "cost",
    index: 4,
    max: 20,
    editable: true,
    hide: false,
    shrink: false,
    selectedType: "Single Text",
    className: "header-table",
  },
  {
    title: "Notes",
    dataIndex: "notes",
    dataType: "text",
    key: "notes",
    index: 5,
    max: 20,
    editable: true,
    hide: false,
    shrink: false,
    selectedType: "Single Text",
    className: "header-table",
  },
];

let data4 = [
  {
    title: "Bol#",
    dataIndex: "bol",
    dataType: "text",
    key: "bol",
    index: 1,
    max: 20,
    editable: true,
    hide: false,
    shrink: false,
    selectedType: "Single Text",
    className: "header-table",
  },
  {
    title: "Driver Name",
    dataIndex: "driver",
    dataType: "select",
    key: "driver",
    options: true,
    index: 2,
    editable: true,
    hide: false,
    shrink: false,
    selectedType: "Multiselect",
    className: "header-table",
  },
  {
    title: "Date",
    dataIndex: "p_date",
    dataType: "date",
    key: "p_date",
    index: 3,
    width: 80,
    editable: true,
    hide: false,
    shrink: false,
    selectedType: "Date",
    className: "header-table",
  },
  {
    title: "Date",
    dataIndex: "d_date",
    dataType: "date",
    key: "d_date",
    index: 4,
    width: 80,
    editable: true,
    hide: false,
    shrink: false,
    selectedType: "Date",
    className: "header-table",
  },
  {
    title: "Location",
    dataIndex: "p_location",
    dataType: "text",
    key: "p_location",
    index: 5,
    width: 110,
    editable: true,
    hide: false,
    shrink: false,
    selectedType: "Single Text",
    className: "header-table",
  },
  {
    title: "Location",
    dataIndex: "d_location",
    dataType: "text",
    key: "d_location",
    index: 6,
    width: 110,
    editable: true,
    hide: false,
    shrink: false,
    selectedType: "Single Text",
    className: "header-table",
  },
  {
    title: "Rate",
    dataIndex: "rate",
    dataType: "text",
    key: "rate",
    index: 7,
    max: 20,
    editable: true,
    hide: false,
    shrink: false,
    selectedType: "Single Text",
    className: "header-table",
  },
  {
    title: "Dispatch",
    dataIndex: "dispatcher",
    dataType: "select",
    key: "dispatcher",
    index: 8,
    max: 20,
    options: true,
    editable: true,
    hide: false,
    shrink: false,
    selectedType: "Multiselect",
    className: "header-table",
  },
  {
    title: "Broker",
    dataIndex: "broker",
    dataType: "text",
    key: "broker",
    index: 9,
    max: 20,
    editable: true,
    hide: false,
    shrink: false,
    selectedType: "Single Text",
    className: "header-table",
  },
  {
    title: "Status",
    dataIndex: "status",
    dataType: "select",
    key: "status",
    index: 10,
    editable: true,
    hide: false,
    shrink: false,
    selectedType: "Multiselect",
    className: "header-table",
  },
  {
    title: "Notes",
    dataIndex: "notes",
    dataType: "text",
    key: "notes",
    index: 11,
    editable: true,
    hide: false,
    shrink: false,
    selectedType: "Single Text",
    className: "header-table",
  },
];

// Column.create({ user: "123", columns: data });
// Column.create({ user: "trip", columns: data2 });
// Column.create({ user: "maintenance", columns: data3 });
// Column.create({ user: "load", columns: data4 });

// const imageFolderPath = "D:/blue"; // Your folder path

// app.get("/api/images", (req, res) => {
//   fs.readdir(imageFolderPath, (err, files) => {
//     if (err) {
//       console.error("Error reading directory:", err);
//       res.status(500).json({ error: "Error reading directory" });
//       return;
//     }

//     const imageFiles = files.filter((file) => {
//       return (
//         file.endsWith(".jpg") || file.endsWith(".jpeg") || file.endsWith(".png")
//       );
//     });

//     console.log(imageFiles, "imagesFiles");

//     const imageUrls = imageFiles.map((file) => {
//       return `/images/${file}`;
//     });
//     console.log(imageUrls, "imagesFiles");

//     res.json(imageUrls);
//   });
// });

// app.use("/images", express.static(imageFolderPath));

// app.get("/getImages", (req, res) => {
//   const directoryPath = "D:/images";
//   fs.readdir(directoryPath, (err, files) => {
//     if (err) {
//       console.error("Error reading directory:", err);
//       res.status(500).json({ error: "Failed to read directory" });
//       return;
//     }
//     const imageFiles = files.filter((file) =>
//       /\.(jpg|jpeg|png|pdf)$/i.test(file)
//     );
//     const imagePaths = imageFiles.map((file) => path.join(directoryPath, file));
//     res.json({ data: imagePaths });
//   });
// });

const PORT = process.env.PORT || 4004;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
