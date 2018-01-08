const express = require('express')
const router = express.Router()
const Photo = require('../model/photo')

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works')
});

router.get('/photos', (req, res) => {
    let p1 = new Photo('titi', 'lili')
    let p2 = new Photo('toto', 'lolo')
    res.json([p1, p2])
})

module.exports = router