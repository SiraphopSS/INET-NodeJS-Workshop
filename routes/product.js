var express = require('express');
var router = express.Router();
var productSchema = require('../models/product.model')
var orderSchema = require('../models/order.model')

router.post('/', async function(req, res, next) {
    try {
        let { name, price, description, quantity } = req.body

        if (!name || !price || !description || !quantity) {
            return res.status(400).send({ status: "400", message: "All fields are required." })
        }

        let product = new productSchema({
            name: name,
            price: price,
            description: description,
            quantity: quantity,
        })

        await product.save()

        res.status(201).send({ status: "201", message: "Product Created Success.", product })
    } catch (error) {
        res.status(500).send({ status: "500", message: error.message })
    }
})

router.get('/', async function(req, res, next) {
  try {
    let products = await productSchema.find({})
    res.status(200).send({status: "200", message: "Success.", products })
  } catch (error) {
    res.status(500).send({status: "500", message: error.message })
  }
});

router.get('/:id', async function(req, res, next) {
    try {
        let { id } = req.params

        let product = await productSchema.findById(id)

        res. status(200).send({status: "200", message: "Success.", product})

    } catch (error) {
        res.status(400).send({status: "400", message: "product not found", product: null })
    }
})

router.put('/:id', async function(req, res, next) {
    try {
        let { id } = req.params
        let { name, price, description, quantity } = req.body

        if (!name || !price || !description || !quantity) {
            return res.status(400).send({ status: "400", message: "All fields are required." })
        }

        let product = await productSchema.findByIdAndUpdate(id, {
            name: name,
            price: price,
            description: description,
            quantity: quantity
        }, { new: true })
        if (!product) {
            res.status(400).send({ status: "400", message: 'Product not found!' })
        }

        res.status(200).send({status: "200", message: "Product Updated Success." , product})
    } catch (error) {
        res.status(500).send({status: "500", message: error.message })
    }
})

router.delete('/:id', async function(req, res, next) {
    try {
        let { id } = req.params

        let product = await productSchema.findByIdAndDelete(id)

        res.status(200).send({status: "200", message: "Product Deleted Success.", product })
    } catch (error) {
        res.status(500).send({status: "500", message: error.message })
    }
})

// Order Product

router.post('/:id/orders', async function(req, res, next) {
    try {
        let { id } = req.params
        let { quantity } = req.body

        let productCheck = await productSchema.findById(id)
        if (!productCheck || productCheck.quantity < quantity) {
            res.status(400).send({status: "400", message: 'Product not found or not enough quantity!', order: null })
            return
        }

        let order = new orderSchema({
            productName: productCheck.name,
            quantity: quantity,
            sumPrice: productCheck.price * quantity
        })

        await order.save()

        let productUpdate = await productSchema.findByIdAndUpdate(id, {
            quantity: productCheck.quantity - quantity
        }, { new: true })

        res.status(201).send({status: "201", message: "Order Created Success.", order })
    } catch (error) {
        res.status(500).send({status: "500", message: error.message })
    }
})

module.exports = router;