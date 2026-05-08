const jwt = require('jsonwebtoken')
const userSchema = require('../models/user.model')

module.exports = async function (req, res, next) {
    try {
        let token = req.headers['authorization']
        if (!token) {
            return res.status(401).send({ status: "401", message: "No Authorize. Please Login First!" })
        }
        let decoded = await jwt.verify(token, String(process.env.JWT_SECRET))
        let user = await userSchema.findById(decoded.id)
        if (!user) {
            return res.status(401).send({ status: "401", message: "No Authorize. Please Login First!" })
        }
        req.user = user
        next()
    } catch (error) {
        res.status(500).send({ status: "500", message: error.message })
    }
}