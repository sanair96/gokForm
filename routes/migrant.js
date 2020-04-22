const express = require("express");
const {MigrantSchema, GroupDataSchema} = require("../models/migrant");
const router = express.Router();
const Sequelize = require('sequelize');
const Json2csvParser = require("json2csv").Parser;
const Op = Sequelize.Op;
router.post('/groupdata', (req,res)=> {
  const groupData= {...req.body.params};
  console.log(JSON.stringify(groupData));
  GroupDataSchema.findOrCreate({where:{...groupData}, defaults: {...groupData}}).then(([,created]) => {
    if(created) {
      res.send({success: true});
    } else {
      res.send({success: true, msg: "Data already present"});
    }
  }).catch(e => {
    console.log(e.message)
    res.send({success: false, error: true, msg: "Something went wrong", message: e.message})
  });
});

router.get('/getgroups', (req,res) => {
  const {query} = req;
  const { column='address', skip:offset=0, limit=0} = query;
  GroupDataSchema.findAll().then(groups => {
    res.send({success: true, data: groups});
  }).catch(e => {
    res.send({success: false, error: true, msg: "Something went wrong", message: e.message});
  })
})

router.post("/addMigrant", (req, res) => {
  const labourData = {};
  const { body } = req;
  labourData.groupId = body.groupId;
  labourData.type = body.type|| "";
  labourData.state = body.state || "";
  labourData.district = body.district || "";
  labourData.campName = body.campName || "";
  labourData.runBy = body.runBy || "";
  labourData.facilities = body.facilities ||"";
  labourData.employerName = body.employerName ||"";
  labourData.sector = body.sector ||"";
  labourData.locality = body.locality ||"";
  labourData.address = body.address ||"";
  labourData.name = body.name || "";
  labourData.age = body.age || "";
  labourData.gender = body.gender || "";
  labourData.occupation = body.occupation || "";
  labourData.mobile = body.mobile || "";
  labourData.lastAddress = body.lastAddress || "";
  labourData.nativeDistrict = body.nativeDistrict || "";
  labourData.nativeState = body.nativeState || "";
  labourData.haveBank = body.haveBank || "";
  labourData.haveJandhan = body.haveJandhan || "";
  labourData.accNo = body.accNo || "";
  labourData.ifsc = body.ifsc || "";
  labourData.ujjwala = body.ujjwala || "";
  labourData.aadhaar = body.aadhaar || "";

  MigrantSchema.findOrCreate({where: {...labourData}, defaults: {...labourData}}).then(([, created]) => {
    if(created) {
      res.send({success: true});
    } else {
      res.send({success: true, msg: "Data already present"});
    }
  }).catch(e => {
    console.log(e.message)
    res.send({success: false, error: true, msg: "Something went wrong", message: e.message})
  });

});

router.get("/download", (req, res) => {
  MigrantSchema.findAll()
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
