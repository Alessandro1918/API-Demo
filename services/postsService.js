//import db from '../db'
const db = require('../db')
const AppError = require('../utils/AppError')

const verifyJwt = require('../utils/verifyJwt')



//Returns all posts from the db
//Make a GET req: "http://localhost:3000/posts"
exports.getAllPosts = async(req, res) => {

    const { rows } = await db.query('SELECT * FROM posts ORDER BY slug');

    return rows
}


//Save a post in the db
//Make a POST req: "http://localhost:3000/posts"
//and body
//{
//  "title": "...",
//  "content": "...",
//  "created_by": "...",    
//}
exports.savePost = async(req, res) => {

    //get params
    const { title, content, created_by } = req.body

    //check if user is authenticated
    if (!created_by) throw new AppError('Campo não inserido ou inválido: "created_by"', 400)
    const { rowCount } = await db.query('SELECT * FROM users WHERE username = $1', [created_by])
    if (!rowCount) throw new AppError(`Usuário não autenticado: ${created_by}`, 400)

    //setup the data
    const lowerCaseTitle = title.toLowerCase()
    const slug = lowerCaseTitle.replaceAll(' ', '-')

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
    
    if (!rows.length) throw new AppError('Post não encontrado.', 404)

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
    const { title, content, created_by } = req.body

    const { rows } = await db.query('UPDATE posts SET title = $2, content = $3 WHERE slug = $1', [slug, title, content])

    if (!rows.length) throw new AppError('Post não encontrado.', 404)
    
    return rows[0]
}


//Remove a post from the db, filtered by it's slug
//Make a DELETE req with the param: "http://localhost:3000/posts/enter-your-slug-here"
exports.deletePost = async(req, res) => {

    const slug = req.params.slug

    //Check if post exists
    //const { rows } = await db.query('SELECT * FROM posts WHERE slug = $1', [slug])
    //if (!rows.length) throw new AppError('Post não encontrado.', 404)
    //Delete
    //await db.query('DELETE FROM posts WHERE slug = $1', [slug])
    //return rows[0]

    const { rowCount } = await db.query('DELETE FROM posts WHERE slug = $1', [slug])
    if (!rowCount) throw new AppError('Post não encontrado.', 404)

}