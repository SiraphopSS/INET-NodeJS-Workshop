const mongoose = require('mongoose')
const { Schema } = mongoose

const productSchema = new Schema({
    name: String,
    price: Number,
    description: String,
    quantity: Number,
}, {
    timestamps: true
})

module.exports = mongoose.model('products', productSchema)