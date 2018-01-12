const jsonDB = require('./jsonDB')

jsonDB.createDB()
jsonDB.loadDB().then(json => console.log(json))