const Router = require('express')

const authController = require('../controllers/authController')

const routes = Router()

routes.route('/')
    .post(authController.loginUser)       //Search user in the db and authenticate them, returning their token

module.exports = routes