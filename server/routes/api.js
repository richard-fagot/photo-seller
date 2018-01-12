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
    photoController.getPhotos()
      .then(photos => res.json(photos))
      .catch(console.log('oups'))
})

module.exports = router