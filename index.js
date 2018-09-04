const express = require('express')
const app = express()
const port = 4000

const mysql = require('mysql2/promise')
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'popchef'
})

const exec = async (query, params) => {
  const connect = await connection
  const result = await connect.execute(query, params)

  return result[0]
}
app.get('/', (req, res) => {
  res.send('OK')
})

app.listen(port, err => console.log(err || `server listening on port ${port}`))
