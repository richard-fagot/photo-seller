const glob = require('glob')
const sharp = require('sharp')
const path = require('path')
const fs = require('fs')
const Photo = require('../model/photo')

module.exports = {
    thumbDir: './thumb',
    photoDir: './photos',

    /*
        return an array of path to photos.
    */
    getPhotosPaths: function() {
        let pattern = this.photoDir + "/**/*.jpg"
        return new Promise(function(resolve, reject) {
            glob(pattern, null, function(err, photosPaths) {
                if(err) return reject(err);
                resolve(photosPaths)
            })
        })
    }, 

    /*
        Given a path to a photo, create a thumbnail
        in the *thumbDir* respecting the directory
        structure.
    */
    createThumbnail: function (photo) {
        let photoPath = photo.relativePath
        let fileName = path.win32.basename(photoPath)
        //Get the photos relative path without the begining / (slash)
        let photoDir = path.dirname(photoPath).substring(1)
        let directories = photoDir.split('/')

        // Create the whole directory structure from ./thumb
        let depthDir = this.thumbDir
        for(let i = 0 ; i < directories.length ; i++) {
            depthDir += path.sep + directories[i]
            if(!fs.existsSync(depthDir)) {
                fs.mkdirSync(depthDir)
            }
        }

        let dirName = depthDir
        let thumbPath = dirName+'/'+'tb_'+fileName
        photo.thumbnail = thumbPath
        sharp(photoPath).resize(300, 300).toFile(dirName+'/'+'tb_'+fileName)
    }
}