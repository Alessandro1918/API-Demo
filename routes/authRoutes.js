const Router = require('express')

const authController = require('../controllers/authController')

const routes = Router()

routes.route('/')
    .post(authController.loginUser)       //Search the user in the db and returns a jtw token used to access authenticated routes

module.exports = routes
