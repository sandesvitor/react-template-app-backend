const Post = require('../models/Post')

module.exports = {

    async index(req, res) {
        const posts = await Post.findAll()
        return res.json(posts)
    },

    async store(req, res) {
        const { author, title, subtitle, content } = req.body

        const post = await Post.create(
            {
                author: author,
                title: title,
                subtitle: subtitle,
                content: content
            })

        return res.json(post)
    }
}