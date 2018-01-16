const jsonDB = require('./jsonDB')
const Photo = require('./model/photo')
const fs = require('fs')

if(fs.existsSync(jsonDB.dbFileName)) fs.unlinkSync(jsonDB.dbFileName)

jsonDB.createDB()
.catch(err => console.log("erreur1: " + err))
    .then(() => jsonDB.loadDB())
    .catch(err => console.log("erreur2: " + err))
    .then(
        db => {
            console.log('Test setup First load ')
            console.log(JSON.stringify(db))
            testPersistPhoto()
    })
    .catch(err => console.log("erreur3: " + err))


const testPersistPhoto = function() {
    console.log('---- Begin testPersistPhoto')
    let photo = new Photo('relative', 'thumb', 'name', 'filename')
    jsonDB.persistPhoto(photo)
        .then(
            () => 
            jsonDB.loadDB().then(json =>  {
                console.log('---- End test persist photo ')
                console.log(JSON.parse(json))})
        )
    
}