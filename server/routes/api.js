const express = require('express')
const router = express.Router()

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works')
});

router.get('/photos', (req, res) => {
    res.json({toto:'titi'})
})

module.exports = router