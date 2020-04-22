const express = require("express");
require("dotenv").config();
const app = express();
const bodyParser = require("body-parser");
const Sequelize = require("sequelize");
const Helmet = require("helmet");
const sequelize = new Sequelize(process.env.dbname, process.env.dbusername, process.env.dbpassword, {
  host: process.env.hostname,
  dialect: "mysql",
});

const dataRoutes = require("./routes/migrant");
const authRoutes = require("./routes/auth");
const path = require("path");

app.use(Helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/data", dataRoutes);
app.use("/auth", authRoutes);

if (process.env.NODE_ENV === "production") {
  // set static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

sequelize
  .authenticate()
  .then(() => console.log("db connected"))
  .catch((err) => console.warn(err));

app.listen(process.env.PORT || 4000, () => {
  console.log(`running on ${process.env.PORT || 4000}`);
});
