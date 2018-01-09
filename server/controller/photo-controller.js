const glob = require('glob')
const sharp = require('sharp')
const path = require('path')
const fs = require('fs')

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
    createThumbnail: function (photoPath) {
        let fileName = path.win32.basename(photoPath)
        let photoDir = path.dirname(photoPath).replace('./','')
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
        sharp(photoPath).resize(300, 300).toFile(dirName+'/'+'tb_'+fileName)
    }
}