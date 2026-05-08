var express = require('express');
var router = express.Router();
var userSchema = require('../models/user.model')
const authMiddleware = require('../middleware/auth.middleware')


router.put('/:id/approve', authMiddleware, async function(req, res, next) {
  try {
    let { id } = req.params
    let { auth } = req.body

    let user = await userSchema.findByIdAndUpdate(id, {
      auth: auth
    }, { returnDocument: 'after' })

    res.status(200).send({ status: "200", message: "User Approved Success.", user })
  } catch (error) {
    res.status(500).send({ status: "500", message: error.message })
  }
});

module.exports = router;
