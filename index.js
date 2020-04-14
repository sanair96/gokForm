const express = require("express");
require("dotenv").config();
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dataRoutes = require("./routes/migrant");
const path = require("path");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/data", dataRoutes);

if (process.env.NODE_ENV === "production") {
  // set static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("db connected"))
  .catch((err) => console.warn(err));

app.listen(process.env.PORT || 4000, () => {
  console.log("running");
});
