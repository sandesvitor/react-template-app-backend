const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const path = require('path')
// const multer = require('multer') ---> para Upload de arquivos!

const state = {
    input: ''
}

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'))
})


// TESTE DE CONEXÃO!
app.post('/', (req, res, next) => {
    let message = req.body.input
    state.input = message
    console.debug('New input on frontend: [%s]', message)
    next()
})

// PORT
app.listen(8080, () => {
    console.log('Server up on port 8080')
})