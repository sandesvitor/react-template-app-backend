require('dotenv').config()

const express = require('express')
const routes = require('./routes')

require('./database/index')

const app = express()

const cors = require('cors')
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000")
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE")
    app.use(cors())
    next()
})

app.use(express.json())

app.use(routes)

const PORT = process.env.PORT || 3300
app.listen(PORT, () => {
    console.log('Server running')
})

