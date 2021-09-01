//import db from '../db'
const db = require('../db')
const AppError = require('../utils/AppError')


//Returns all posts from the db
//Make a GET req: "http://localhost:3000/posts"
exports.getAllPosts = async(req, res) => {

    //V1 - without db
    //const rows = [{slug: 'A', content: 'B', title: 'C', created_by: 'D'}]
    //V2
    const { rows } = await db.query('SELECT * FROM posts ORDER BY slug');
    
    return rows
}


//Save a post in the db
//Make a POST req: "http://localhost:3000/posts"
//and body:
//{
//  "title": "...",
//  "content": "...",
//}
exports.savePost = async(req, res) => {

    //get params
    //V1 - without auth
    //const { title, content, created_by } = req.body
    //V2
    const { title, content } = req.body
    const created_by = req.username

    //setup the data
    const lowerCaseTitle = title.toLowerCase()
    const slug = lowerCaseTitle.replace(/ /g, '-')    //replaceAll spaces with dashes

    //make the SQL operation
    await db.query('INSERT INTO posts (slug, title, content, created_by) VALUES ($1, $2, $3, $4)', [slug, title, content, created_by]);
    
    const post = {slug, title, content, created_by}
    return post
}


//Returns a single post from the db, filtered by it's slug
//Make a GET req with the param: "http://localhost:3000/posts/enter-your-slug-here"
exports.getPost = async(req, res) => {

    const slug = req.params.slug

    const { rows } = await db.query('SELECT * FROM posts WHERE slug = $1', [slug])
    
    if (!rows.length) throw new AppError('Post não encontrado.', 404)   //Not Found

    return rows[0]
}


//Edit a post, filtered by it's slug
//Make a PUT req with the param: "http://localhost:3000/posts/enter-your-slug-here"
//and body:
//{
//  "title": "...",
//  "content": "...",
//}
exports.updatePost = async(req, res) => {
    
    const slug = req.params.slug
    const { title, content } = req.body
    const authenticatedUser = req.username

    //Users can edit only their own posts
    const { rows } = await db.query('SELECT * FROM posts WHERE slug = $1', [slug])
    if (!rows.length) throw new AppError('Post não encontrado.', 404)       //Not Found
    if (rows[0].created_by !== authenticatedUser) throw new AppError('Esse post não é seu para editar!', 403)  //Forbidden

    //setup the data
    const lowerCaseTitle = title.toLowerCase()
    const newSlug = lowerCaseTitle.replace(/ /g, '-')    //replaceAll spaces with dashes

    //make the sql query
    await db.query('UPDATE posts SET slug = $1, title = $2, content = $3 WHERE slug = $4', [newSlug, title, content, slug])
    
    const post = {newSlug, title, content, authenticatedUser}
    return post
}


//Remove a post from the db, filtered by it's slug
//Make a DELETE req with the param: "http://localhost:3000/posts/enter-your-slug-here"
exports.deletePost = async(req, res) => {

    const slug = req.params.slug
    const authenticatedUser = req.username

    //Users can delete only their own posts
    const { rows } = await db.query('SELECT * FROM posts WHERE slug = $1', [slug])
    if (!rows.length) throw new AppError('Post não encontrado.', 404)       //Not Found
    if (rows[0].created_by !== authenticatedUser) throw new AppError('Esse post não é seu para deletar!', 403)  //Forbidden

    await db.query('DELETE FROM posts WHERE slug = $1', [slug])

    //return rows[0]    //service doesn't return the deleted post
}