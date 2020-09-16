const express = require('express')
const PostController = require('./controllers/PostController')

const routes = express.Router()

routes.get('/posts', PostController.index)
routes.post('/posts', PostController.store)
routes.put('/posts/:postId', PostController.update)
routes.delete('/posts/:postId', PostController.remove)

module.exports = routes