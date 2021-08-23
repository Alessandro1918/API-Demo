const { Pool } = require('pg')

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'myDb',
  password: '1234',
  port: 5432,
})

pool
  .connect()
  .then(client => {
    console.log('DB connected!')
    client.release();
  })
  .catch(err => console.log(err))

exports.query = (text, param) => pool.query(text, param)