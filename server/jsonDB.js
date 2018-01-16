const fs = require('fs')
const util = require('util')

const dbFileName = 'db.json'
let emptyDB = { photoIndex: 0
                , photos: []
                , commandes: []}

const createDB = function() {
    console.log('---- ::createDB')
    let p = Promise.resolve()
    if(!fs.existsSync(dbFileName)) {
        p = persist(emptyDB)
    }

    return p.then(data => {return data})
/*    
    return new Promise(function(resolve, reject) {
        console.log('---- ::createDB')
        if(!fs.existsSync(dbFileName)) {
            persist(emptyDB).then(resolve())
        }
        resolve()
        console.log('---- End ::createDB')
    })
*/
}

/**
 * @returns promise database
 */
const loadDB = function() {
    console.log('---- ::loadDB')
    return new Promise(function(resolve, reject) {
        if(!fs.existsSync(dbFileName)) reject('Database not found')
        let data = fs.readFileSync(dbFileName)
        console.log('::loadDB data: ' + data)
        let jsonDB = JSON.parse(data)
        resolve(jsonDB)
    })
}

/**
 * Persist a full database given as argument.
 * 
 * @param {jason} wholeDatabase
 */
const persist = function(wholeDatabase) {
    console.log('---- ::persist')
    let data = JSON.stringify(wholeDatabase)
    console.log('persist data ' + data)
    return writeFile(dbFileName).then( data => {return data})
/*
    return new Promise(function(resolve, reject) {
        console.log('---- ::persist')
        let data = JSON.stringify(wholeDatabase)
        console.log('persist data ' + data)
        fs.writeFile(dbFileName, data, (err) => {
            console.log('write file')
            if(err) {
                console.log(err) 
                throw err
            }
            resolve(data)
        })
        console.log('---- End ::persist')
    })
*/
}

/**
 * 
 * @param {Photo} photo 
 */
const persistPhoto = function(photo) {
    return new Promise(function(resolve, reject) {
        console.log('---- ::persistPhoto')
        loadDB()
        .then(
            db => {
                saveOrUpdatePhoto(db, photo)
                console.log('---- End ::persistPhoto')
            })
        .then(photoSavedOrUpdated => resolve(photoSavedOrUpdated))
    })
}

/**
 * 
 * @param {json} db 
 * @param {Photo} photo 
 */
const saveOrUpdatePhoto = function(db, photo) {
    return new Promise(function(resolve, reject){
        console.log('---- ::saveOrUpdatePhoto')
        findPhotoIndex(db, photo)
        .then(
            existingPhotoIndex => {
                if(existingPhotoIndex === null) {
                    addPhoto(db, photo)
                } else {
                    db.photos[existingPhotoIndex] = photo
                }
                console.log('SoU ' + JSON.stringify(db))
                persist(db)
            }
        )
        .then(resolve(photo))
        console.log('---- End ::saveOrUpdatePhoto')
        
    })
    
}

const addPhoto = function(db, photo) {
    console.log('---- ::addPhoto')
    db.photoIndex++
    photo.id = db.photoIndex
    db.photos.push(photo)
    console.log('addPhoto' + JSON.stringify(db))
    console.log('---- End ::addPhoto')
}
/**
 * 
 * @param {json} db 
 * @param {Photo} photo 
 * @returns photo found index or null
 */
const findPhotoIndex = function(db, photo) {
    console.log('---- ::findPhotoIndex')
    return new Promise(function(resolve, reject) {
        if(photo.id === null || photo.id === 'undefined') {
            db.photos.forEach(currentPhoto => {
                if(currentPhoto.relativeURI === photo.relativeURI) {
                    resolve(currentPhoto.id)
                }
            })
            // no photo found in db
            resolve(null)
        }
        resolve(photo.id)
    })
    console.log('---- End ::findPhotoIndex')
}

const readFile = function(filename) {
    console.log('---- ::readfile')
    return new Promise(function(resolve, reject) {
        console.log('---- entering ::readfile promise')
        fs.readFile(filename, function(err, data){
            console.log('---- Entering ::readfile calback')
            if (err) {
                console.log('---- ::readfile error')
                reject(err); 
            }
            else {
                console.log('---- ::readfile success')    
                resolve(data);
            }
        });
    });
};

const writeFile = function(path, data) {
    return new Promise(function(resolve, reject) {
        fs.writeFile(path, data, (err) => {
            console.log('write file')
            if(err) {
                console.log(err) 
                reject(err)
            }
            resolve(data)
        })
    })
}
module.exports = {
    dbFileName: dbFileName,
    createDB: createDB,
    persist: persist,
    loadDB: loadDB,
    persistPhoto: persistPhoto
}