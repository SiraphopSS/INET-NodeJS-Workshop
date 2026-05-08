const mongoose = require('mongoose')
const { Schema } = mongoose

const orderSchema = new Schema({
    productName: String,
    quantity: Number,
    sumPrice: Number,
}, {
    timestamps: true
})

module.exports = mongoose.model('orders', orderSchema)