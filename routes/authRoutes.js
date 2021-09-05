const Router = require('express')

const authController = require('../controllers/authController')

const routes = Router()

routes.route('/')
    .post(authController.loginUser)       //Search the user in the db and authenticates them, returning their token

module.exports = routes