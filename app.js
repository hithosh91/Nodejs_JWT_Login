const express = require("express");
const dotenv = require("dotenv");
const mongooes = require("mongoose");
const Routs = require("./Routes/Routes");
const bodyparser = require("body-parser");
dotenv.config();

const port = process.env.PORT;
const url = process.env.URL;
const app = express();

app.use(bodyparser.json());
app.use("/user", Routs);

//midleware
//app.use(bodyparser.json());

//connecting DB

mongooes
  .connect(url)
  .then(() => {
    console.log(`db connected to ${url}`);
  })
  .catch((error) => {
    console.log(error);
  });

//

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
