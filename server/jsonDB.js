const fs = require('fs')

const dbFileName = 'db.json'

const createDB = function() {
    let emptyDB = {database:null}
    if(!fs.existsSync(dbFileName)) {
        persist(emptyDB)
    }
}

const loadDB = function() {
    return new Promise(function(resolve, reject) {
        fs.readFile(dbFileName, function(err, data) {
            if(err) return reject(err)
            resolve(JSON.parse(data))
        })
    })
}

const persist = function(json) {
    let data = JSON.stringify(json)
    fs.writeFileSync(dbFileName, data)
}

const persistPhoto = function(photo) {

}
module.exports = {
    dbFileName: dbFileName,
    createDB: createDB,
    persist: persist,
    loadDB: loadDB,
    persistPhoto: persistPhoto
}