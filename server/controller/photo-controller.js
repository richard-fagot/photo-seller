const glob = require('glob')
const sharp = require('sharp')
const path = require('path')
const fs = require('fs')
const Photo = require('../model/photo')

const assetsLocation = './assets'
const imgDir =  'img'
const thumbDir =  'thumb'
const photoDir =  'photos'
const imgLocation =  './assets/img'
const thumbLocation =  './assets/img/thumb'
const photoLocation =  './assets/img/photos'

/*
        return an array of path to photos.
*/
var getPhotosPaths = function() {
    console.log("Entering ::getPhotosPaths()")
    let pattern = photoLocation + "/**/*.jpg"
    return new Promise(function(resolve, reject) {
        glob(pattern, null, function(err, photosPaths) {
            console.log("GetPhotoPaths : " + photosPaths)
            if(err) return reject(err);
            resolve(photosPaths)
        })
    })
}

/*
    Returns an array of {Photo}
    @return {Array[Photo]} 
*/
var getPhotos = function() {
    console.log("Entering ::getPhotos()")
    // Init DB if not exists
   // Load existing photos from DB
   // Parse photo directories
   return new Promise(function(resolve, reject){
       getPhotosPaths()
           .then(photoPaths => createPhotosFromPaths(photoPaths))
           .then(photos => resolve(photos))
           .catch(error => console.log(error))
   })
   // Search for added and deleted Photos
   // Update DB
   // return photos
}

 /*
        @param {Array[string]} photoPaths
        @return {Array[Photo]}
*/
var createPhotosFromPaths = function(photoPaths) {
    console.log("Entering ::createPhotosFromPaths()")
    return new Promise(function(resolve, reject){
        let photos = []
        console.log("Paths are " + photoPaths)
        photos = photoPaths.map(photoPath =>
            new Photo(photoPath.replace(assetsLocation, '')
                        ,'NONAME'
                        , null
                        , path.win32.basename(photoPath, '.jpg'))
        )
        photos.forEach(photo => {
            createThumbnail(photo)
        })
        resolve(photos)  
    })
}
    

/*
        Create or delete photos.
        @param {Array} photoPaths
*/
var createOrDeletePhotos = function(photoPaths) {
    console.log("Entering ::createOrDeletePhotos()")
}

/*
        Given a path to a photo, create a thumbnail
        in the *thumbLocation* respecting the directory
        structure.
*/
var createThumbnail = function (photo) {
    console.log("Entering ::createThumbnail()")
    let photoToMinifyPath = assetsLocation + photo.relativeURI
    console.log('Photo to minify ' + photoToMinifyPath)

    //Get only the directory structure of the user
    let photoDir = path.dirname(photoToMinifyPath).substring(photoLocation.length+1)
    let directories = photoDir.split('/')
    console.log(directories)

    // Create the whole directory structure from ./thumb
    let depthDir = thumbLocation
    for(let i = 0 ; i < directories.length ; i++) {
        depthDir += path.sep + directories[i]
        if(!fs.existsSync(depthDir)) {
            fs.mkdirSync(depthDir)
            console.log('create '+depthDir)
        }
    }
    
    let thumbnailBasedir = depthDir
    let photoFileName = path.win32.basename(photoToMinifyPath)
    let thumbPath = thumbnailBasedir + path.sep + 'tb_' + photoFileName
    photo.thumbnail = thumbPath.substring(assetsLocation.length)

    if(!fs.existsSync(thumbPath)) {
        console.log('Create thumbnail ' + thumbPath )
        sharp(photoToMinifyPath).resize(150, 150).toFile(thumbPath)
    }
}


module.exports = {
    assetsLocation:assetsLocation,
    imgDir:imgDir,
    thumbDir:thumbDir,
    photoDir:photoDir,
    imgLocation:imgLocation,
    thumbLocation:thumbLocation,
    photoLocation:photoLocation,

    
    getPhotosPaths: getPhotosPaths, 
    getPhotos: getPhotos,
    createPhotosFromPaths: createPhotosFromPaths,
    createOrDeletePhotos: createOrDeletePhotos,
    createThumbnail: createThumbnail
    
}