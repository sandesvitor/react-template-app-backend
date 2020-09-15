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
        console.debug('Exception on accessing database\nfor GET request for all articles: ', exception)
    }
})

app.get('/articles/:id', async (req, res, next) => {
    let id = parseInt(req.params.id)
    try {

        res.send(
            await POSTS.find({
                where: {
                    id: id,
                }
            }).then(() => console.debug("Post request for article of id: [%s]", id))
        )

    } catch (exception) {
        console.debug('Exception on accessing database\nwith GET request for article by id: ', exception)
    }
})

app.post('/articles', async (req, res, next) => {
    try {
        let newArticle = req.body
        console.debug("POST request for new article:")
        console.debug(newArticle)

        await POSTS.create({
            author: newArticle.author,
            title: newArticle.title,
            subtitle: newArticle.subtitle,
            content: newArticle.content
        })

    } catch (exception) {
        console.debug('Exception on accessing database\nwith POST request for new article: ', exception)
    }
})

app.put('/article/:articleId', async (req, res, next) => {
    try {
        let updatedArticle = {
            author: req.body.author,
            title: req.body.title,
            subtitle: req.body.subtitle,
            content: req.body.content
        }
        await POSTS.update(
            updatedArticle,
            { returning: true, where: { id: req.params.articleId } }
        ).then(() => console.log("Article Updated Successful!"))
    } catch (exception) {
        console.debug('Exception on accessing database\nwith POST request for new article: ', exception)
    }
})

// PORT
app.listen(port, () => {
    console.log(`Server up on port ${port}`)
})