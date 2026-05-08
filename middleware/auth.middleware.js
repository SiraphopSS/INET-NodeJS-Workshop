const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    try {
        let token = req.headers.authorization
        if (!token || token !== process.env.ADMIN_PASSWORD) {
            return res.status(401).send({ status: "401", message: "No Authorize. This action need Admin Level" })
        }
        req.auth = token
        next()
    } catch (error) {
        res.status(500).send({ status: "500", message: error.message })
    }
}