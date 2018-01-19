const fs = require('fs')
const jsonDB = require('./server/jsonDB')
const Photo = require('./server/model/photo')

const read = function(path) {
    return new Promise(function(resolve, reject) {
        fs.readFile(path, function(err, data){
            if (err) 
                reject(err); 
            else 
                resolve(data);
        });
    });
}

const loadDB = function() {
    return new Promise(function(resolve, reject) {
        read('db.json').then(data => resolve(data))
    }) 
}

const getFile = function() {
    return new Promise(function(resolve, reject) {
        resolve('db.json')
    })
}
/*
getFile()
    .then(d => loadDB())
    .then(d => console.log(d))
*/
var emptyDB = { photoIndex: 0
    , photos: []
    , commandes: []}

const testCreateDBFollowedByLoadDB = function() {
    if(fs.existsSync(jsonDB.dbFileName)) fs.unlinkSync(jsonDB.dbFileName)
    
    
    
    jsonDB.createDB()
        .then(data => {
            console.log('Result createDB ' + JSON.stringify(data))
            return jsonDB.loadDB()
    })
        .then(json => console.log('Result loadDB ' + JSON.stringify(json)))
}

const testSaveOrUpdatePhoto = function() {
    console.log('---- testSaveOrUpdatePhoto')
    let expected = '{"photoIndex":1,"photos":[{"id":1,"relativeURI":"uri","thumbnail":"thumbnail","name":"name","fileName":"filename"}],"commandes":[]}'
    let photo = new Photo()
    photo.id = null
    photo.relativeURI = 'uri'
    photo.name = 'name'
    photo.thumbnail = 'thumbnail'
    photo.fileName = 'filename'

    jsonDB.saveOrUpdatePhoto(emptyDB, photo)
        .then(data => {
            console.log('Saved ' + data)
            return jsonDB.loadDB()})
        .then(json => {
            if(JSON.stringify(json) === expected) {
                console.log('[SUCCESS] saveOrUpdatePhoto')
            } else {
                console.log('[ ERROR ] saveOrUpdatePhoto')
            }
        })
    console.log('---- End testSaveOrUpdatePhoto')
}

//testCreateDBFollowedByLoadDB()
testSaveOrUpdatePhoto()