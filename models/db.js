const Sequelize = require('sequelize')
const sequelize = new Sequelize(
    process.env.DATABASE,
    process.env.USER,
    process.env.PASSWORD,
    {
        host: process.env.HOST,
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
