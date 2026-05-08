var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt')
var userSchema = require('../models/user.model')


router.post('/', async function(req, res, next) {
  try {
    let { username, password } = req.body
    let user = await userSchema.findOne({ username: username });
    if (!user) {
        return res.status(400).send({ status: "400", message: "User not found" })
    }
    if (!user.auth) {
        return res.status(401).send({ status: "401", message: "No Authorize. Please Contact Admin." })
    }
    passwordCheck = await bcrypt.compare((String(password)), user.password)
    if (!passwordCheck) {
        return res.status(401).send({ status: "401", message: "No Authorize. Wrong Password!" })
    }
    res.status(200).send({ status: "200", message: "Login Success. Welcome User!", user })
  } catch (error) {
    res.status(500).send({ status: "500", message: error.message })
  }
});

module.exports = router;