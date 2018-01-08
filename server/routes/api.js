const express = require('express')
const router = express.Router()

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works')
});

router.get('/photos', (req, res) => {
    res.json([{relativePath:'titi', name: 'model1'}, {relativePath: 'toto', name: 'model2'}])
})

module.exports = router