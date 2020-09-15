const Article = require('../models/article')

class Articles {

    constructor(path) {
        this.path = path
        this._articles = Array.isArray(DataBaseHandler.fetchData(path))
            ? DataBaseHandler.fetchData(path)
            : [DataBaseHandler.fetchData(path)]
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
            DataBaseHandler.updateData(this.articles, this.path)
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
                updatedDate: new Date().toString()

            }
            this.deleteArticle(id)
            this.articles.push(updatedArticle)
            DataBaseHandler.updateData(this.articles, this.path)
        }

    }

    deleteArticle(id) {
        this.articles = this.articles.filter(article => article.id !== id)
        DataBaseHandler.updateData(this.articles, this.path)
    }
}

module.exports = Articles