const express = require('express')
const app = express()
const port = 4000

app.listen(port, err => console.log(err || `server listening on port ${port}`))
