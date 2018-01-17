const express = require('express')
const router = express.Router()
const multer = require('multer')

const upload = multer({ dest: 'public/uploads' })

router.post('/upload', upload.array('photos'), function (req, res, next) {
  res.send({ files: req.files })
})

module.exports = router
