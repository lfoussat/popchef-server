const express = require('express')
const app = express()
const port = 4000

const fs = require('fs')
const path = require('path')
const util = require('util')
const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)
const use = require('./usefull.js')

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

const dbRequest = id => require(`./assets/database/requete${id}.js`)

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

// get meals
app.get('/meals/:id', async (req, res) => {
  const id = req.params.id
  const request = dbRequest(id)
  const meals = await exec(request.getMeals())

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
