require("dotenv").config();
const express = require("express");
const cors = require("cors");
const s3Config = require("./Router/s3Config");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use("/bucket", s3Config);

app.listen(process.env.PORT || 8008, (err) => {
  if (!err) {
    console.log(`server is running in the port ${process.env.PORT}`);
  }
});
