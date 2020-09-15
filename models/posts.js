const db = require('./db')

const POSTS = db.sequelize.define('posts', {
    id: { type: db.Sequelize.INTEGER },
    author: { type: db.Sequelize.STRING },
    title: { type: db.Sequelize.STRING },
    subtitle: { type: db.Sequelize.STRING },
    content: { type: db.Sequelize.TEXT },
    date: { type: db.Sequelize.STRING }
})

POSTS.sync()

module.exports = POSTS