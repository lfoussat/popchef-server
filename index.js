const express = require('express')
const app = express()
const port = 4000

const mysql = require('mysql2/promise')
const db = require('./assets/database/requete1.js')

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

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})
app.get('/', (req, res) => {
  res.send('OK')
})

// get meals
app.get('/meals/:id', async (req, res) => {
  const id = req.params.id
  const meals = await exec(db.getMeals())

  res.json(meals)
})
// ERRORS
app.use((err, req, res, next) => {
  if (err) {
    res.json({ error: err.message })
    console.error(err)
  }
  next(err)
})

app.listen(port, err => console.log(err || `server listening on port ${port}`))
