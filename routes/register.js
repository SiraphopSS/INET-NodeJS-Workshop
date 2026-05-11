var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt')
var userSchema = require('../models/user.model')


router.post('/', async function(req, res, next) {
  try {
    let { username, password, role } = req.body
  
    let existingUser = await userSchema.findOne({ username: username })
    if (existingUser) {
        return res.status(400).json({ status: "400", message: "Duplicate Username." })
    }
    let hashPassword = await bcrypt.hash(String(password), 10)
    let user = new userSchema({
        username: username,
        password: hashPassword,
        auth: false,
        role: role
    })

    await user.save()

    res.status(201).send({ status: "201", message: "User created successfully", user })
  } catch (error) {
    res.status(500).send({ status: "500", message: error.message })
  }
});

module.exports = router;