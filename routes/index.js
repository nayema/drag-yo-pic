const express = require('express')
const router = express.Router()

/* GET home page. */
router.get('/', function (req, res) {
  res.send({ title: 'Express' })
})

router.post('/upload', function (req, res) {
  res.send({ src: 'foo.jpg' })
})

module.exports = router
