const fs = require('fs')
const Article = require('./article')


class Articles {

    constructor(databasePath) {
        this._articles = JSON.parse(fs.readFileSync(databasePath))
    }

    get articles() {
        return this._articles
    }

    set articles(updatedArticles) {
        this._articles = updatedArticles
    }


    getArticle = (id) => {
        return this.articles.find(article => article.id === id)
    }

    updateArticles({ id, author, title, subtitle, content }) {
        // POST
        if (!this.getArticle(id)) {
            this.articles.push(new Article(id, author, title, subtitle, content).article)
        }
        // PUT
        else {
            let outdatedArticle = this.getArticle(id)
            let updatedArticle = {
                id: outdatedArticle.id,
                author: !author ? outdatedArticle.author : author,
                title: !title ? outdatedArticle.title : title,
                subtitle: !subtitle ? outdatedArticle.subtitle : subtitle,
                content: !content ? outdatedArticle.content : content,
                createdDate: outdatedArticle.createdDate,
                updatedDate: Date.now()

            }
            this.deleteArticle(id)
            this.articles.push(updatedArticle)
        }

    }

    deleteArticle(id) {
        this.articles = this.articles.filter(article => article.id !== id)
    }
}

module.exports = Articles