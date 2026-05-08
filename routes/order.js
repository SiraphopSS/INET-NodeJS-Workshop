var express = require('express');
var router = express.Router();
var orderSchema = require('../models/order.model')
const verifyToken = require('../middleware/token.middleware.js')

router.get('/', verifyToken, async function(req, res, next) {
  try {
    let orders = await orderSchema.find()

    res.status(200).send({status: "200", message: "Success.", orders })
  } catch (error) {
    res.status(500).send({status: "500", message: error.message })
  }
});

module.exports = router;