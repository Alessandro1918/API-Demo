//import { Router } from 'express'
const Router = require('express')

//import postsController from './controllers/postsController.js'
const postsController = require('../controllers/postsController')

const verifyJwt = require('../utils/verifyJwt')



const routes = Router()

routes.route('/')
    .get(postsController.getAllPosts)   //Returns all posts from the db
    .post(postsController.savePost)     //Save a post in the db

routes.route('/:slug')
    .get(verifyJwt, postsController.getPost)       //Returns a single post from the db, filtered by it's slug
    .put(postsController.updatePost)    //Edit a post, filtered by it's slug
    .delete(postsController.deletePost) //Remove a post from the db, filtered by it's slug
    
//export default routes
module.exports = routes