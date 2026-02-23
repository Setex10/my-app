require("dotenv").config()
const jwt = require("jsonwebtoken")

const getDecodedJwt = async(token) => {
    try {
        const decoded = await jwt.decode(token, process.env.SECRET_KEY)
        return decoded
    } catch (error) {
        throw new Error(`Hubo un error con hacer el decoded: ${error}`)
    }
}

module.exports = {getDecodedJwt}