const express = require("express");
const Data = require("../models/migrant");
const router = express.Router();
const Json2csvParser = require("json2csv").Parser;

router.post("/addMigrant", (req, res) => {
  const labourData = {};
  const { body } = req;
  labourData.type = body.type;
  labourData.state = body.state;
  labourData.district = body.district;
  labourData.campName = body.campName;
  labourData.runBy = body.runBy;
  labourData.facilities = body.facilities;
  labourData.employerName = body.employerName;
  labourData.sector = body.sector;
  labourData.locality = body.locality;
  labourData.address = body.address;
  labourData.name = body.name;
  labourData.age = body.age;
  labourData.gender = body.gender;
  labourData.occupation = body.occupation;
  labourData.mobile = body.mobile;
  labourData.lastAddress = body.lastAddress;
  labourData.nativeDistrict = body.nativeDistrict;
  labourData.nativeState = body.nativeState;
  labourData.haveBank = body.haveBank;
  labourData.haveJandhan = body.haveJandhan;
  labourData.accNo = body.accNo;
  labourData.ifsc = body.ifsc;
  labourData.ujjwala = body.ujjwala;
  labourData.aadhaar = body.aadhaar;
  const data = new Data(labourData);
  data
    .save()
    .then((resp) => {
      res.status(200).json({ success: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err: "internal server error" });
    });
});

router.get("/download", (req, res) => {
  Data.find({})
    .then((data) => {
      const fields = [
        "type",
        "state",
        "district",
        "campName",
        "runBy",
        "facilities",
        "employerName",
        "sector",
        "locality",
        "address",
        "name",
        "age",
        "gender",
        "occupation",
        "mobile",
        "lastAddress",
        "nativeDistrict",
        "nativeState",
        "haveBank",
        "haveJandhan",
        "accNo",
        "ifsc",
        "ujjwala",
        "aadhaar",
      ];
      const json2csvParser = new Json2csvParser({ fields });
      const csv = json2csvParser.parse(data);
      res.attachment("filename.csv");
      res.status(200).send(csv);
    })
    .catch((err) => {
      console.log(err);
      res.json({ error: "Something Went Wrong" });
    });
});

module.exports = router;
