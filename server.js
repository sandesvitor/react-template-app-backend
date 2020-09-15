const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const path = require('path')

const port = 3333

const POSTS = require('./models/posts')

const cors = require('cors')
// const multer = require('multer') ---> para Upload de arquivos!


// PERMITINDO ACESSO DO CLIENT:
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000")
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE")
    app.use(cors())
    next()
})

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// MUDAR TÍTULO DA NAVBAR
app.get('/title', (req, res, next) => {
    res.send('CONNECTING DATABASE')
})

app.post('/title', (req, res, next) => {
    let title = req.body

    console.debug('Connecting to database')
    console.debug(title)
})

// ESCREVER E PEGAR ARTIGOS:
app.get('/articles', async (req, res, next) => {
    try {
        res.send(await POSTS.findAll())
    } catch (exception) {
        console.debug('Exception on accessing database: ', exception)
    }
})

app.get('/articles/:id', (req, res, next) => {
    let id = parseInt(req.params.id)
    console.debug("Post request for article of id: [%s]", id)
})

app.post('/articles/:id', (req, res, next) => {
    let newArticle = req.body
    let id = parseInt(req.params.id)
    console.debug("POST request for new article of id: [%s]", id)
})

// PORT
app.listen(port, () => {
    console.log(`Server up on port ${port}`)
})