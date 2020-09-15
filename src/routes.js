const express = require('express')
const PostController = require('./controllers/PostController')

const routes = express.Router()

routes.get('/posts', PostController.index)
routes.post('/posts', PostController.store)


// app.get('/title', (req, res, next) => {
//     res.send('CONNECTING DATABASE')
// })

// app.post('/title', (req, res, next) => {
//     let title = req.body

//     console.debug('Connecting to database')
//     console.debug(title)
// })

// app.get('/articles', (req, res, next) => {
//     console.log('...')
// })

// app.get('/articles/:id', (req, res, next) => {
//     let id = parseInt(req.params.id)
//     console.log('...')
// })

// app.post('/articles', (req, res, next) => {
//     console.log('...')
// })

// app.put('/article/:articleId', (req, res, next) => {
//     console.log('...')
// })

module.exports = routes