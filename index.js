const express = require('express')
const app = express()
const port = process.env.PORT || 4000

const fs = require('fs')
const path = require('path')
const util = require('util')
const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)

const logDir = path.join(__dirname, 'assets')

const use = require('./usefull.js')

const mysql = require('mysql2/promise')

const url = process.env.DATABASE_URL
const pool = mysql.createPool(`${url}?waitForConnections=true&connectionLimit=10&queueLimit=0`)

const exec = (query, params) => {
  return first(pool.execute(query, params))
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

  const filename = 'log.txt'
  const filepath = path.join(logDir, filename)
  const logs = await readFile(filepath, 'utf8').then(JSON.parse)
  const newlog = { date: use.formatedDate(Date.now()), request: request.getMeals() }
  logs.logs.push(newlog)
  writeFile(filepath, JSON.stringify(logs, null, 2), 'utf8')

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
