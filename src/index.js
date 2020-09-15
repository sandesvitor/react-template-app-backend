const bodyParser = require('body-parser')
const express = require('express')
const app = express()

const port = 3333

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
app.get('/articles', (req, res, next) => {
    console.log('...')
})

app.get('/articles/:id', (req, res, next) => {
    let id = parseInt(req.params.id)
    console.log('...')
})

app.post('/articles', (req, res, next) => {
    console.log('...')
})

app.put('/article/:articleId', (req, res, next) => {
    console.log('...')
})



// SERVER LISTENING TO...
app.listen(port, () => {
    console.log(`Server listening to port ${port}`)
})