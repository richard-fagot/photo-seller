const jsonDB = require('./jsonDB')
const Photo = require('./model/photo')
const fs = require('fs')

if(fs.existsSync(jsonDB.dbFileName)) fs.unlinkSync(jsonDB.dbFileName)

console.log('---- Create DB')
jsonDB.createDB()
    .then(() => { console.log('---- INIT : loadDB') 
                    return jsonDB.loadDB()})
    .then(
        db => {
            console.log('---- Test setup First load ')
            console.log('---- INIT loadDB returns: ' + JSON.stringify(db))
            return testPersistPhoto()
    })
    .catch(err => console.log("erreur: " + err))


const testPersistPhoto = function() {
    console.log('---- Begin testPersistPhoto')
    let photo = new Photo(null, 'relative', 'thumb', 'name', 'filename')
    return jsonDB.persistPhoto(photo)
        .then(
            () => 
            jsonDB.loadDB().then(json =>  {
                console.log('---- End test persist photo ')
                console.log(JSON.stringify(json))})
        )
    
}