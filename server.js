const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const path = require('path')

const fs = require('fs')
const port = 3333

const DataBaseHandler = require('./lib/db')

const databaseURL = './DB_temp/articles.json'
const ArticlesClass = require('./lib/articles')
const Articles = new ArticlesClass((databaseURL))

const cors = require('cors')
// const multer = require('multer') ---> para Upload de arquivos!



Articles.updateArticles({
    id: 4,
    title: "Título",
    subtitle: "Subtítulo",
    author: "Autor",
    content: "Olá!"
})
console.log(Articles.articles)

Articles.updateArticles({
    id: 1,
    author: "Novo autor",
    content: "New Content"
})

console.log(Articles.articles)



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
app.get('/articles:id', (req, res, next) => {
})

app.post('/articles', (req, res, next) => {
})

// PORT
app.listen(port, () => {
    console.log(`Server up on port ${port}`)
})