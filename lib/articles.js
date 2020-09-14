const fs = require('fs')

class Article {
    constructor(id, author = "", title = "", subtitle = "", content = "") {
        this.id = id
        this.title = title
        this.author = author
        this.subtitle = subtitle
        this.content = content
    }

    get article() {
        return {
            id: this.id,
            author: this.author,
            title: this.title,
            subtitle: this.subtitle,
            content: this.content,
            creatingDate: Date.now()
        }
    }
}

class Articles {
    //vai puxar do DATA BASE!
    // por enquanto pode-se usar o readFileSync e o writeFileSync,
    // porém quando ligar o server ao Banco de Dados Relacional (MySQL)
    // é preciso usar as funções em suas formas assíncronas!
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
                content: !content ? outdatedArticle.content : content
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