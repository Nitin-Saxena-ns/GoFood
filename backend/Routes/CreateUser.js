const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret = "Mynameisnitinsaxenanitinnitin123";


//Create User
router.post(

  "/CreateUser",
  body("email").isEmail(),
  body("name").isLength({ min: 3 }),
  body("password", "password atleast 5 characters").isLength({ min: 5 }),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const salt = await bcrypt.genSalt(10);
    let secPass = await bcrypt.hash(req.body.password, salt);


    try {
      await User.create({
        name: req.body.name,
        location: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      res.json({ success: true });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);


//Login USer
router.post(
  "/LoginUser",
  body("email").isEmail(),
  body("password", "password atleast 5 characters").isLength({ min: 5 }),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let email = req.body.email;
    try {
      let userData = await User.findOne({ email })
      if (!userData) {
        return res.status(400).json({ errors: "enter valid email here" });
      }
      const passCompare = bcrypt.compare(req.body.password, userData.password)
      if (!passCompare) {
        return res.status(400).json({ errors: "Password is inccorrect" });
      }
      const data = {
        user: {
          id: userData.id
        }
      }
      const authToken = jwt.sign(data, jwtSecret);
      res.json({ success: true, authToken: authToken });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

module.exports = router;
