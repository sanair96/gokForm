const express = require("express");
const router = express.Router();
const axios = require("axios");
const storage = require("node-persist");
const jwt = require("jsonwebtoken");

router.post("/generateOtp", (req, res) => {
  axios
    .post(
      "https://us-central1-covid-19-1586286476021.cloudfunctions.net/OTPVerification",
      {
        mobile: req.body.mobile,
      }
    )
    .then(async (resp) => {
      if (resp.data.msg != "Success") {
        res.json({
          success: false,
          msg: "Not Authorised",
        });
      } else {
        await storage.init();
        await storage.setItem(req.body.mobile, resp.data.otp);
        res.json({ success: true });
      }

      console.log(resp.data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err: "internal server error" });
    });
});

router.post("/validate", async (req, res) => {
  await storage.init();
  const otp = await storage.getItem(req.body.mobile);
  if (otp == req.body.otp) {
    jwt.sign(
      { mobile: req.body.mobile },
      "m16@Health",
      { expiresIn: 360000000000000000000000000000000000 },
      (err, token) => {
        res.json({
          success: true,
          token: "Bearer " + token,
        });
      }
    );
  } else {
    res.json({ success: false, msg: "incorrect or expired otp" });
  }
});

module.exports = router;
