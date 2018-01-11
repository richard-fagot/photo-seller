const express = require('express')
const router = express.Router()
const Photo = require('../model/photo')
const photoController = require('../controller/photo-controller')
const path = require('path')

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works')
});

router.get('/photos', (req, res) => {
    let photos = []

    photoController.getPhotosPaths()
    .then(paths => {
                    console.log(paths)
                    photos = paths.map(photoPath => 
                        new Photo(photoPath.replace(photoController.assetsLocation, '')
                                , 'NONAME'
                                , null
                                , path.win32.basename(photoPath, '.jpg')))
                    photos.forEach(photo => {
                        photoController.createThumbnail(photo)
                    });
                    res.json(photos)
                })
})

module.exports = router