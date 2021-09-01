const jwt = require('jsonwebtoken')

const db = require('../db')
const AppError = require('../utils/AppError');


//Search user in the db and authenticate them, returning their token.
//Then, use this token as a header param with the 'x-access-token' key to enter the auth API routes.
//Make a POST req with the param: "http://localhost:3000/login"
//and body:
//{
//  "username": "...",
//  "password": "...",
//}
exports.loginUser = async(req, res) => {

    //Search user in the db
    const { username, password } = req.body
    const { rows } = await db.query('SELECT * FROM users WHERE username = $1', [username])
    if (!rows.length) throw new AppError(`Usuário não encontrado: ${username}`, 404)    //Not Found
    if (rows[0].password !== password) throw new AppError('Senha incorreta!', 403)  //Forbidden 

    //Sign the token with the users's username as jwt payload
    const SECRET = '12345678'
    const token = jwt.sign(
        { username }, 
        SECRET, 
        { expiresIn: 55*60 }    //n * 60s/min = n min
    )
    
    const user = {auth: true, username: username, token: token}
    console.log('Usuário logado:\n' , user)   
    return user
}