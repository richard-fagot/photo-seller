const fs = require('fs')

const dbFileName = 'db.json'

const createDB = function() {
    if(!fs.existsSync(dbFileName)) {
        fs.writeFileSync(dbFileName, '')
    }
},

const persist = function(json) {
    let data = JSON.stringify(db)
    fs.writeFileSync(dbFileName, data)
}

module.exports = {
    dbFileName: dbFileName,
    createDB: createDB,
    persist: persist
}