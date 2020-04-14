const mongoose = require("mongoose");
const schema = mongoose.Schema;

const migrantSchema = new schema({
  type: {
    type: String,
  },
  state: {
    type: String,
  },
  district: {
    type: String,
  },
  campName: {
    type: String,
  },
  runBy: {
    type: String,
  },
  facilities: {
    type: String,
  },
  employerName: {
    type: String,
  },
  sector: {
    type: String,
  },
  locality: {
    type: String,
  },
  address: {
    type: String,
  },
  name: {
    type: String,
  },
  age: {
    type: String,
  },
  gender: {
    type: String,
  },
  occupation: {
    type: String,
  },
  mobile: {
    type: String,
  },
  lastAddress: {
    type: String,
  },
  nativeDistrict: {
    type: String,
  },
  nativeState: {
    type: String,
  },
  haveBank: {
    type: String,
  },
  haveJandhan: {
    type: String,
  },
  accNo: {
    type: String,
  },
  ifsc: {
    type: String,
  },
  ujjwala: {
    type: String,
  },
  aadhaar: {
    type: String,
  },
});

module.exports = mongoose.model("migrant", migrantSchema);
