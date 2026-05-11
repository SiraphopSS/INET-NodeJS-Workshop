var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken')
var userSchema = require('../models/user.model')


router.post('/', async function(req, res, next) {
  try {
    let { username, password } = req.body
    let user = await userSchema.findOne({ username: username });
    if (!user) {
        return res.status(400).send({ status: "400", message: "User not found" })
    }
    if (!user.auth && user.role !== "admin") {
        return res.status(401).send({ status: "401", message: "No Authorize. Please Contact Admin." })
    }
    passwordCheck = await bcrypt.compare((String(password)), user.password)
    if (!passwordCheck) {
        return res.status(401).send({ status: "401", message: "No Authorize. Wrong Password!" })
    }

    if (user.role === "admin") {
      let adminToken = await jwt.sign({ id: user._id }, String(process.env.ADMIN_JWT_SECRET), { expiresIn: '2h' })
      return res.status(200).send({ status: "200", message: "Login Success. Welcome Admin!", user, token: adminToken })
    }

    let token = await jwt.sign({ id: user._id }, String(process.env.JWT_SECRET), { expiresIn: '2h' })
    res.status(200).send({ status: "200", message: "Login Success. Welcome User!", user, token: token })
  } catch (error) {
    res.status(500).send({ status: "500", message: error.message })
  }
});

module.exports = router;