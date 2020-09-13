const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const path = require('path')

const cors = require('cors')
// const multer = require('multer') ---> para Upload de arquivos!

const state = {
    input: null,
    title: null
}

// alowwing access from cross-origin:
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
app.post('/title', (req, res, next) => {
    let info = req.body
    state.title = debug
    console.debug('New title received: [%s]', debug)
    next()
})

app.get('/title', (req, res, next) => {
    res.send(state.title)
    next()
})



// TESTE DE CONEXÃO!
app.post('/info', (req, res, next) => {
    let info = req.body
    state.input = info
    console.debug('New input on frontend: [%s]', info)
    next()
})

app.get('/info', (req, res, next) => {
    if (state.input !== null) {
        res.send(state.input)
    }
    next()
})

// PORT
app.listen(8080, () => {
    console.log('Server up on port 8080')
})