const router = require("express").Router();
const Users = require("../models/Users");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const { MONGO_URL, PASS_SEC, JWT_TOKEN, STRIPE_KEY } = require('../config/key')

// Register

router.post("/register", async (req, res) => {
  const newUser = new Users({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      PASS_SEC
    ).toString(),
  });
  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await Users.findOne({ username: req.body.username });
    if (!user) {
      return res.status(401).json("wrong Username");
    }
    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      PASS_SEC
    );

    const OrignalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    if (OrignalPassword !== req.body.password) {
      return res.status(401).json("wrong password");
    }
    const accessToken = jwt.sign(
      {
        id: user._id,

        isAdmin: user.isAdmin,
      },
      JWT_TOKEN
    );

    const { password, ...others } = user._doc;
    return res.status(200).json({ ...others, accessToken });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
