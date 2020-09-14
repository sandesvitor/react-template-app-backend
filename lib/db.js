//vai puxar do DATA BASE!
// por enquanto pode-se usar o readFileSync e o writeFileSync,
// porém quando ligar o server ao Banco de Dados Relacional (MySQL)
// é preciso usar as funções em suas formas assíncronas!

const fs = require('fs')

class DataBaseHandler {
    static fetchDatabase(path) {
        return JSON.parse(fs.readFileSync(path))
    }

    static updateDatabase(object, path) {
        const data = JSON.stringify(object)
        fs.writeFileSync(path, data)
    }
}

module.exports = DataBaseHandler