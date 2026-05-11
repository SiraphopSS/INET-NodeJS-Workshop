const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
    username: String,
    password: String,
    auth: Boolean,
    token: String,
    role: String
},{
    timestamps: true
})

module.exports = mongoose.model('users', userSchema)