const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
    username: String,
    password: String,
    auth: Boolean,
},{
    timestamps: true
})

module.exports = mongoose.model('users', userSchema)