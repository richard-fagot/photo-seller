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
        console.log('---- db does not exist')
        p = persist(emptyDB)
    }

    return p.then(data => {return data})
}

/**
 * @returns promise database
 */
const loadDB = function() {

return new Promise(function(resolve, reject) {
        console.log('---- ::loadDB')
        if(!fs.existsSync(dbFileName)) reject('Database not found')
        let data = fs.readFileSync(dbFileName)
        console.log('::loadDB data: ' + data)
        console.log('::loadDB data stringify: ' + data)
        let jsonDB = JSON.parse(data)
        resolve(jsonDB)
    })
}
/**
 * Persist a full database given as argument.
 * 
 * @param {json} wholeDatabase
 */
const persist = function(wholeDatabase) {
    console.log('---- ::persist')
    let data = JSON.stringify(wholeDatabase)
    console.log('persist data ' + data)
    return writeFile(dbFileName, data).then( data => {return data})
}

/**
 * 
 * @param {Photo} photo 
 */
const persistPhoto = function(photo) {
    console.log('---- ::persistPhoto')
    return loadDB()
        .then(
            db => {
                console.log('---- End ::persistPhoto')
                return saveOrUpdatePhoto(db, photo)
            })
        .then(photoSavedOrUpdated => {return photoSavedOrUpdated})
}

/**
 * 
 * @param {json} db 
 * @param {Photo} photo 
 */
const saveOrUpdatePhoto = function(db, photo) {
        console.log('---- ::saveOrUpdatePhoto')
        return findPhotoIndex(db, photo)
        .then(
            existingPhotoIndex => {
                console.log('existingPhotoIndex ' + existingPhotoIndex)
                if(existingPhotoIndex === null) {
                    addPhoto(db, photo)
                } else {
                    db.photos[existingPhotoIndex] = photo
                }
                console.log('SaveOrUpdate ' + JSON.stringify(db))
                return persist(db)
            }
        )
        
}

/**
 * Add the given photo into the db without persisting in file.
 * @param {*} db 
 * @param {*} photo 
 */
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
    return new Promise(function(resolve, reject) {
        photoID = null
        console.log('---- ::findPhotoIndex')
        if(photo.id == null) {
            db.photos.forEach(currentPhoto => {
                if(currentPhoto.relativeURI === photo.relativeURI) {
                    console.log('Photo found in DB !')
                    photoID = currentPhoto.id
                }
            })
            // no photo found in db
            console.log('no photo found in db')
        } else {
            console.log('Photo already has an id ' + photo.id)
            photoID = photo.id
        }
        resolve(photoID)
    })
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
    console.log('---- ::writeFile')
    return new Promise(function(resolve, reject) {
        fs.writeFile(path, data, (err) => {
            console.log('write file' + JSON.stringify(data))
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


    // For test
    ,saveOrUpdatePhoto: saveOrUpdatePhoto
}