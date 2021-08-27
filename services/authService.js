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
    /*const { username, password } = req.body
    const { rows } = await db.query('SELECT * FROM users WHERE username = $1 AND password = $2', [username, password])
    if (!rows.length) throw new AppError(`Dados incorretos ou usuário não encontrado: ${username}`, 400)
    */
    //Sign the token with the users's username as jwt payload
    //const username = rows[0].username
    const username = 'Alessandro'
    const SECRET = '12345678'
    const token = jwt.sign(
        { username }, 
        SECRET, 
        { expiresIn: 51*60 }    //n * 60s/min = n min
    )
    
    const user = {auth: true, token: token}
    //console.log({user})   
    return user
}