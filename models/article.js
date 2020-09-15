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
            createdDate: new Date().toString()
        }
    }
}

module.exports = Article