const glob = require('glob')
const sharp = require('sharp')
const path = require('path')
const fs = require('fs')
const Photo = require('../model/photo')

module.exports = {
    assetsLocation: './assets',
    imgDir: 'img',
    thumbDir: 'thumb',
    photoDir: 'photos',
    imgLocation: './assets/img',
    thumbLocation: './assets/img/thumb',
    photoLocation: './assets/img/photos',
    /*
        return an array of path to photos.
    */
    getPhotosPaths: function() {
        let pattern = this.photoLocation + "/**/*.jpg"
        return new Promise(function(resolve, reject) {
            glob(pattern, null, function(err, photosPaths) {
                if(err) return reject(err);
                resolve(photosPaths)
            })
        })
    }, 

    /*
        Given a path to a photo, create a thumbnail
        in the *thumbLocation* respecting the directory
        structure.
    */
    createThumbnail: function (photo) {
        let photoToMinifyPath = this.assetsLocation + photo.relativeURI
        console.log('Photo to minify ' + photoToMinifyPath)

        //Get only the directory structure of the user
        let photoDir = path.dirname(photoToMinifyPath).substring(this.photoLocation.length+1)
        let directories = photoDir.split('/')
        console.log(directories)

        // Create the whole directory structure from ./thumb
        let depthDir = this.thumbLocation
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
        photo.thumbnail = thumbPath.substring(this.assetsLocation.length)
        console.log('Create thumbnail ' + thumbPath )
        sharp(photoToMinifyPath).resize(300, 300).toFile(thumbPath)
    }
}