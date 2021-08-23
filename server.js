//import express from 'express'
const express = require('express')

//import routes from './routes.js'
const postsRoutes = require('./routes/postsRoutes')
const authRoutes = require('./routes/authRoutes')

const app = express()

app.use(express.json())
//app.use(routes)
app.use('/posts', postsRoutes)
app.use('/login', authRoutes)

app.listen(3000, async () => {
    console.log('Server is running....')
});