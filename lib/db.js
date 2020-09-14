//vai puxar do DATA BASE!
// por enquanto pode-se usar o readFileSync e o writeFileSync,
// porém quando ligar o server ao Banco de Dados Relacional (MySQL)
// é preciso usar as funções em suas formas assíncronas!

const fs = require('fs')

class DataBaseHandler {
    static fetchData(path) {
        const raw = fs.readFileSync(path)
        if (raw === '') {
            return JSON.parse(fs.readFileSync(path))
        } else {
            console.debug("Database file empty, creating empty Array")
            return []
        }
    }

    static updateData(object, path) {
        const data = JSON.stringify(object, null, 2)
        fs.writeFileSync(path, data)
    }
}

module.exports = DataBaseHandler