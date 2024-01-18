const mongoose = require("mongoose");
const Company = require("../models/company");

mongoose.set("strictQuery", false);

mongoose
  .connect(process.env.DB)
  .then(async () => {
    // await Company.create({
    //   name: "Blue ELD Company",
    //   firstName: "don",
    //   lastName: "bradman",
    //   email: "example@gmail.com",
    //   phone: "03008472374",
    //   address: "Raleigh, NC, 27617",
    //   timeZone: "EST Eastern Standard Times",
    //   accountNumber: "1AAAA",
    //   mcNumber: "23949095345",
    //   dotNumber: "19929748",
    // });
    console.log("DB successfully connected!");
  })
  .catch((err) => {
    console.log(err);
  });
