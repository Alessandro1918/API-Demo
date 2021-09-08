//import { Router } from 'express'
const Router = require('express')

//import postsController from './controllers/postsController.js'
const postsController = require('../controllers/postsController')

//Routes with the middleware 'verifyJwt' need authentication
const verifyJwt = require('../utils/VerifyJwt')

const routes = Router()

routes.route('/')
    .get(postsController.getAllPosts)              //Returns all posts from the db
    .post(verifyJwt, postsController.savePost)     //Save a post in the db

routes.route('/:slug')
    .get(postsController.getPost)                  //Returns a single post from the db, filtered by it's slug
    .put(verifyJwt, postsController.updatePost)    //Edit a post, filtered by it's slug
    .delete(verifyJwt, postsController.deletePost) //Removes a post from the db, filtered by it's slug
    
//export default routes
module.exports = routes
