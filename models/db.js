const Sequelize = require('sequelize')
const sequelize = new Sequelize(
    'app_content', 'root', 'AnnAbiluteteia444598@B', {
    host: "localhost",
    dialect: "mysql"
}
)


sequelize.authenticate()
    .then(function () {
        console.log("Database connection established!")
    })
    .catch(function (erro) {
        console.log("Connection error: " + erro)
    })




module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}
