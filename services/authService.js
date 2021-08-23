const jwt = require('jsonwebtoken')

const db = require('../db')
const AppError = require('../utils/AppError');


//Search user in the db and authenticate them, returning their token
//Make a POST req with the param: "http://localhost:3000/login"
//and body:
//{
//  "name": "...",
//  "password": "...",
//}
exports.loginUser = async(req, res) => {

    //Search user in the db
    const { username, password } = req.body
    const { rows } = await db.query('SELECT * FROM users WHERE username = $1 AND password = $2', [username, password])
    if (!rows.length) throw new AppError(`Dados incorretos ou usuário não encontrado: ${username}`, 400)
    
    //Sign the token with the users's ID as jwt payload
    const id = rows[0].id
    const SECRET = '12345678'
    const token = jwt.sign({id}, SECRET, {
        expiresIn: 300      //5min
    })
    
    const user = {auth: true, token: token}
    console.log({user})   
    return user
}