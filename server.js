const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const path = require('path')

const fs = require('fs')
const port = 3333

const databaseURL = './DB_temp/articles.json'
const ArticlesClass = require('./lib/articles')
const Articles = new ArticlesClass((databaseURL))

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

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'))
})

// MUDAR TÍTULO DA NAVBAR
app.get('/title', (req, res, next) => {
    res.sendFile(path.join(__dirname + '/DB_temp/state.json'))
})

app.post('/title', (req, res, next) => {
    let title = req.body
    fs.writeFileSync('./DB_temp/state.json', JSON.stringify(title, null, 2))

    console.debug('Wrinting title on JSON file:')
    console.debug(title)
})

// ESCREVER E PEGAR ARTIGOS:
app.get('/articles/', (req, res, next) => {
    res.send(Articles.articles)
})

app.get('/articles/:id', (req, res, next) => {
    let id = parseInt(req.params.id)
    let articleSelected = Articles.getArticle(id)
    console.debug("Post request for article of id: [%s]", id)
    console.debug(articleSelected)
    res.send(articleSelected)
})

app.post('/articles/:id', (req, res, next) => {
    let newArticle = req.body
    let id = parseInt(req.params.id)
    console.debug("POST request for new article of id: [%s]", id)
    console.debug(newArticle)
    Articles.updateArticles(newArticle)
})

// PORT
app.listen(port, () => {
    console.log(`Server up on port ${port}`)
})