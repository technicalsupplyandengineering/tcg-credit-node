const express = require("express");
const cors = require("cors");
const PORT = 8080;
const s3Config = require("./Router/s3Config");

const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use("/bucket", s3Config);

app.listen(PORT || 8080, (err) => {
  if (!err) {
    console.log(`server is running in the port ${PORT}`);
  }
});
