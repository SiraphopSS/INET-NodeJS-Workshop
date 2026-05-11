const jwt = require('jsonwebtoken')
const userSchema = require('../models/user.model')

module.exports = async (req, res, next) => {
    try {
        let token = req.headers.authorization
        if (!token) {
            // console.log("No Token Case")
            return res.status(401).send({ status: "401", message: "No Token Found. Please Login Again!" })
        }
        let decoded = jwt.verify(token, String(process.env.ADMIN_JWT_SECRET))
        let admin = await userSchema.findById(decoded.id)
        if (!admin || admin.role !== "admin" || admin.auth === false) {
            // console.log("No Admin Case")
            return res.status(401).send({ status: "401", message: "No Authorize. Your Account has not been permitted to commit this action" })
        }

        req.user = admin
        next()
    } catch (error) {
        // console.log("error case", error.message)
        res.status(401).send({ status: "401", message: "Invalid Token. Please Login Again!" })
    }
}