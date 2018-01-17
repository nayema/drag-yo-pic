const express = require('express')
const router = express.Router()
const multer = require('multer')

const upload = multer({ dest: 'public/uploads' })

router.post('/upload', upload.single('theseNamesMustMatch'), function (req, res, next) {
  res.send({})
})

module.exports = router
