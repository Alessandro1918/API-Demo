const postsService = require('../services/postsService')
const catchAsync = require('../utils/CatchAsync')


//Returns all posts from the db
exports.getAllPosts = async(req, res) => {

    //V1
    /*const data = [
        {'title': 'Hello, World!', 'content': 'Here I am!', 'slug': '1', 'created_by': 'Alessandro',},
        {'title': 'Hello Again!', 'content': 'Here I am!', 'slug': '2', 'created_by': 'Alessandro',},
    ]*/
    //console.log(data)
    //return res.status(200).json(data)

    //V2
    const posts = await postsService.getAllPosts()
    res.status(200).json({
        status: 'success',
        results: posts.length,
        data: posts,
    })
}


//Save a post in the db
exports.savePost = catchAsync(async(req, res, next) => {

    const post = await postsService.savePost(req)

    res.status(201).json({
        status: 'success',
        data: post,
    })
})


//Returns a single post from the db, filtered by it's slug
exports.getPost = catchAsync(async(req, res, next) => {

    const post = await postsService.getPost(req)

    res.status(200).json({
        status: 'success',
        data: post,
    })
})


//Edit a post, filtered by it's slug
exports.updatePost = catchAsync(async(req, res, next) => {

    const post = await postsService.updatePost(req)

    res.status(201).json({
        status: 'success',
        data: post,
    })
})


//Remove a post from the db, filtered by it's slug
exports.deletePost = catchAsync(async (req, res, next) => {

    //const post = await postsService.deletePost(req)
    await postsService.deletePost(req)
    
    res.status(200).json({
        status: 'success',
        //data: post
    })
})