const jwt = require('jsonwebtoken')

const AppError = require('./AppError')


//Used as a middleware to authenticate user on the API routes
const verifyJwt = (req, res, next) => {

    const token = req.headers['x-access-token']
    const SECRET = '12345678'

    try {
        const decoded = jwt.verify(token, SECRET)
        //console.log({decoded})
        req.username = decoded.username
        next()
    } catch (err) {
        if (!token) {
            throw new AppError('Token não fornecido', 401)  //Unauthorized
        } else {
            throw new AppError('Token inválido.', 403)  //Forbidden
        }
    }
}

module.exports = verifyJwt